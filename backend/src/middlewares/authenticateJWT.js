const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    console.log("Token midd:", req.cookies.token);

    const token = req.cookies.token; // Obtenemos el token desde las cookies

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
