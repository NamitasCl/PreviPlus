const express = require("express");
const router = express.Router();
const usuarioService = require("../services/usuarioService");

// Ruta para obtener todos los usuarios
router.get("/", async (req, res) => {
    try {
        const usuarios = await usuarioService.obtenerUsuarios();
        res.json(usuarios);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
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
        const nuevoUsuario = await usuarioService.crearUsuario(req.body);
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

//Ruta para autenticar un usuario
router.post('/login', async (req, res) => {
    try {
        const token = await usuarioService.login(req.body)

        res.cookie('token-cookie', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 3
        })

        res.status(200).json({ isAuthenticated: true })
    } catch (error) {
        res.status(401).json({ error: error.message })
    }
})

//Prueba cookies
router.post('/prueba-cookie', async (req, res) => {
    console.log('Cookie:', req.cookies)
})

// Ruta para actualizar un usuario
router.put("/:id", async (req, res) => {
    try {
        const usuarioActualizado = await usuarioService.actualizarUsuario(req.params.id, req.body);
        res.json(usuarioActualizado);
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

module.exports = router;
