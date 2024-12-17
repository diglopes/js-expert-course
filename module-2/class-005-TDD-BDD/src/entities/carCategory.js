const { BaseEntity } = require("./base");

class CarCategoryEntity extends BaseEntity {
    constructor({ id, name, carIds, price }){
        super({ id, name });
        this.carIds = carIds
        this.price = price
    }
}


module.exports = CarCategoryEntity