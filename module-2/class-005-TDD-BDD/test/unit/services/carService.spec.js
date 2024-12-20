const { describe, test, beforeEach, afterEach } = require('mocha');
const { CarService } = require('../../../src/services/carService');
const { expect } = require('chai');
const sinon = require('sinon');
const { Tax } = require('../../../src/entities/tax');
const { Transaction } = require('../../../src/entities/transaction');

const mocks = {
  validCarCategory: require('../../mocks/valid-car-category.json'),
  validCar: require('../../mocks/valid-car.json'),
  validCustomer: require('../../mocks/valid-customer.json')
}

describe('CarService', () => {
  /**
   * @type {CarService}
   */
  let sut
  /**
   * @type {import('sinon').SinonSandbox}
   */
  let sandbox

  beforeEach(() => {
    sut = new CarService();
    sandbox = sinon.createSandbox();
  })

  afterEach(() => {
    sandbox.restore();
  })

  test("Given an array it should retrive a random item position", () => {
    const data = [0, 1, 2, 3, 4];
    const result = sut.getRandomPositionFromArray(data);

    expect(result).to.be.lte(data.length).and.to.be.gte(0);
  })

  test("Given an carCategory it should choose the first id", async () => {
    const carCategory = mocks.validCarCategory
    const carIndex = 0;

    sandbox.stub(
      sut,
      sut.getRandomPositionFromArray.name
    ).returns(carIndex);

    const result = sut.chooseRandomcar(carCategory);
    const expected = carCategory.carIds[carIndex];

    expect(result).to.be.equal(expected);
    expect(sut.getRandomPositionFromArray.calledOnce).to.be.ok;
  })

  test('Given a carCategory it should return an avaiable car', async () => {
    const car = mocks.validCar;
    const carCategory = Object.create(mocks.validCarCategory);
    carCategory.carIds = [car.id];

    sandbox.stub(
      sut.carRepo,
      sut.carRepo.find.name
    ).resolves(car);

    sandbox.spy(
      sut,
      sut.chooseRandomcar.name
    );

    const result = await sut.getAvaiableCar(carCategory);
    const expected = car

    expect(result).to.be.deep.equal(expected);
    expect(sut.chooseRandomcar.calledOnce).to.be.ok;
    expect(sut.carRepo.find.calledWithExactly(car.id)).to.be.ok;
  });

  test("Given a carCategory, customer and numberOfDays it should calculate final amount in real", async () => {
    const carCategory = Object.create(mocks.validCarCategory);
    carCategory.price = 37.6;

    const customer = Object.create(mocks.validCustomer);
    customer.age = 50;

    const numberOfDays = 5;

    sandbox.stub(
      Tax,
      "ageBasedTaxes"
    ).get(() => [{ from: 40, to: 50, tax: 1.3 }]);

    const expected = new Intl.NumberFormat('pt-br', { 
      style: 'currency', currency: 'BRL' 
    }).format(244.4);

    const result = sut.calculateFinalPrice(
      customer,
      carCategory,
      numberOfDays
    );
    
    
    console.log(result, expected)
    
    expect(result).to.be.deep.equal(expected);
  })

  test("Given a customer and a car category it should return a transaction receipt", async () => {
    const car = mocks.validCar;
    const carCategory = {
      ...mocks.validCarCategory,
      carIds: [car.id]
    }
    const customer = { ...mocks.validCustomer }
    const numberOfDays = 5;
    const dueDate = "10 de novembro de 2020";
    const now = new Date(2020, 10, 5);

    sandbox.useFakeTimers(now.getTime());

    sandbox.stub(
      sut,
      sut.getAvaiableCar.name
    ).resolves(car);

    sandbox.stub(
      sut,
      sut.calculateFinalPrice.name
    ).returns("R$ 244,40");


    const result = await sut.rent(
      customer,
      carCategory,
      numberOfDays
    );
    const expected = new Transaction({
      customer,
      car,
      amount: "R$ 244,40",
      dueDate
    })

    expect(result).to.be.deep.equal(expected);
  }) 
})