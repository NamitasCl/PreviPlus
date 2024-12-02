// utils/firmaFlow.js
const crypto = require('crypto');

function signParameters(params) {
    const secretKey = process.env.FLOW_SANDBOX_SECRET_WORD;

    if (!secretKey) {
        throw new Error('La FLOW_SECRET_KEY no está definida en el archivo .env');
    }

    // Excluir el parámetro `s` si existe
    const filteredParams = Object.keys(params)
        .filter(key => key !== 's')
        .sort() // Ordena alfabéticamente
        .reduce((obj, key) => {
            obj[key] = params[key];
            return obj;
        }, {});

    // Concatenar los parámetros en orden alfabético con los valores sin codificar
    let dataString = '';
    Object.keys(filteredParams).forEach(key => {
        dataString += `${key}${filteredParams[key]}`;
    });

    console.log("dataString para firmar:", dataString);

    // Generar la firma HMAC-SHA256
    const signature = crypto.createHmac('sha256', secretKey)
        .update(dataString)
        .digest('hex');

    console.log("Firma generada:", signature);

    return signature;
}

module.exports = signParameters;