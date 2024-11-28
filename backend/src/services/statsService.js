const AppDataSource = require("../datasource");
const Usuario = require("../entities/Previplus/Usuario");
const Negocio = require("../entities/Negocio/Negocio");
const Trabajador = require("../entities/Trabajador/Trabajador");

// Service para obtener las estadisticas de los modelos
class StatsService {
    constructor() {
        this.usuarioRepository = AppDataSource.getRepository(Usuario);
        this.negocioRepository = AppDataSource.getRepository(Negocio);
        this.trabajadorRepository = AppDataSource.getRepository(Trabajador);
    }

    //Método para obtener la cantidad de usuarios registrados
    async obtenerCantidadUsuarios() {
        const usuarios = await this.usuarioRepository.find();
        return usuarios.length;
    }

    //
    /* 
    const userStats = [
        { name: 'Ene', usuarios: 400 },
        { name: 'Feb', usuarios: 300 },
        { name: 'Mar', usuarios: 500 },
        { name: 'Abr', usuarios: 280 },
        { name: 'May', usuarios: 590 },
        { name: 'Jun', usuarios: 800 },
    ] 
        Método para obtener la cantidad de usuarios registrados por mes   
    */
    async obtenerCantidadUsuariosPorMes() {
        const usuarios = await this.usuarioRepository.find();
        const meses = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

        // Contar usuarios por mes
        const usuariosPorMes = usuarios.reduce((acc, user) => {
            const mes = new Date(user.createdAt).getMonth(); // Obtiene el índice del mes 
            const mesCompleto = meses[mes];
            acc[mesCompleto] = (acc[mesCompleto] || 0) + 1;
            return acc;
        }, {});

        // Formatear el resultado en el arreglo deseado
        const userStats = meses.map((mes) => ({
            name: mes,
            usuarios: usuariosPorMes[mes] || 0 // Si no hay usuarios en ese mes, se pone 0
        }));

        return userStats;
    }

    /**
     * Método para obtener esto:
     *  [
            { id: 1, name: 'Juan Pérez', email: 'juan@example.com', status: 'Activo' },
            { id: 2, name: 'María García', email: 'maria@example.com', status: 'Inactivo' },
            { id: 3, name: 'Carlos López', email: 'carlos@example.com', status: 'Activo' },
        ]
     * 
     */
    async obtenerUsuariosConStatus() {
        const usuarios = await this.usuarioRepository.find();
        return usuarios.map((usuario) => ({
            id: usuario.id,
            name: usuario.username,
            email: usuario.email,
            status: usuario.isActive ? 'Activo' : 'Inactivo',
        }));
    }


    // Método para obtener la cantidad de negocios y trabajadores creados
    async obtenerCantidadNegociosTrabajadores() {
        const negocios = await this.negocioRepository.find();
        const trabajadores = await this.trabajadorRepository.find();

        return [
            { name: 'Negocios', value: negocios.length }, 
            { name: 'Trabajadores', value: trabajadores.length }
        ];
    }

    /**
     * Método para hacer una lista de negocios con este formato:
     * [
        { id: 1, name: 'Negocio A', owner: 'Juan Pérez', employees: 5 },
        { id: 2, name: 'Negocio B', owner: 'María García', employees: 3 },
        { id: 3, name: 'Negocio C', owner: 'Carlos López', employees: 7 },
       ]
     */
    async obtenerListaNegocios() {
        const negocios = await this.negocioRepository.find();
        const trabajadores = await this.trabajadorRepository.find();

        // Crear un objeto con la información de cada negocio
        const negociosConTrabajadores = negocios.map((negocio) => {
            const trabajadoresEnEseNegocio = trabajadores.filter((trabajador) => trabajador.negocioId === negocio.id);
            return {
                id: negocio.id,
                name: negocio.name,
                owner: negocio.repLegal,
                employees: trabajadoresEnEseNegocio.length,
            };
        });

        return negociosConTrabajadores;
    }



}

module.exports = StatsService;
    
