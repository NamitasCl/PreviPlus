require('dotenv').config()
const jwt = require('jsonwebtoken')

function verifyLogin(req, res, next) {

    //Rescato el token de las cookies
    const token = req.cookies.token

    if (!token) return res.status(401).json({ error: 'Usuario no autenticado' })

    jwt.verify(token, process.env.SECRET_WORD, (error, decoded) => {
        if (error) {
            return res.status(401).json({ error: 'Token no valido' })
        }

        req.body = decoded
        next()
    })
}

module.exports = verifyLogin;