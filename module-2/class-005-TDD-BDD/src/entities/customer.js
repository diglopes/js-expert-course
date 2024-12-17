const { BaseEntity } = require("./base");

class CustomerEntity extends BaseEntity {
    constructor({ id, name, age  }){
        super({ id, name});
        this.age = age
    }
}


module.exports = CustomerEntity