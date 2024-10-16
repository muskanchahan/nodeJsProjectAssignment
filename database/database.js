const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config(); // Load environment variables from .env file

// Use environment variables for database configuration
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
});

// Define the `cosmicBook` model
const cosmicBook = sequelize.define('cosmicBook', {
    bookName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    authorName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    yearOfPublication: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    discount: {
        type: DataTypes.DECIMAL(5, 2),
        defaultValue: 0.00,
    },
    numberOfPages: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    condition: {
        type: DataTypes.ENUM('new', 'used'),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});

// Sync the model with the database
sequelize.sync()
    .then(() => {
        console.log('Database & table created');
    })
    .catch((error) => {
        console.error('Error creating database or table:', error);
    });

module.exports = {
    sequelize,
    cosmicBook,
};

 