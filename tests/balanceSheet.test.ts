import * as request from 'supertest';
import app from '../src/app';
import { AppDataSource } from '../src/data-source';
import { BalanceSheet } from '../src/entity/BalanceSheet';
import { Client } from '../src/entity/Client';

beforeAll(async () => {
    await AppDataSource.initialize();
});

beforeEach(async () => {
    await AppDataSource.getRepository(BalanceSheet).clear();
    await AppDataSource.getRepository(Client).clear();
});

afterAll(async () => {
    await AppDataSource.destroy();
});

describe('BalanceSheet CRUD Operations', () => {
    let clientId: number;

    beforeEach(async () => {
        const clientResponse = await request(app)
            .post('/api/clients/create')
            .send({ firstName: 'John', lastName: 'Doe' });
        clientId = clientResponse.body.id;
    });

    it('should create a new balance sheet', async () => {
        const response = await request(app)
            .post('/api/balance-sheets')
            .send({ clientId, year: 2024, result: 1500.00 });
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('id');
        expect(response.body.year).toBe(2024);
    });

    it('should get all balance sheets for a client', async () => {
        await request(app).post('/api/balance-sheets').send({ clientId, year: 2024, result: 1500.00 });
        const response = await request(app).get(`/api/balance-sheets/client/${clientId}`);
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should get a balance sheet by ID', async () => {
        const newSheet = await request(app)
            .post('/api/balance-sheets')
            .send({ clientId, year: 2024, result: 1500.00 });
        const sheetId = newSheet.body.id;
        const response = await request(app).get(`/api/balance-sheets/${sheetId}`);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(sheetId);
    });

    it('should update a balance sheet', async () => {
        const newSheet = await request(app)
            .post('/api/balance-sheets')
            .send({ clientId, year: 2024, result: 1500.00 });
        const sheetId = newSheet.body.id;
        const response = await request(app)
            .put(`/api/balance-sheets/${sheetId}`)
            .send({ year: 2024, result: 2000.00 });
        expect(response.status).toBe(200);
        expect(response.body.result).toBe(2000.00);
    });

    it('should delete a balance sheet', async () => {
        const newSheet = await request(app)
            .post('/api/balance-sheets')
            .send({ clientId, year: 2024, result: 1500.00 });
        const sheetId = newSheet.body.id;
        const response = await request(app).delete(`/api/balance-sheets/${sheetId}`);
        expect(response.status).toBe(200);
        const getResponse = await request(app).get(`/api/balance-sheets/${sheetId}`);
        expect(getResponse.status).toBe(404);
    });
});
