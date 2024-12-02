// tests/NegocioService.unit.test.js

const NegocioService = require('../src/services/negocioService');
const { AppDataSource } = require('../src/datasource');
const Negocio = require('../src/entities/Negocio/Negocio');
const Usuario = require('../src/entities/Previplus/Usuario');
const Mutualidad = require('../src/entities/Prevision/Mutualidad');
const CCAF = require('../src/entities/Prevision/CCAF');

jest.mock('../src/datasource', () => ({
    AppDataSource: {
        getRepository: jest.fn(),
    },
}));

describe('NegocioService', () => {
    let negocioService;
    let negocioRepository;
    let usuarioRepository;
    let mutualidadRepository;
    let ccafRepository;

    beforeEach(() => {
        negocioRepository = {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOneBy: jest.fn(),
            delete: jest.fn(),
            findOne: jest.fn(),
        };

        usuarioRepository = {
            findOneBy: jest.fn(),
        };

        mutualidadRepository = {
            findOneBy: jest.fn(),
        };

        ccafRepository = {
            findOneBy: jest.fn(),
        };

        AppDataSource.getRepository.mockImplementation((entity) => {
            if (entity === Negocio) {
                return negocioRepository;
            } else if (entity === Usuario) {
                return usuarioRepository;
            } else if (entity === Mutualidad) {
                return mutualidadRepository;
            } else if (entity === CCAF) {
                return ccafRepository;
            }
        });

        negocioService = new NegocioService();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('debe crear un nuevo negocio', async () => {
        const datos = {
            rut: '12345678-9',
            negocioName: 'Nuevo Negocio',
            address: 'Dirección',
            repLegal: 'Representante',
            rutRepLegal: '87654321-0',
            dvRepLegal: '0',
            tieneMutual: true,
            mutualNombre: '01-Asociación Chilena de Seguridad',
            tieneCcaf: true,
            ccafNombre: '01-CCAF Los Andes',
            isActive: true,
        };
        const userId = 1;
        const usuarioMock = { id: userId, username: 'usuarioTest' };
        const mutualidadMock = { codigomutual: 1 };
        const ccafMock = { codigoccaf: 1 };

        usuarioRepository.findOneBy.mockResolvedValue(usuarioMock);
        mutualidadRepository.findOneBy.mockResolvedValue(mutualidadMock);
        ccafRepository.findOneBy.mockResolvedValue(ccafMock);

        const negocioCreado = {
            id: 1,
            ...datos,
            mutualidad: mutualidadMock,
            ccaf: ccafMock,
            usuario: usuarioMock,
        };

        negocioRepository.create.mockReturnValue(negocioCreado);
        negocioRepository.save.mockResolvedValue(negocioCreado);

        const result = await negocioService.crearNegocio(datos, userId);

        expect(usuarioRepository.findOneBy).toHaveBeenCalledWith({ id: userId });
        expect(mutualidadRepository.findOneBy).toHaveBeenCalledWith({ codigomutual: 1 });
        expect(ccafRepository.findOneBy).toHaveBeenCalledWith({ codigoccaf: 1 });
        expect(negocioRepository.create).toHaveBeenCalledWith(expect.objectContaining({
            rut: datos.rut,
            negocioName: datos.negocioName,
            usuario: usuarioMock,
        }));
        expect(negocioRepository.save).toHaveBeenCalledWith(negocioCreado);
        expect(result).toEqual(negocioCreado);
    });

    // Agrega más pruebas para cubrir los otros métodos del servicio
});
