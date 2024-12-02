// tests/ArchivoPrevired.unit.test.js

const ArchivoPreviredService = require('../src/services/archivoPreviredService');
const { AppDataSource } = require('../src/datasource');
const ArchivoPrevired = require('../src/entities/Previred/ArchivoPrevired');

jest.mock('../src/datasource', () => ({
    AppDataSource: {
        getRepository: jest.fn(),
    },
}));

describe('ArchivoPreviredService', () => {
    let archivoPreviredService;
    let mockRepository;

    beforeEach(() => {
        mockRepository = {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            merge: jest.fn(),
            remove: jest.fn(),
        };

        AppDataSource.getRepository.mockReturnValue(mockRepository);
        archivoPreviredService = new ArchivoPreviredService();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('debe obtener todos los archivos Previred', async () => { 
        // Arrange
        const data = { idNegocio: 1, mes: '01', anio: '2024' };
        const archivosPrevired = [{ id: 1, usuarioId: 1 }, { id: 2, usuarioId: 2 }];
        mockRepository.find.mockResolvedValue(archivosPrevired);

        // Act
        const result = await archivoPreviredService.obtenerArchivosPrevired(data);

        // Assert
        expect(mockRepository.find).toHaveBeenCalled();
        expect(result).toEqual(archivosPrevired);
    });

    test('debe obtener un archivo Previred por usuario', async () => {
        // Arrange
        const idUsuario = 1;
        const archivosPrevired = [{ id: 1, usuarioId: 1 }, { id: 2, usuarioId: 1 }];
        mockRepository.find.mockResolvedValue(archivosPrevired);

        // Act
        const result = await archivoPreviredService.obtenerArchivoPreviredPorUsuario(idUsuario);

        // Assert
        expect(mockRepository.find).toHaveBeenCalledWith({
            where: { usuarioId: idUsuario },
        });
        expect(result).toEqual(archivosPrevired);
    });

    test('debe crear un nuevo archivo Previred', async () => {
        // Arrange
        const archivoPrevired = { id: 1, usuarioId: 1 };
        const nuevoArchivoPrevired = { ...archivoPrevired };

        mockRepository.create.mockReturnValue(nuevoArchivoPrevired);
        mockRepository.save.mockResolvedValue(nuevoArchivoPrevired);

        // Act
        const result = await archivoPreviredService.crearArchivoPrevired(archivoPrevired);

        // Assert
        expect(mockRepository.create).toHaveBeenCalledWith(archivoPrevired);
        expect(mockRepository.save).toHaveBeenCalledWith(nuevoArchivoPrevired);
        expect(result).toEqual(nuevoArchivoPrevired);
    });
    
    test('debe actualizar un archivo Previred', async () => {
        // Arrange
        const id = 1;
        const archivoPreviredActualizado = { id, usuarioId: 1 };
        const archivoExistente = { id, usuarioId: 1 };

        mockRepository.findOne.mockResolvedValue(archivoExistente);
        mockRepository.merge.mockImplementation((target, source) => Object.assign(target, source));
        mockRepository.save.mockResolvedValue(archivoPreviredActualizado);

        // Act
        const result = await archivoPreviredService.actualizarArchivoPrevired(id, archivoPreviredActualizado);

        // Assert
        expect(mockRepository.findOne).toHaveBeenCalledWith({
            where: { id },
        });
        expect(mockRepository.merge).toHaveBeenCalledWith(archivoExistente, archivoPreviredActualizado);
        expect(mockRepository.save).toHaveBeenCalledWith(archivoExistente);
        expect(result).toEqual(archivoPreviredActualizado);
    });

    test('debe eliminar un archivo Previred', async () => {
        // Arrange
        const id = 1;
        const archivoPreviredEliminado = { id, usuarioId: 1 };

        mockRepository.findOne.mockResolvedValue(archivoPreviredEliminado);
        mockRepository.remove.mockResolvedValue(archivoPreviredEliminado);

        // Act
        const result = await archivoPreviredService.eliminarArchivoPrevired(id);

        // Assert
        expect(mockRepository.findOne).toHaveBeenCalledWith({
            where: { id },
        });
        expect(mockRepository.remove).toHaveBeenCalledWith(archivoPreviredEliminado);
        expect(result).toEqual(archivoPreviredEliminado);
    });
});
