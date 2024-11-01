require('dotenv').config()
const AppDataSource = require("../datasource");
const Usuario = require("../entities/Usuario");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const ValidationError = require('../errors/validationError');


class UsuarioService {
    constructor() {
        this.usuarioRepository = AppDataSource.getRepository(Usuario);
    }

    // Método para crear un usuario
    async crearUsuario(datos) {
        const { username, email, password } = datos;

        // Validación de campos obligatorios
        if (!username || !email || !password) {
            throw new ValidationError("Todos los campos (username, email, password) son obligatorios.");
        }

        // Validación de existencia de email y usuario
        const emailExists = await this.obtenerUsuarioPorEmail(email);
        const usernameExists = await this.obtenerUsuarioPorUsuario(username);

        if (emailExists) throw new ValidationError("Correo electrónico ya existe.");
        if (usernameExists) throw new ValidationError("Usuario ya existe.");

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear y guardar nuevo usuario
        const newUser = {
            username,
            email,
            password: hashedPassword,
        };

        const nuevoUsuario = this.usuarioRepository.create(newUser);
        return await this.usuarioRepository.save(nuevoUsuario);
    }

    // Método para autenticar un usuario
    async login(userData) {
        const obtainedUserData = await this.obtenerUsuarioPorEmail(userData.email);

        // Verificar si el usuario existe
        if (!obtainedUserData) throw new Error('Usuario no encontrado');

        // Verificar si el usuario tiene una contraseña registrada
        if (!obtainedUserData.password) throw new Error('Contraseña no configurada para el usuario');

        const passwordMatch = await bcrypt.compare(userData.password, obtainedUserData.password);

        if (!passwordMatch) throw new Error('Contraseña incorrecta');

        // Excluye la contraseña del objeto obtenido antes de firmar el token
        delete obtainedUserData.password;

        const token = jwt.sign(obtainedUserData, process.env.SECRET_WORD, { expiresIn: '1h' });
        return { token, obtainedUserData };
    }



    // Método para obtener todos los usuarios
    async obtenerUsuarios() {
        return await this.usuarioRepository.find();
    }

    // Método para obtener un usuario por su ID
    async obtenerUsuarioPorId(id) {
        return await this.usuarioRepository.findOneBy({ id });
    }

    //Mètodo para obtener un usuario por su email
    async obtenerUsuarioPorEmail(email) {
        return await this.usuarioRepository.findOneBy({ email });
    }

    //Mètodo para obtener un usuario por su nombre de usuario
    async obtenerUsuarioPorUsuario(username) {
        return await this.usuarioRepository.findOneBy({ username });
    }



    // Método para actualizar un usuario
    async actualizarUsuario(id, datosActualizados) {
        const usuario = await this.usuarioRepository.findOneBy({ id });
        if (usuario) {
            Object.assign(usuario, datosActualizados);  // Actualizar con los nuevos datos
            return await this.usuarioRepository.save(usuario);
        } else {
            throw new Error("Usuario no encontrado");
        }
    }

    // Método para eliminar un usuario
    async eliminarUsuario(id) {
        const resultado = await this.usuarioRepository.delete(id);
        if (resultado.affected > 0) {
            return "Usuario eliminado con éxito";
        } else {
            throw new Error("Usuario no encontrado");
        }
    }

    // Método en el servicio de usuarios
    async obtenerUsuarioConEstadisticas(idUsuario) {
        const usuario = await this.usuarioRepository.findOne({
            where: { id: idUsuario },
            relations: ['negocios', 'negocios.trabajadores'], // Relacionamos los negocios y trabajadores
        });

        if (!usuario) {
            throw new Error('Usuario no encontrado');
        }

        // Calculamos las estadísticas
        const totalNegocios = usuario.negocios.length;
        const totalTrabajadores = usuario.negocios.reduce((count, negocio) => {
            return count + negocio.trabajadores.length;
        }, 0);

        return (
            {
                totalNegocios,
                totalTrabajadores,
                // Puedes añadir más estadísticas si es necesario
            }
        );
    }
}

module.exports = UsuarioService; 
