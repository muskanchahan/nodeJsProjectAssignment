const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('cosmic_db', 'root', 'muskan!!!@00$', {
    host: 'localhost',
    dialect: 'mysql',
});

// Fix: Use the correct syntax for defining the model
const  cosmicBook = sequelize.define('cosmicBook', { // The first parameter should be a string
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
