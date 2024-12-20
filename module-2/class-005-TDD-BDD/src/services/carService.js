const { join } = require("path");
const { BaseRepository } = require("../repositories/base");
const { Tax } = require("../entities/tax");
const { Transaction } = require("../entities/transaction");

class CarService {
    constructor(){
        this.carRepo = new BaseRepository({ 
            file: join(__dirname, "../../database", "cars.json") 
        });
    }

    getRandomPositionFromArray(list){
        const listLength = list.length;
        return Math.floor(
            Math.random() * listLength
        );
    }

    chooseRandomcar(carCategory){
        const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds);
        return carCategory.carIds[randomCarIndex];
    }

    async getAvaiableCar(carCategory){
        const carId = this.chooseRandomcar(carCategory);
        return this.carRepo.find(carId);
    }

    calculateFinalPrice(customer, carCategory, numberOfDays){
        const { tax } = Tax.ageBasedTaxes.find(
            tax => customer.age >= tax.from && customer.age <= tax.to 
        );
        const finalPrice = (carCategory.price * tax) * numberOfDays;
        return new Intl.NumberFormat('pt-br', { 
            style: 'currency', currency: 'BRL' 
        }).format(finalPrice)
    }

    async rent(customer, carCategory, numberOfDays){
        const car = await this.getAvaiableCar(carCategory);
        const amount = this.calculateFinalPrice(customer, carCategory, numberOfDays);
        const today = new Date();
        today.setDate(today.getDate() + numberOfDays);
        const dueDate = today.toLocaleDateString("pt-br", {
            year: "numeric",
            month: "long",
            day: "2-digit"}
        );

        return new Transaction({
            customer,
            car,
            amount,
            dueDate
        });
    }
}

module.exports = { CarService };