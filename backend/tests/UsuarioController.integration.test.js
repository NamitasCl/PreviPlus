const request = require('supertest');
const express = require('express');
const AppDataSource = require('../src/datasource');
const usuarioRouter = require('../src/controllers/usuarioController');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());
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

describe('Pruebas de Integración - UsuarioController', () => {
    test('debe registrar un nuevo usuario y responder con status 201', async () => {
        const usuarioData = { username: 'usuario1', email: 'usuario1@example.com', password: 'password123' };

        const response = await request(app)
            .post('/usuarios')
            .send(usuarioData)
            .expect(201);

        expect(response.body).toHaveProperty('id');
        expect(response.body.username).toBe(usuarioData.username);
    });

    test('debe autenticar un usuario y establecer una cookie de token', async () => {
        const usuarioData = { username: 'usuario2', email: 'usuario2@example.com', password: 'password123' };
        await request(app).post('/usuarios').send(usuarioData);

        const response = await request(app)
            .post('/usuarios/login')
            .send({ email: usuarioData.email, password: usuarioData.password })
            .expect(200);

        expect(response.headers['set-cookie']).toBeDefined();
        expect(response.body.email).toBe(usuarioData.email);
    });

    test('debe prohibir el acceso a /me sin token de autenticación', async () => {
        const response = await request(app)
            .get('/usuarios/me')
            .expect(401);

        expect(response.body).toEqual({ message: 'No estás autenticado' });
    });

    test('debe permitir el acceso a /me con token en cookie', async () => {
        const usuarioData = { username: 'usuario3', email: 'usuario3@example.com', password: 'password123' };

        // Crea un agente de Supertest
        const agent = request.agent(app);

        // Registrar un nuevo usuario
        await agent.post('/usuarios').send(usuarioData);

        // Autenticar y establecer la cookie automáticamente en el agente
        await agent
            .post('/usuarios/login')
            .send({ email: usuarioData.email, password: usuarioData.password })
            .expect(200);

        // Realizar la solicitud a /me usando el agente que ya tiene la cookie
        const meResponse = await agent
            .get('/usuarios/me')
            .expect(200);

        expect(meResponse.body.email).toBe(usuarioData.email);
    });
});