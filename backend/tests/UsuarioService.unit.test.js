const UsuarioService = require('../src/services/usuarioService');
const AppDataSource = require('../src/datasource');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Usuario = require('../src/entities/Usuario');

jest.mock('../src/datasource', () => ({
    getRepository: jest.fn()
}));

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('UsuarioService', () => {
    let usuarioService;
    let mockRepository;

    beforeEach(() => {
        mockRepository = {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
            delete: jest.fn(),
        };

        AppDataSource.getRepository.mockReturnValue(mockRepository);
        usuarioService = new UsuarioService();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('debe crear un usuario nuevo', async () => {
        const datos = { username: 'usuario1', email: 'usuario1@example.com', password: 'password123' };
        const hashedPassword = 'hashedPassword123';

        mockRepository.findOneBy.mockResolvedValueOnce(null); // No existe el email ni el usuario
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

    test('debe lanzar un error si el correo electrónico ya existe al crear usuario', async () => {
        const datos = { username: 'usuario1', email: 'usuario1@example.com', password: 'password123' };
        mockRepository.findOneBy.mockResolvedValueOnce({ email: datos.email });

        await expect(usuarioService.crearUsuario(datos))
            .rejects
            .toThrow("Correo electrónico ya existe.");
    });

    test('debe lanzar un error si el nombre de usuario ya existe al crear usuario', async () => {
        const datos = { username: 'usuario1', email: 'usuario1@example.com', password: 'password123' };
        mockRepository.findOneBy
            .mockResolvedValueOnce(null) // No existe el email
            .mockResolvedValueOnce({ username: datos.username }); // Existe el username

        await expect(usuarioService.crearUsuario(datos))
            .rejects
            .toThrow("Usuario ya existe.");
    });

    test('debe autenticar un usuario correctamente', async () => {
        const userData = { email: 'usuario1@example.com', password: 'password123' }; // Contraseña en texto plano proporcionada por el usuario
        const obtainedUserData = { id: 1, email: userData.email, password: 'hashedPassword123' }; // Contraseña simulada como encriptada
        const token = 'generatedToken123';

        // Configura el mock para findOneBy para devolver un objeto completo con contraseña encriptada
        mockRepository.findOneBy.mockResolvedValue(obtainedUserData);

        // Configura bcrypt.compare para simular que la comparación entre texto plano y hash coincide
        bcrypt.compare.mockResolvedValue(true);

        // Mock de jwt.sign para generar un token simulado
        jwt.sign.mockReturnValue(token);

        const result = await usuarioService.login(userData);

        // Verificaciones
        expect(jwt.sign).toHaveBeenCalledWith(
            expect.objectContaining({ ...obtainedUserData }),
            process.env.SECRET_WORD,
            { expiresIn: '1h' }
        );
        expect(result).toEqual({
            token,
            obtainedUserData: expect.objectContaining({ ...obtainedUserData })
        });
    });


    test('debe lanzar un error si la contraseña es incorrecta en el login', async () => {
        const userData = { email: 'usuario1@example.com', password: 'incorrectPassword' };
        const obtainedUserData = { id: 1, email: userData.email, password: 'hashedPassword123' };

        mockRepository.findOneBy.mockResolvedValue(obtainedUserData);
        bcrypt.compare.mockResolvedValue(false);

        await expect(usuarioService.login(userData))
            .rejects
            .toThrow("Contraseña incorrecta");
    });

    test('debe obtener todos los usuarios', async () => {
        const usuarios = [{ id: 1, username: 'usuario1' }, { id: 2, username: 'usuario2' }];
        mockRepository.find.mockResolvedValue(usuarios);

        const result = await usuarioService.obtenerUsuarios();

        expect(mockRepository.find).toHaveBeenCalled();
        expect(result).toEqual(usuarios);
    });

    test('debe obtener un usuario por su ID', async () => {
        const id = 1;
        const usuario = { id, username: 'usuario1' };
        mockRepository.findOneBy.mockResolvedValue(usuario);

        const result = await usuarioService.obtenerUsuarioPorId(id);

        expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id });
        expect(result).toEqual(usuario);
    });

    test('debe obtener un usuario por su email', async () => {
        const email = 'usuario1@example.com';
        const usuario = { id: 1, email };
        mockRepository.findOneBy.mockResolvedValue(usuario);

        const result = await usuarioService.obtenerUsuarioPorEmail(email);

        expect(mockRepository.findOneBy).toHaveBeenCalledWith({ email });
        expect(result).toEqual(usuario);
    });

    test('debe actualizar un usuario', async () => {
        const id = 1;
        const datosActualizados = { username: 'usuarioActualizado' };
        const usuario = { id, username: 'usuario1' };

        mockRepository.findOneBy.mockResolvedValue(usuario);
        mockRepository.save.mockResolvedValue({ ...usuario, ...datosActualizados });

        const result = await usuarioService.actualizarUsuario(id, datosActualizados);

        expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id });
        expect(mockRepository.save).toHaveBeenCalledWith({ ...usuario, ...datosActualizados });
        expect(result).toEqual({ ...usuario, ...datosActualizados });
    });

    test('debe lanzar un error si el usuario a actualizar no existe', async () => {
        const id = 999;
        mockRepository.findOneBy.mockResolvedValue(null);

        await expect(usuarioService.actualizarUsuario(id, {}))
            .rejects
            .toThrow("Usuario no encontrado");
    });

    test('debe eliminar un usuario', async () => {
        const id = 1;
        mockRepository.delete.mockResolvedValue({ affected: 1 });

        const result = await usuarioService.eliminarUsuario(id);

        expect(mockRepository.delete).toHaveBeenCalledWith(id);
        expect(result).toBe("Usuario eliminado con éxito");
    });

    test('debe lanzar un error si el usuario a eliminar no existe', async () => {
        const id = 999;
        mockRepository.delete.mockResolvedValue({ affected: 0 });

        await expect(usuarioService.eliminarUsuario(id))
            .rejects
            .toThrow("Usuario no encontrado");
    });
});
