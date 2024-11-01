const NegocioService = require('../src/services/negocioService');
const AppDataSource = require('../src/datasource');
const Negocio = require('../src/entities/Negocio');
const Usuario = require('../src/entities/Usuario');

jest.mock('../src/datasource', () => ({
    getRepository: jest.fn()
}));

describe('NegocioService', () => {
    let negocioService;
    let negocioRepository;
    let usuarioRepository;

    beforeEach(() => {
        // Repositorio mock para Negocio
        negocioRepository = {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
            delete: jest.fn(),
        };

        // Repositorio mock para Usuario
        usuarioRepository = {
            findOneBy: jest.fn(),
        };

        // Configurar getRepository para devolver el repositorio correcto
        AppDataSource.getRepository.mockImplementation((entity) => {
            if (entity === Negocio) {
                return negocioRepository;
            } else if (entity === Usuario) {
                return usuarioRepository;
            }
        });

        negocioService = new NegocioService();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('debe crear un nuevo negocio', async () => {
        const datos = { name: 'Nuevo Negocio', address: 'Dirección', rut: '12345678-9' };
        const userId = 1;
        const usuarioMock = { id: userId, username: 'usuarioTest' };

        // Mock del método findOneBy para que devuelva un usuario
        usuarioRepository.findOneBy.mockResolvedValue(usuarioMock);

        const negocioCreado = { id: 1, ...datos, usuario: usuarioMock };

        negocioRepository.create.mockReturnValue(negocioCreado);
        negocioRepository.save.mockResolvedValue(negocioCreado);

        const result = await negocioService.crearNegocio(datos, userId);

        expect(usuarioRepository.findOneBy).toHaveBeenCalledWith({ id: userId });
        expect(negocioRepository.create).toHaveBeenCalledWith({ ...datos, usuario: usuarioMock });
        expect(negocioRepository.save).toHaveBeenCalledWith(negocioCreado);
        expect(result).toEqual(negocioCreado);
    });

    test('debe obtener todos los negocios', async () => {
        const negocios = [{ id: 1, name: 'Negocio 1' }, { id: 2, name: 'Negocio 2' }];
        negocioRepository.find.mockResolvedValue(negocios);

        const result = await negocioService.obtenerNegocios();

        expect(negocioRepository.find).toHaveBeenCalled();
        expect(result).toEqual(negocios);
    });

    test('debe obtener negocios por usuario', async () => {
        const usuarioId = 1;
        const negocios = [
            { id: 1, name: 'Negocio del usuario', address: 'Dirección', rut: '12345678-9', usuario: { id: usuarioId } }
        ];

        negocioRepository.find.mockResolvedValue(negocios);

        const result = await negocioService.obtenerNegocioPorUsuario(usuarioId);

        expect(negocioRepository.find).toHaveBeenCalledWith({
            where: { usuario: { id: usuarioId } },
            relations: ['usuario'],
        });
        expect(result).toEqual(negocios);
    });

    test('debe actualizar un negocio', async () => {
        const id = 1;
        const datosActualizados = { name: 'Nombre Actualizado' };
        const negocio = { id, name: 'Negocio Original' };

        negocioRepository.findOneBy.mockResolvedValue(negocio);
        negocioRepository.save.mockResolvedValue({ ...negocio, ...datosActualizados });

        const result = await negocioService.actualizarNegocio(id, datosActualizados);

        expect(negocioRepository.findOneBy).toHaveBeenCalledWith({ id });
        expect(negocioRepository.save).toHaveBeenCalledWith({ ...negocio, ...datosActualizados });
        expect(result).toEqual({ ...negocio, ...datosActualizados });
    });

    test('debe eliminar un negocio', async () => {
        const id = 1;
        negocioRepository.delete.mockResolvedValue({ affected: 1 });

        const result = await negocioService.eliminarNegocio(id);

        expect(negocioRepository.delete).toHaveBeenCalledWith(id);
        expect(result).toBe("Negocio eliminado con éxito");
    });

    test('debe lanzar un error si el negocio a actualizar no existe', async () => {
        const id = 999;
        negocioRepository.findOneBy.mockResolvedValue(null);

        await expect(negocioService.actualizarNegocio(id, {}))
            .rejects
            .toThrow("Negocio no encontrado");
    });

    test('debe lanzar un error si el negocio a eliminar no existe', async () => {
        const id = 999;
        negocioRepository.delete.mockResolvedValue({ affected: 0 });

        await expect(negocioService.eliminarNegocio(id))
            .rejects
            .toThrow("Negocio no encontrado");
    });
});
