// UsuarioService.unit.test.js

const UsuarioService = require('../src/services/usuarioService');
const AppDataSource = require('../src/datasource');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../src/datasource', () => ({
    getRepository: jest.fn()
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

        // Simula que no existe un usuario con el mismo email o username
        mockRepository.findOneBy.mockResolvedValue(null);
        // Simula el hash de la contraseña
        bcrypt.hash.mockResolvedValue(hashedPassword);

        const newUser = { username: 'usuario1', email: 'usuario1@example.com', password: hashedPassword };
        const savedUser = { id: 1, ...newUser };

        mockRepository.create.mockReturnValue(newUser);
        mockRepository.save.mockResolvedValue(savedUser);

        const result = await usuarioService.crearUsuario(datos);

        expect(bcrypt.hash).toHaveBeenCalledWith(datos.password, 10);
        expect(mockRepository.create).toHaveBeenCalledWith(newUser);
        expect(mockRepository.save).toHaveBeenCalledWith(newUser);
        expect(result).toEqual(savedUser);
    });

    test('debe comparar correctamente la contraseña al autenticar un usuario', async () => {
        const userData = { email: 'usuario1@example.com', password: 'password123' };
        const hashedPassword = 'hashedPassword123';
        const obtainedUserData = { id: 1, email: userData.email, password: hashedPassword };
        const token = 'generatedToken123';

        // Mock del repositorio para devolver el usuario obtenido
        mockRepository.findOneBy.mockResolvedValue({ ...obtainedUserData }); // Clonamos el objeto

        // Mock de bcrypt.compare para simular una comparación exitosa
        bcrypt.compare.mockResolvedValue(true);

        // Mock de jwt.sign para generar un token simulado
        jwt.sign.mockReturnValue(token);

        // Capturamos el valor de la contraseña antes de que pueda ser modificada
        const passwordEnDB = obtainedUserData.password;

        const result = await usuarioService.login(userData);

        // Verificaciones
        expect(mockRepository.findOneBy).toHaveBeenCalledWith({ email: userData.email });
        expect(bcrypt.compare).toHaveBeenCalledWith(userData.password, passwordEnDB);
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

});
