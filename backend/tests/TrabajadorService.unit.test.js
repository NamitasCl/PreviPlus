// tests/trabajadorService.unit.test.js

const TrabajadorService = require('../src/services/trabajadorService');
const AppDataSource = require('../src/datasource');
const Trabajador = require('../src/entities/Trabajador');
const Negocio = require('../src/entities/Negocio');

jest.mock('../src/datasource', () => ({
    getRepository: jest.fn()
}));

describe('TrabajadorService', () => {
    let trabajadorService;
    let trabajadorRepository;
    let negocioRepository;

    beforeEach(() => {
        trabajadorRepository = {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            merge: jest.fn(),
            remove: jest.fn(),
        };

        negocioRepository = {
            findOneBy: jest.fn(),
        };

        AppDataSource.getRepository.mockImplementation((entity) => {
            if (entity === Trabajador) {
                return trabajadorRepository;
            } else if (entity === Negocio) {
                return negocioRepository;
            }
        });

        trabajadorService = new TrabajadorService();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('debe crear un nuevo trabajador', async () => {
        const datos = {
            rut: '12345678-9',
            dv: '9',
            patlastname: 'Pérez',
            names: 'Juan',
            genre: 'M',
            nationality: 'Chilena',
            negocioId: 1
        };

        const negocioMock = { id: 1, name: 'Negocio 1' };

        negocioRepository.findOneBy.mockResolvedValue(negocioMock);
        trabajadorRepository.create.mockReturnValue(datos);
        trabajadorRepository.save.mockResolvedValue(datos);

        const result = await trabajadorService.crearTrabajador(datos);

        expect(negocioRepository.findOneBy).toHaveBeenCalledWith({ id: datos.negocioId });
        expect(trabajadorRepository.create).toHaveBeenCalledWith({
            ...datos,
            negocio: negocioMock
        });
        expect(trabajadorRepository.save).toHaveBeenCalledWith(datos);
        expect(result).toEqual(datos);
    });

    test('debe lanzar un error si el negocio no existe al crear un trabajador', async () => {
        const datos = {
            rut: '12345678-9',
            dv: '9',
            patlastname: 'Pérez',
            names: 'Juan',
            genre: 'M',
            nationality: 'Chilena',
            negocioId: 1
        };

        negocioRepository.findOneBy.mockResolvedValue(null);

        await expect(trabajadorService.crearTrabajador(datos))
            .rejects
            .toThrow('El negocio especificado no existe');
    });

    test('debe obtener todos los trabajadores', async () => {
        const trabajadores = [{ rut: '12345678-9', names: 'Juan' }];
        trabajadorRepository.find.mockResolvedValue(trabajadores);

        const result = await trabajadorService.obtenerTrabajadores();

        expect(trabajadorRepository.find).toHaveBeenCalledWith({ relations: ['negocio'] });
        expect(result).toEqual(trabajadores);
    });

    test('debe obtener un trabajador por RUT', async () => {
        const rut = '12345678-9';
        const trabajador = { rut, names: 'Juan' };
        trabajadorRepository.findOne.mockResolvedValue(trabajador);

        const result = await trabajadorService.obtenerTrabajadorPorRut(rut);

        expect(trabajadorRepository.findOne).toHaveBeenCalledWith({
            where: { rut },
            relations: ['negocio']
        });
        expect(result).toEqual(trabajador);
    });

    test('debe actualizar un trabajador existente', async () => {
        const rut = '12345678-9';
        const datos = { names: 'Juan Actualizado' };
        const trabajador = { rut, names: 'Juan' };

        trabajadorRepository.findOne.mockResolvedValue(trabajador);

        // Asignar directamente un mock de Jest con la implementación
        trabajadorRepository.merge = jest.fn((entity, data) => {
            Object.assign(entity, data);
        });

        trabajadorRepository.save.mockResolvedValue(trabajador);

        const result = await trabajadorService.updateTrabajador(rut, datos);

        expect(trabajadorRepository.findOne).toHaveBeenCalledWith({
            where: { rut },
            relations: ['negocio']
        });
        expect(trabajadorRepository.merge).toHaveBeenCalledWith(trabajador, datos);
        expect(trabajadorRepository.save).toHaveBeenCalledWith(trabajador);
        expect(result).toEqual({ rut, names: 'Juan Actualizado' });
    });

    test('debe eliminar un trabajador existente', async () => {
        const rut = '12345678-9';
        const trabajador = { rut, names: 'Juan' };

        trabajadorRepository.findOne.mockResolvedValue(trabajador);
        trabajadorRepository.remove.mockResolvedValue(trabajador);

        const result = await trabajadorService.deleteTrabajador(rut);

        expect(trabajadorRepository.findOne).toHaveBeenCalledWith({
            where: { rut },
            relations: ['negocio']
        });
        expect(trabajadorRepository.remove).toHaveBeenCalledWith(trabajador);
        expect(result).toEqual(trabajador);
    });
});