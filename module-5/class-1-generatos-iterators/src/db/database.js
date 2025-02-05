import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite',
    host: "node-app",
    database: 'database',
    logging: false
})