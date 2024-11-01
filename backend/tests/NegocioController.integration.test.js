const request = require('supertest');
const express = require('express');
const AppDataSource = require('../src/datasource');
const negocioRouter = require('../src/controllers/negocioController');
const usuarioRouter = require('../src/controllers/usuarioController');

const app = express();
app.use(express.json());
app.use('/negocios', negocioRouter);
app.use('/usuarios', usuarioRouter);

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

describe('Pruebas de Integración - NegocioController', () => {
    let cookie;

    beforeEach(async () => {
        // Registrar y autenticar un usuario para obtener una cookie de autenticación
        const usuarioData = { username: 'usuario4', email: 'usuario4@example.com', password: 'password123' };
        await request(app).post('/usuarios').send(usuarioData);

        const loginResponse = await request(app)
            .post('/usuarios/login')
            .send({ email: usuarioData.email, password: usuarioData.password });

        cookie = loginResponse.headers['set-cookie'];
    });

    test('debe crear un nuevo negocio asociado al usuario autenticado', async () => {
        const negocioData = { name: 'Nuevo Negocio', address: 'Dirección 123', rut: '12345678-9', isActive: true };

        const response = await request(app)
            .post('/negocios')
            .set('Cookie', cookie)
            .send(negocioData)
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe(negocioData.name);
    });

    test('debe obtener todos los negocios y responder con status 200', async () => {
        const negocioData1 = { name: 'Negocio 1', address: 'Dirección 1', rut: '11111111-1', isActive: true };
        const negocioData2 = { name: 'Negocio 2', address: 'Dirección 2', rut: '22222222-2', isActive: true };
        await request(app).post('/negocios').set('Cookie', cookie).send(negocioData1);
        await request(app).post('/negocios').set('Cookie', cookie).send(negocioData2);

        const response = await request(app)
            .get('/negocios')
            .set('Cookie', cookie)
            .expect(200);

        expect(response.body.length).toBe(2);
    });

    test('debe obtener negocios por usuario', async () => {
        const negocioData = { name: 'Negocio Usuario', address: 'Dirección Usuario', rut: '33333333-3', isActive: true };
        await request(app).post('/negocios').set('Cookie', cookie).send(negocioData);

        const response = await request(app)
            .get('/negocios/1')
            .set('Cookie', cookie)
            .expect(200);

        expect(response.body.length).toBeGreaterThan(0);
        expect(response.body[0].rut).toBe(negocioData.rut);
    });

    test('debe prohibir la creación de un negocio sin autenticación', async () => {
        const negocioData = { name: 'Negocio Sin Acceso', address: 'Dirección 456', rut: '44444444-4', isActive: true };

        const response = await request(app)
            .post('/negocios')
            .send(negocioData)
            .expect(401);

        expect(response.body).toEqual({ message: 'Acceso no autorizado' });
    });
});
