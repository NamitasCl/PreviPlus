require('dotenv').config()
const AppDataSource = require("../datasource");
const Usuario = require("../entities/Usuario");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


class UsuarioService {
    constructor() {
        this.usuarioRepository = AppDataSource.getRepository(Usuario);
    }

    // Método para crear un usuario
    async crearUsuario(datos) {

        //TODO:
        /*
            - Verificar los datos entregados
            - Encriptar la contraseña con bcrypt
            **/
        const { username, email } = datos

        const existeMail = await this.obtenerUsuarioPorEmail(email)
        const existeUsuario = await this.obtenerUsuarioPorUsuario(username)

        if (existeMail) throw new Error("Correo electrónico ya existe.")
        if (existeUsuario) throw new Error("Usuario ya existe.")

        const password = await bcrypt.hash(datos.password, 10)

        const newUser = {
            username,
            email,
            password
        }

        const nuevoUsuario = this.usuarioRepository.create(newUser);
        return await this.usuarioRepository.save(nuevoUsuario);

    }

    //Método para autenticar un usuario
    async login(userData) {
        const obtainedUserData = await this.obtenerUsuarioPorEmail(userData.email)

        const passwordMatch = await bcrypt.compare(userData.password, obtainedUserData.password)

        if (!passwordMatch) throw Error('Contraseña incorrecta')
        delete obtainedUserData.password;
        const token = jwt.sign(obtainedUserData, process.env.SECRET_WORD, { expiresIn: '1h' })
        return { token, obtainedUserData }
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

module.exports = new UsuarioService();
