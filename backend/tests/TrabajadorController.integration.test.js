// tests/trabajadorController.integration.test.js

const request = require('supertest');
const express = require('express');
const cookieParser = require('cookie-parser');
const AppDataSource = require('../src/datasource');
const trabajadorRouter = require('../src/controllers/trabajadorController');
const usuarioRouter = require('../src/controllers/usuarioController');
const negocioRouter = require('../src/controllers/negocioController');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use('/trabajadores', trabajadorRouter);
app.use('/usuarios', usuarioRouter);
app.use('/negocios', negocioRouter);

beforeAll(async () => {
    await AppDataSource.initialize();
});

afterAll(async () => {
    await AppDataSource.destroy();
});

beforeEach(async () => {
    const entities = AppDataSource.entityMetadatas;
    for (const entity of entities) {
        const repository = AppDataSource.getRepository(entity.name);
        await repository.clear();
    }
});

describe('Pruebas de Integración - trabajadorController', () => {
    let agent;
    let userId;
    let negocioId;

    beforeEach(async () => {
        agent = request.agent(app);

        // Registrar y autenticar un usuario
        const usuarioData = { username: 'usuarioTest', email: 'usuario@test.com', password: 'password123' };
        await agent.post('/usuarios').send(usuarioData);

        await agent
            .post('/usuarios/login')
            .send({ email: usuarioData.email, password: usuarioData.password });

        const meResponse = await agent.get('/usuarios/me');
        userId = meResponse.body.id;

        // Crear un negocio asociado al usuario
        const negocioData = { name: 'Negocio Test', address: 'Dirección Test', rut: '12345678-9', isActive: true };
        const negocioResponse = await agent.post('/negocios').send(negocioData);
        negocioId = negocioResponse.body.id;
    });

    test('debe crear un nuevo trabajador', async () => {
        const trabajadorData = {
            rut: '12345678-9',
            dv: '9',
            patlastname: 'Pérez',
            matlastname: 'Gómez',
            names: 'Juan',
            genre: 'M',
            nationality: 'Chilena',
            negocioId: negocioId
        };

        const response = await agent
            .post('/trabajadores')
            .send(trabajadorData)
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.rut).toBe(trabajadorData.rut);
    });

    test('no debe crear un trabajador si faltan datos', async () => {
        const trabajadorData = {
            dv: '9',
            names: 'Juan',
            genre: 'M',
            nationality: 'Chilena',
            negocioId: negocioId
        };

        const response = await agent
            .post('/trabajadores')
            .send(trabajadorData)
            .expect(400);

        expect(response.body.errores).toBeDefined();
    });

    test('debe obtener todos los trabajadores', async () => {
        // Crear un trabajador primero
        const trabajadorData = {
            rut: '12345678-9',
            dv: '9',
            patlastname: 'Pérez',
            matlastname: 'Gómez',
            names: 'Juan',
            genre: 'M',
            nationality: 'Chilena',
            negocioId: negocioId
        };

        await agent.post('/trabajadores').send(trabajadorData);

        const response = await agent
            .get('/trabajadores')
            .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0].rut).toBe(trabajadorData.rut);
    });

    test('debe obtener un trabajador por RUT', async () => {
        const trabajadorData = {
            rut: '12345678-9',
            dv: '9',
            patlastname: 'Pérez',
            matlastname: 'Gómez',
            names: 'Juan',
            genre: 'M',
            nationality: 'Chilena',
            negocioId: negocioId
        };

        await agent.post('/trabajadores').send(trabajadorData);

        const response = await agent
            .get(`/trabajadores/${trabajadorData.rut}`)
            .expect(200);

        expect(response.body.rut).toBe(trabajadorData.rut);
    });

    test('debe actualizar un trabajador existente', async () => {
        const trabajadorData = {
            rut: '12345678-9',
            dv: '9',
            patlastname: 'Pérez',
            matlastname: 'Gómez',
            names: 'Juan',
            genre: 'M',
            nationality: 'Chilena',
            negocioId: negocioId
        };

        await agent.post('/trabajadores').send(trabajadorData);

        const nuevosDatos = { names: 'Juan Actualizado' };

        const response = await agent
            .put(`/trabajadores/${trabajadorData.rut}`)
            .send(nuevosDatos)
            .expect(200);

        expect(response.body.names).toBe(nuevosDatos.names);
    });

    test('debe eliminar un trabajador existente', async () => {
        const trabajadorData = {
            rut: '12345678-9',
            dv: '9',
            patlastname: 'Pérez',
            matlastname: 'Gómez',
            names: 'Juan',
            genre: 'M',
            nationality: 'Chilena',
            negocioId: negocioId
        };

        await agent.post('/trabajadores').send(trabajadorData);

        await agent
            .delete(`/trabajadores/${trabajadorData.rut}`)
            .expect(200);

        // Verificar que el trabajador ya no existe
        await agent
            .get(`/trabajadores/${trabajadorData.rut}`)
            .expect(404);
    });

    test('debe obtener trabajadores por negocio', async () => {
        const trabajadorData = {
            rut: '12345678-9',
            dv: '9',
            patlastname: 'Pérez',
            matlastname: 'Gómez',
            names: 'Juan',
            genre: 'M',
            nationality: 'Chilena',
            negocioId: negocioId
        };

        await agent.post('/trabajadores').send(trabajadorData);

        const response = await agent
            .get(`/trabajadores/business/${negocioId}`)
            .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0].negocio.id).toBe(negocioId);
    });
});
