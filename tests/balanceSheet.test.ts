import * as request from 'supertest';
import app from '../src/app';
import { AppDataSource } from '../src/data-source';
import { BalanceSheet } from '../src/entity/BalanceSheet';
import { Client } from '../src/entity/Client';

beforeAll(async () => {
    await AppDataSource.initialize();
    await AppDataSource.query('SET FOREIGN_KEY_CHECKS = 0');
    await AppDataSource.getRepository(BalanceSheet).clear();
    await AppDataSource.getRepository(Client).clear();
    await AppDataSource.query('SET FOREIGN_KEY_CHECKS = 1');
});

afterAll(async () => {
    await AppDataSource.query('SET FOREIGN_KEY_CHECKS = 0');
    await AppDataSource.getRepository(BalanceSheet).clear();
    await AppDataSource.getRepository(Client).clear();
    await AppDataSource.query('SET FOREIGN_KEY_CHECKS = 1');
    await AppDataSource.destroy();
});

describe('BalanceSheet CRUD Operations', () => {
    const createClient = async (firstName: string, lastName: string) => {
        const response = await request(app)
            .post('/api/clients/create')
            .send({ firstName, lastName });
        return response.body.id;
    };

    it('should create a new balance sheet', async () => {
        const clientId = await createClient('John', 'Doe');
        const response = await request(app)
            .post('/api/balance-sheets')
            .send({ clientId, year: 2024, result: 1500.00 });
        expect(response.status).toBe(201);
        expect(response.body.year).toBe(2024);
        expect(response.body.result).toBe(1500.00);
    });

    it('should get all balance sheets for a client', async () => {
        const clientId = await createClient('Alice', 'Smith');
        await request(app)
            .post('/api/balance-sheets')
            .send({ clientId, year: 2025, result: 1500.00 });
        const response = await request(app).get(`/api/balance-sheets/client/${clientId}`);
        expect(response.status).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it('should get a balance sheet by ID', async () => {
        const clientId = await createClient('Bob', 'Johnson');
        const newSheet = await request(app)
            .post('/api/balance-sheets')
            .send({ clientId, year: 2026, result: 1500.00 });
        const sheetId = newSheet.body.id;
        const response = await request(app).get(`/api/balance-sheets/${sheetId}`);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(sheetId);
        expect(response.body.year).toBe(2026);
    });

    it('should update a balance sheet', async () => {
        const clientId = await createClient('Charlie', 'Brown');
        const newSheet = await request(app)
            .post('/api/balance-sheets')
            .send({ clientId, year: 2027, result: 1500.00 });
        const sheetId = newSheet.body.id;
        const response = await request(app)
            .put(`/api/balance-sheets/${sheetId}`)
            .send({ year: 2027, result: 2000.00 });
        expect(response.status).toBe(200);
        expect(response.body.result).toBe(2000.00);
    });

});
