const { it, describe } = require('mocha')
const { app } = require('./api');
const assert = require('assert');
const supertest = require('supertest')(app);

describe('API Suite Test', () => {
    describe('Default route', () => {
        it('should return 404 when route does not exist', async () => {
            await supertest
                .get('/non-existing-route')
                .expect(404)
        })
    });

    describe('/api', () => {
        it('should return 200 when calling /api', async () => {
            await supertest
                .get('/api')
                .expect(200)
        });
    });

    describe('/login', () => {
        it('should return 200 when user is correct', async () => {
            const result = await supertest
                .post('/login')
                .send({ user: 'admin', pass: 'admin'})
                .expect(200)     

            assert.deepStrictEqual(JSON.parse(result.text), { message: 'Logged in' });
        });

        it('should return 401 when user is incorrect', async () => {
            const result = await supertest
                .post('/login')
                .send({ user: 'foo', pass: 'bar'})
                .expect(401)     

            assert.deepStrictEqual(JSON.parse(result.text), { message: 'Login failed!' });
        });

        it("should return 400 when user doesn't send user and pass", async () => {
            const result = await supertest
                .post('/login')
                .send({})
                .expect(400)     

            assert.deepStrictEqual(JSON.parse(result.text), { message: 'Bad request' });
        });
    })
})