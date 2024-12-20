class Transaction {
    constructor({ customer, car, amount, dueDate }){
        this.customer = customer;
        this.car = car;
        this.amount = amount;
        this.dueDate = dueDate;
    }

    get receipt() {
        return `${this.car.name} alugado por ${this.customer.name} até ${this.dueDate} ao custo total de ${this.amount}`;
    }
}

module.exports = { Transaction };