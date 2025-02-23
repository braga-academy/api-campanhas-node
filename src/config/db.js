const { Sequelize } = require('sequelize')
const config = require('../../config/config')
const env = process.env.NODE_ENV || 'development'

const dbConfig = config[env]

const sequelize = new Sequelize(
    `postgres://${ dbConfig.username }:${ dbConfig.password }@${ dbConfig.host }:5432/${ dbConfig.database }`,
    {
        dialect: dbConfig.dialect,
        dialectOptions: {
            ssl: false
        }
    }
)

module.exports = sequelize
