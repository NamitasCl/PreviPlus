const express = require("express");
const router = express.Router();
const UsuarioService = require("../services/usuarioService");
const verifyJwt = require('../middlewares/authenticateJWT');
const ValidationError = require("../errors/validationError");

const usuarioService = new UsuarioService();

// Ruta para obtener todos los usuarios
router.get("/", async (req, res) => {
    try {
        const usuarios = await usuarioService.obtenerUsuarios();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Obtener datos del usuario en refresco del frontend
router.get('/me', verifyJwt, async (req, res) => {

    res.status(200).json(req.user)

});

// Ruta para obtener un usuario por ID
router.get("/:id", async (req, res) => {
    try {
        const usuario = await usuarioService.obtenerUsuarioPorId(req.params.id);
        if (usuario) {
            res.json(usuario);
        } else {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para crear un nuevo usuario
router.post("/", async (req, res) => {
    try {
        const { name, firstlastname, secondlastname, username, email, password } = req.body;

        // Validación de campos obligatorios
        if (!username || !email || !password) {
            throw new ValidationError("Todos los campos (username, email, password) son obligatorios.");
        }
        const nuevoUsuario = await usuarioService.crearUsuario({name, firstlastname, secondlastname, username, email, password });
        if (nuevoUsuario) {
            res.status(201).json(nuevoUsuario);
        } else {
            ValidationError("Error al crear el usuario");
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Ruta para autenticar un usuario
router.post('/login', async (req, res) => {
    try {
        const login = await usuarioService.login(req.body)

        res.cookie('token', login.token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60,
            path: "/"
        })

        delete login.token

        const userData = login.obtainedUserData
        console.log(userData)

        // Registrar lastlogin y guardarlo en la base de datos
        const updatedUser = await usuarioService.actualizarUsuario(userData.id, { lastLogin: new Date() });

        res.status(200).json(userData)
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
})

router.post("/logout", (req, res) => {

    // Intenta borrar la cookie 'token'
    res.clearCookie('token', {
        httpOnly: true,
        sameSite: 'lax',
        secure: false, // Cambia a true si estás usando HTTPS
        path: '/', // Debe coincidir con el 'path' usado al crear la cookie
    });

    res.status(200).json({ message: 'Logout exitoso' });
});

// Ruta para actualizar un usuario
router.put("/:id", verifyJwt, async (req, res) => {
    try {
        const usuarioActualizado = await usuarioService.actualizarUsuario(req.params.id, req.body);
        res.json(usuarioActualizado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Ruta para cambiar la contraseña de un usuario
router.put("/:id/contrasena", verifyJwt, async (req, res) => {
    try {
        const usuarioActualizado = await usuarioService.actualizarContrasena(req.params.id, req.body);
        res.status(204).json(usuarioActualizado);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para eliminar un usuario
router.delete("/:id", async (req, res) => {
    try {
        const mensaje = await usuarioService.eliminarUsuario(req.params.id);
        res.status(200).json({ message: mensaje });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Ruta para obtener las estadísticas de un usuario
router.get("/stats/:usuarioId", async (req, res) => {
    const usuarioId = parseInt(req.params.usuarioId)
    try {
        const usuarioConEstadisticas = await usuarioService.obtenerUsuarioConEstadisticas(usuarioId);
        res.status(200).json(usuarioConEstadisticas);
        // Puedes añadir más código para obtener las estadísticas adicionales
        // Si no hay estadísticas adicionales, puedes omitir la sección catch
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
