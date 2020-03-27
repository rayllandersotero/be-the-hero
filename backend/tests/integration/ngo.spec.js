const request = require('supertest');
const app = require('../../src/bin/app');
const database = require('../../src/database/connection');

describe('NGO', () => {
	beforeEach(async () => {
		await database.migrate.rollback();
		await database.migrate.latest();
	});

	afterAll(async () => {
		await database.destroy();
	});

	it('should be able to create a new NGO', async () => {
		const response = await request(app).post('/ngos').send({
			name: 'Ngo Teste',
			email: 'ngo@teste.com',
			whatsapp: '5532900000000',
			city: 'New York',
			uf: 'NY'
		});

		expect(response.body).toHaveProperty('id');
		expect(response.body.id).toHaveLength(8);
	});
});
