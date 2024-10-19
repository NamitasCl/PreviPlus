require('dotenv').config()
const jwt = require('jsonwebtoken');


const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token; // Obtenemos el token de las cookies

    if (!token) {
        return res.status(401).json({ message: 'No estás autenticado' });
    }

    // Verificar el token
    jwt.verify(token, process.env.SECRET_WORD, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token no válido' });
        }

        req.user = user; // Guardamos el usuario en el request
        next();
    });
};

module.exports = authenticateJWT;