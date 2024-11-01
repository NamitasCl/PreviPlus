const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.cookies?.token || req.headers['authorization']?.split(' ')[1]; // Obtenemos el token desde cookies o headers

    if (!token) {
        return res.status(401).json({ message: 'No estás autenticado' });
    }

    jwt.verify(token, process.env.SECRET_WORD, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token no válido' });
        }

        req.user = user; // Guardamos el usuario en el request
        next();
    });
};

module.exports = authenticateJWT;