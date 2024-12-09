// __mocks__/typeorm.js
const actualTypeorm = jest.requireActual('typeorm');

module.exports = {
    ...actualTypeorm,
    getRepository: jest.fn(),
    getManager: jest.fn(),
    // Puedes mockear más métodos si es necesario
};
