import * as request from 'supertest';
import app from '../src/app';
import { AppDataSource } from '../src/data-source';
import { Client } from '../src/entity/Client';

beforeAll(async () => {
    await AppDataSource.initialize();
});

beforeEach(async () => {
    await AppDataSource.getRepository(Client).clear();
});

afterAll(async () => {
    await AppDataSource.destroy();
});

describe('Client CRUD Operations', () => {
    it('should create a new client', async () => {
        const response = await request(app)
            .post('/api/clients/create')
            .send({ firstName: 'John', lastName: 'Doe' });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.firstName).toBe('John');
    });

    it('should get all clients', async () => {
        await request(app).post('/api/clients/create').send({ firstName: 'John', lastName: 'Doe' });
        const response = await request(app).get('/api/clients/get/1'); // Change to appropriate ID or use other method to get list
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('id');
    });

    it('should get a client by ID', async () => {
        const newClient = await request(app).post('/api/clients/create').send({ firstName: 'John', lastName: 'Doe' });
        const clientId = newClient.body.id;
        const response = await request(app).get(`/api/clients/get/${clientId}`);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(clientId);
    });

    it('should update a client', async () => {
        const newClient = await request(app).post('/api/clients/create').send({ firstName: 'John', lastName: 'Doe' });
        const clientId = newClient.body.id;
        const response = await request(app)
            .put(`/api/clients/${clientId}`)
            .send({ firstName: 'Jane', lastName: 'Doe' });
        expect(response.status).toBe(200);
        expect(response.body.firstName).toBe('Jane');
    });

    it('should delete a client', async () => {
        const newClient = await request(app).post('/api/clients/create').send({ firstName: 'John', lastName: 'Doe' });
        const clientId = newClient.body.id;
        const response = await request(app).delete(`/api/clients/${clientId}`);
        expect(response.status).toBe(200);
        const getResponse = await request(app).get(`/api/clients/get/${clientId}`);
        expect(getResponse.status).toBe(404);
    });

    it('should check for duplicate clients', async () => {
        await request(app).post('/api/clients/create').send({ firstName: 'John', lastName: 'Doe' });
        await request(app).post('/api/clients/create').send({ firstName: 'John', lastName: 'Doe' });
        const response = await request(app).get('/api/clients/check-duplicates').query({ firstName: 'John', lastName: 'Doe' });
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should get all duplicate clients', async () => {
        await request(app).post('/api/clients/create').send({ firstName: 'John', lastName: 'Doe' });
        await request(app).post('/api/clients/create').send({ firstName: 'Jane', lastName: 'Doe' });
        const response = await request(app).get('/api/clients/duplicates');
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('totalDuplicates');
        expect(response.body.totalDuplicates).toBeGreaterThan(0);
        expect(response.body.duplicates).toBeInstanceOf(Array);
    });
});
