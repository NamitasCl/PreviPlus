//Generar un middleware para registrar las peticiones al backend y las guarde en la base de datos
const loggerMiddleware = (req, res, next) => {


    next();
};

module.exports = loggerMiddleware;