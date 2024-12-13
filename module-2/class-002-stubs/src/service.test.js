const { writeFile } = require("fs/promises");
const { Service } = require("./service")
const BASE_URL_1 = 'https://swapi.dev/api/planets/1'
const BASE_URL_2 = 'https://swapi.dev/api/planets/2'
const { createSandbox } = require('sinon');
const assert = require("assert");
const sinon = createSandbox()

const mocks = {
    alderaan: require('../mocks/alderaan.json'),
    tatooine: require('../mocks/tatooine.json'),
}

;(async () => {
    
    const sut = new Service()
    const stub = sinon.stub(
        sut,
        sut.makeRequest.name,
    )

    stub.withArgs(BASE_URL_1).resolves(mocks.tatooine)
    stub.withArgs(BASE_URL_2).resolves(mocks.alderaan)
    
    {
        const expected = {
            name: "Tatooine",
            surfaceWater: "1",
            movies: 5
        }

        const result = await sut.getPlanets(BASE_URL_1)
        assert.deepStrictEqual(result, expected)
        console.log('✅ Service Tatooine test passed!')
    }

    {
        const expected = {
            name: "Alderaan",
            surfaceWater: "40",
            movies: 2
        }

        const result = await sut.getPlanets(BASE_URL_2)
        assert.deepStrictEqual(result, expected)
        console.log('✅ Service Alderaan test passed!')
    }
})()