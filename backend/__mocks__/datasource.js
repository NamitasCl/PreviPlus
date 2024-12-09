// __mocks__/datasource.js
const mockGetRepository = jest.fn();

const AppDataSource = {
    getRepository: mockGetRepository,
    // Puedes mockear otros métodos si es necesario
};

module.exports = AppDataSource;
