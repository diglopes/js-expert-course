import { Sequelize } from 'sequelize';
import { sequelize } from "../database.js";

export const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    age: Sequelize.INTEGER
})