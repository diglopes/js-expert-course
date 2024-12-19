const { join } = require("path");
const { BaseRepository } = require("../repositories/base");

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
}

module.exports = { CarService };