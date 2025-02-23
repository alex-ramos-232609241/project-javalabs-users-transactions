const request = require('supertest');
const app = require('../../src/app');
const { faker } = require('@faker-js/faker');

global.id_order = null;

describe('API Tests for Users', () => {
    
    it('should create a new user', async () => {
        const num = faker.number.int({ min: 1000, max: 9999 })
        const res = await request(app)
            .post('/users')
            .send({
                name: `user test ${num}`,
                email: 500.00
            });
        console.log("res tes")
        console.log(res)
        console.log("**** res test")
        expect(res.status).toBe(201);
        expect(res.body.data.data).toHaveProperty('id');

    });

    it('should list all Users', async () => {
        const res = await request(app)
            .get('/users')

        expect(res.status).toBe(200);
        expect(res.body).toBeInstanceOf(Object);
    });
});
