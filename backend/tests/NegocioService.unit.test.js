const NegocioService = require('../src/services/negocioService');
const AppDataSource = require('../src/datasource');
const Negocio = require('../src/entities/Negocio');


jest.mock('../src/datasource', () => ({
    getRepository: jest.fn()
}));

describe('NegocioService', () => {
    let negocioService;
    let mockRepository;
    let queryBuilderMock;

    beforeEach(() => {
        queryBuilderMock = {
            leftJoinAndSelect: jest.fn().mockReturnThis(),
            select: jest.fn().mockReturnThis(),
            where: jest.fn().mockReturnThis(),
            getMany: jest.fn().mockResolvedValue([{ id: 1, name: 'Negocio del usuario', address: 'Dirección', rut: '12345678-9' }])
        };

        mockRepository = {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
            delete: jest.fn(),
            createQueryBuilder: jest.fn(() => queryBuilderMock) // Solo usaremos esto en la prueba que lo requiere
        };

        AppDataSource.getRepository.mockReturnValue(mockRepository);
        negocioService = new NegocioService();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('debe crear un nuevo negocio', async () => {
        const datos = { name: 'Nuevo Negocio', address: 'Dirección', rut: '12345678-9' };
        const negocioCreado = { id: 1, ...datos };

        mockRepository.create.mockReturnValue(negocioCreado);
        mockRepository.save.mockResolvedValue(negocioCreado);

        const result = await negocioService.crearNegocio(datos);

        expect(mockRepository.create).toHaveBeenCalledWith(datos);
        expect(mockRepository.save).toHaveBeenCalledWith(negocioCreado);
        expect(result).toEqual(negocioCreado);
    });

    test('debe obtener todos los negocios', async () => {
        const negocios = [{ id: 1, name: 'Negocio 1' }, { id: 2, name: 'Negocio 2' }];
        mockRepository.find.mockResolvedValue(negocios);

        const result = await negocioService.obtenerNegocios();

        expect(mockRepository.find).toHaveBeenCalled();
        expect(result).toEqual(negocios);
    });

    test('debe obtener negocios por usuario', async () => {
        const usuarioId = 1;
        const negocios = [{ id: 1, name: 'Negocio del usuario', address: 'Dirección', rut: '12345678-9' }];

        // Configura el mock del método getMany para devolver datos de prueba
        queryBuilderMock.getMany.mockResolvedValue(negocios);

        const result = await negocioService.obtenerNegocioPorUsuario(usuarioId);

        // Verifica las llamadas a los métodos encadenados
        expect(queryBuilderMock.leftJoinAndSelect).toHaveBeenCalledWith("negocio.usuario", "usuario");
        expect(queryBuilderMock.select).toHaveBeenCalledWith([
            "negocio.id",
            "negocio.name",
            "negocio.address",
            "negocio.rut"
        ]);
        expect(queryBuilderMock.where).toHaveBeenCalledWith("usuario.id = :usuarioId", { usuarioId });

        // Verifica el resultado
        expect(result).toEqual(negocios);
    });

    test('debe actualizar un negocio', async () => {
        const id = 1;
        const datosActualizados = { name: 'Nombre Actualizado' };
        const negocio = { id, name: 'Negocio Original' };

        mockRepository.findOneBy.mockResolvedValue(negocio);
        mockRepository.save.mockResolvedValue({ ...negocio, ...datosActualizados });

        const result = await negocioService.actualizarNegocio(id, datosActualizados);

        expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id });
        expect(mockRepository.save).toHaveBeenCalledWith({ ...negocio, ...datosActualizados });
        expect(result).toEqual({ ...negocio, ...datosActualizados });
    });

    test('debe eliminar un negocio', async () => {
        const id = 1;
        mockRepository.delete.mockResolvedValue({ affected: 1 });

        const result = await negocioService.eliminarNegocio(id);

        expect(mockRepository.delete).toHaveBeenCalledWith(id);
        expect(result).toBe("Negocio eliminado con éxito");
    });

    test('debe lanzar un error si el negocio a actualizar no existe', async () => {
        const id = 999;
        mockRepository.findOneBy.mockResolvedValue(null);

        await expect(negocioService.actualizarNegocio(id, {}))
            .rejects
            .toThrow("Negocio no encontrado");
    });

    test('debe lanzar un error si el negocio a eliminar no existe', async () => {
        const id = 999;
        mockRepository.delete.mockResolvedValue({ affected: 0 });

        await expect(negocioService.eliminarNegocio(id))
            .rejects
            .toThrow("Negocio no encontrado");
    });
});
