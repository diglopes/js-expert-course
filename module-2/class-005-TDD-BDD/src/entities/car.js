const { BaseEntity } = require("./base");

class CarEntity extends BaseEntity {
    constructor({ id, name, releaseYear, avaiable, gasAvaible }){
        super({ id, name });
        this.releaseYear = releaseYear
        this.avaiable = avaiable
        this.gasAvaible = gasAvaible
    }
}


module.exports = CarEntity