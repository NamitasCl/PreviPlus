const request = require('supertest');
const express = require('express');
const cookieParser = require('cookie-parser');
const AppDataSource = require('../src/datasource');
const negocioRouter = require('../src/controllers/negocioController');
const usuarioRouter = require('../src/controllers/usuarioController');

const app = express();
app.use(express.json());
app.use(cookieParser()); // Añadimos cookie-parser para manejar las cookies
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
    let agent;
    let userId;

    beforeEach(async () => {
        // Creamos un agente de Supertest para manejar las cookies automáticamente
        agent = request.agent(app);

        // Registrar y autenticar un usuario para obtener una cookie de autenticación
        const usuarioData = { username: 'usuario4', email: 'usuario4@example.com', password: 'password123' };
        await agent.post('/usuarios').send(usuarioData);

        await agent
            .post('/usuarios/login')
            .send({ email: usuarioData.email, password: usuarioData.password });

        // Obtener el ID del usuario autenticado
        const meResponse = await agent.get('/usuarios/me');
        userId = meResponse.body.id;
    });

    test('debe crear un nuevo negocio asociado al usuario autenticado', async () => {
        const negocioData = { name: 'Nuevo Negocio', address: 'Dirección 123', rut: '12345678-9', isActive: true };

        const response = await agent
            .post('/negocios')
            .send(negocioData)
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.name).toBe(negocioData.name);
        expect(response.body.usuario.id).toBe(userId); // Verificamos que el negocio esté asociado al usuario
    });

    test('debe obtener todos los negocios y responder con status 200', async () => {
        const negocioData1 = { name: 'Negocio 1', address: 'Dirección 1', rut: '11111111-1', isActive: true };
        const negocioData2 = { name: 'Negocio 2', address: 'Dirección 2', rut: '22222222-2', isActive: true };
        await agent.post('/negocios').send(negocioData1);
        await agent.post('/negocios').send(negocioData2);

        const response = await agent
            .get('/negocios')
            .expect(200);

        expect(response.body.length).toBe(2);
    });

    test('debe obtener negocios por usuario', async () => {
        const negocioData = { name: 'Negocio Usuario', address: 'Dirección Usuario', rut: '33333333-3', isActive: true };
        await agent.post('/negocios').send(negocioData);

        const response = await agent
            .get(`/negocios/${userId}`)
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

        expect(response.body).toEqual({ message: 'No estás autenticado' }); // Mensaje según el middleware
    });
});
