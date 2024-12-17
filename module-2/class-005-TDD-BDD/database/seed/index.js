const { writeFile } = require("fs/promises");
const CarEntity = require("../../src/entities/car");
const CustomerEntity = require("../../src/entities/customer");
const CarCategoryEntity = require("../../src/entities/carCategory");
const { join } = require("path");
const { faker } = require('@faker-js/faker');

const MAX_ITEMS = 2
const seederBaseFolder = join(__dirname, "..")

const carCategory = new CarCategoryEntity({
    id: faker.string.uuid(),
    name: faker.vehicle.type(),
    carIds: [],
})

const cars = []
const customers = []

for (let i = 0; i < MAX_ITEMS; i++) {
    cars.push(new CarEntity({
        id: faker.string.uuid(),
        name: faker.vehicle.model(),
        avaiable: true,
        gasAvaible: true,
        releaseYear: faker.date.past().getFullYear(),
    }))

    customers.push(new CustomerEntity({
        id: faker.string.uuid(),
        name: faker.person.firstName(),
        age: faker.number.int({ min: 18, max: 65 }),
    }))
}

const fileWriter = (fileName, data) =>  writeFile(join(seederBaseFolder, fileName), JSON.stringify(data, null, 2))

;(async () => {
    await fileWriter("cars.json", cars)
    await fileWriter("customers.json", customers)
    await fileWriter("carCategory.json", [carCategory])
})()