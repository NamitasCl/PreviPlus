// tests/UsuarioService.unit.test.js

const UsuarioService = require('../src/services/usuarioService');
const { AppDataSource } = require('../src/datasource');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../src/datasource', () => ({
    AppDataSource: {
        getRepository: jest.fn(),
    },
}));

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('UsuarioService - Seguridad', () => {
    let usuarioService;
    let mockRepository;

    beforeEach(() => {
        mockRepository = {
            findOneBy: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            delete: jest.fn(),
        };

        AppDataSource.getRepository.mockReturnValue(mockRepository);
        usuarioService = new UsuarioService();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('debe hash la contraseña al crear un usuario', async () => {
        const datos = { username: 'usuario1', email: 'usuario1@example.com', password: 'password123' };
        const hashedPassword = 'hashedPassword123';

        mockRepository.findOneBy.mockResolvedValue(null);
        bcrypt.hash.mockResolvedValue(hashedPassword);

        const newUser = {
            username: 'usuario1',
            email: 'usuario1@example.com',
            password: hashedPassword,
            name: undefined,
            firstlastname: undefined,
            secondlastname: undefined,
            createdAt: expect.any(Date),
        };
        const savedUser = { id: 1, ...newUser };

        mockRepository.create.mockReturnValue(newUser);
        mockRepository.save.mockResolvedValue(savedUser);

        const result = await usuarioService.crearUsuario(datos);

        expect(bcrypt.hash).toHaveBeenCalledWith(datos.password, 10);
        expect(mockRepository.create).toHaveBeenCalledWith(expect.objectContaining({
            username: newUser.username,
            email: newUser.email,
            password: newUser.password,
        }));
        expect(mockRepository.save).toHaveBeenCalledWith(newUser);
        expect(result).toEqual(savedUser);
    });

    test('debe comparar correctamente la contraseña al autenticar un usuario', async () => {
        const userData = { email: 'usuario1@example.com', password: 'password123' };
        const hashedPassword = 'hashedPassword123';
        const obtainedUserData = { id: 1, email: userData.email, password: hashedPassword };
        const token = 'generatedToken123';

        mockRepository.findOneBy.mockResolvedValue({ ...obtainedUserData });
        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue(token);

        const result = await usuarioService.login(userData);

        expect(mockRepository.findOneBy).toHaveBeenCalledWith({ email: userData.email });
        expect(bcrypt.compare).toHaveBeenCalledWith(userData.password, hashedPassword);
        expect(jwt.sign).toHaveBeenCalledWith(
            expect.objectContaining({ id: obtainedUserData.id, email: obtainedUserData.email }),
            process.env.SECRET_WORD,
            { expiresIn: '1h' }
        );
        expect(result).toEqual({
            token,
            obtainedUserData: expect.objectContaining({ id: obtainedUserData.id, email: obtainedUserData.email })
        });
    });

    // Agrega el resto de las pruebas asegurándote de usar expect.objectContaining donde sea necesario
});