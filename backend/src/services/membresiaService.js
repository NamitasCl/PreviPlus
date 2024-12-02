require("dotenv").config();
const AppDataSource = require("../datasource");
const Membresia = require("../entities/Previplus/Membresia");
const Usuario = require("../entities/Previplus/Usuario");
const signParameters = require("../utils/firmaFlow");
const axios = require("axios");
const qs = require('qs');

class MembresiaService {

    constructor() {
        this.membresiaRepository = AppDataSource.getRepository(Membresia);
        this.usuarioRepository = AppDataSource.getRepository(Usuario);
    }

    /**
     * Inicia el proceso de registro de tarjeta con Flow.
     * @param {number} userId - ID del usuario en tu sistema.
     * @returns {Object} - URL de Flow para registrar la tarjeta y el token de la transacción.
     */
    async iniciarRegistroTarjeta(userId) {
        try {
            const usuario = await this.usuarioRepository.findOne({ where: { id: userId }, relations: ["membresias"] });

            if (!usuario) {
                throw new Error("Usuario no encontrado.");
            }

            // Si el usuario no tiene un customerId, crear uno en Flow
            if (!usuario.flowCustomerId) {
                const clienteData = {
                    apiKey: process.env.FLOW_SANDBOX_API_KEY,
                    name: `${usuario.name} ${usuario.firstlastname}`,
                    email: usuario.email,
                    externalId: usuario.useruuid,
                };
    
                // Generar la firma con los valores codificados
                clienteData["s"] = signParameters(clienteData);
    
                // Serializar los datos sin volver a codificar
                const data = qs.stringify(clienteData, { encode: false });
    
                console.log("Datos serializados para enviar a Flow:", data);
    
                // Enviar la solicitud
                const clienteResponse = await axios.post(
                    `${process.env.FLOW_SANDBOX_URL}/customer/create`,
                    data,
                    { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
                ).catch(error => {
                    console.error("Error al crear el cliente en Flow:", error.response?.data || error.message);
                    throw new Error("No se pudo crear el cliente en Flow. Por favor, inténtalo de nuevo.");
                });

                console.log("Respuesta de Flow al crear cliente:", clienteResponse.data);

                // Guarda el customerId en la entidad Usuario
                usuario.flowCustomerId = clienteResponse.data.customerId;
                await this.usuarioRepository.save(usuario);
            }

            // Ahora, iniciar el registro de la tarjeta
            const registroData = {
                apiKey: process.env.FLOW_SANDBOX_API_KEY,
                customerId: usuario.flowCustomerId,
                url_return: `${process.env.NGROK_URL}/api/membresia/callback`,
            };

            // Genera la firma para los parámetros
            registroData["s"] = signParameters(registroData);

            console.log("Datos para registrar tarjeta en Flow:", registroData);

            // Serializa los datos correctamente usando qs
            const registroDataSerialized = qs.stringify(registroData);

            // Envía la solicitud para registrar la tarjeta
            const registroResponse = await axios.post(
                `${process.env.FLOW_SANDBOX_URL}/customer/register`,
                registroDataSerialized,
                { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
            ).catch(error => {
                console.error("Error al registrar la tarjeta en Flow:", error.response?.data || error.message);
                throw new Error("No se pudo registrar la tarjeta en Flow. Por favor, inténtalo de nuevo.");
            });

            console.log("Respuesta de Flow al registrar tarjeta:", registroResponse.data);

            // Guarda el token en la entidad Membresia asociada al usuario
            const membresia = this.membresiaRepository.create({
                tokenEntregadoPorFlow: registroResponse.data.token,
                membresiaActiva: false,
                usuario: usuario,
            });
            await this.membresiaRepository.save(membresia);

            return {
                url: registroResponse.data.url,
                token: registroResponse.data.token,
            };
        } catch (error) {
            console.error("Error al iniciar el registro de tarjeta:", error.message);
            throw error;
        }
    }

    /**
     * Procesa el callback recibido de Flow.
     * @param {string} token - Token recibido en el callback.
     */
    async procesarCallback(tokenEntregadoPorFlow) {
        // Busca la membresía asociada al token
        const membresia = await this.membresiaRepository.findOne({ where: { tokenEntregadoPorFlow }, relations: ["usuario"] });
        const usuario = await this.usuarioRepository.findOne(membresia.usuario.id);

        if (!membresia) {
            throw new Error("Membresía no encontrada para el token proporcionado.");
        }

        if (!usuario) {
            throw new Error("Usuario no encontrado.");
        }

        // Prepara los parámetros para getRegisterStatus
        const statusData = {
            apiKey: process.env.FLOW_API_KEY,
            token: tokenEntregadoPorFlow,
        };

        // Genera la firma para los parámetros
        statusData["s"] = signParameters(statusData);

        try {
            // Consulta el estado del registro con Flow
            const statusResponse = await axios.get(
                `${process.env.FLOW_SANDBOX_URL}/customer/getRegisterStatus`,
                new URLSearchParams(statusData).toString(),
                { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
            );

            const registroStatus = statusResponse.data;

            if (registroStatus.status === "1") {
                // Actualiza la membresía como activa
                membresia = this.membresiaRepository.create({
                    creditCardType: registroStatus.creditCardType,
                    last4CardDigits: registroStatus.last4CardDigits,
                })
                await this.membresiaRepository.save(membresia);

                usuario = this.usuarioRepository.create({
                    flowCustomerId: registroStatus.customerId,
                    isMembershipActive: true,
                })
                await this.usuarioRepository.save(usuario);

                // Opcional: Suscribir al cliente a un plan de Flow aquí
                //await this.suscribirPlanFlow(membresia.usuario.flowCustomerId, "previplus-prem", tokenEntregadoPorFlow);
                return {
                    response: "success"
                }
            } else {
                throw new Error(`Error en el registro de tarjeta: ${registroStatus.message}`);
            }
        } catch (error) {
            console.error("Error al consultar el estado de registro:", error.message);
            throw new Error("No se pudo verificar el estado del registro de la tarjeta.");
        }
    }

    /**
     * (Opcional) Suscribe al cliente a un plan en Flow.
     * @param {string} customerId - customerId de Flow.
     * @param {string} planId - ID del plan en Flow.
     */
    async suscribirPlanFlow(customerId, planId, tokenEntregadoPorFlow) {
        try {
            const suscripcionData = {
                apiKey: process.env.FLOW_API_KEY,
                customerId: customerId,
                planId: planId,
            };
    
            // Genera la firma para los parámetros
            suscripcionData["s"] = signParameters(suscripcionData);
    
            // Envía la solicitud para suscribir al plan
            const suscripcionResponse = await axios.post(
                `${process.env.FLOW_SANDBOX_URL}/subscription/create`,
                new URLSearchParams(suscripcionData).toString(),
                { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
            );
    
            // Obtenemos el registro de membresia por el token
            const membresia = await this.membresiaRepository.findOne({ where: { tokenEntregadoPorFlow }, relations: ["usuario"] });
            
            // Actualizamos la membresia con la información de Flow
            membresia.subscriptionId = suscripcionResponse.data.subscriptionId;
            membresia.planId = suscripcionResponse.data.planId;
            membresia.period_start = suscripcionResponse.data.period_start;
            membresia.period_end = suscripcionResponse.data.period_end;
            await this.membresiaRepository.save(membresia);
        
        } catch (error) {
            console.error("Error al suscribir al plan:", error.message);
            throw new Error("No se pudo suscribir al plan. Por favor, inténtalo de nuevo.");
        }
    }

    /**
     * Obtiene el estado actual de la membresía del usuario.
     * @param {number} userId - ID del usuario en tu sistema.
     * @returns {Object} - Información del estado de la membresía.
     */
    async obtenerEstadoMembresia(userId) {
        const usuario = await this.usuarioRepository.findOne(userId, { relations: ["membresias"] });

        if (!usuario) {
            throw new Error("Usuario no encontrado.");
        }

        // Asume que la última membresía es la actual
        const ultimaMembresia = usuario.membresias[usuario.membresias.length - 1];

        return {
            membresiaActiva: ultimaMembresia ? ultimaMembresia.membresiaActiva : false,
            creditCardType: ultimaMembresia?.creditCardType || null,
            last4CardDigits: ultimaMembresia?.last4CardDigits || null
        };
    }
}

module.exports = MembresiaService;