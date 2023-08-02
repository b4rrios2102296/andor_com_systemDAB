const Sequelize = require('sequelize');

const sequelize =  new Sequelize('mydb', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    db: 'mydb',
    port: '3308'
    });

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
            });

module.exports = sequelize;
