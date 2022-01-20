const Sequelize = require('sequelize')

const sequelize = new Sequelize('node-complete', 'root', 'NODE123456', {
    dialect: 'mysql',
    host: 'localhost'
})

module.exports = sequelize //  sequelize is an object which is essentially the database connection pool,
//but managed by sequelize that is giving us a lot of useful features