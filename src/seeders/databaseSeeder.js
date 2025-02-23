const sequelize = require('../config/db')
const campanhaSeeder = require('./20250222160026-campanhas.js') // Importe a seeder

const runSeeders = async () => {
    try {
        console.log('Iniciando processo de seed...')
        await sequelize.sync({ force: true })

        await campanhaSeeder.up(sequelize.getQueryInterface(), sequelize.Sequelize)
        console.log('Seeders executadas com sucesso!')
    } catch (err) {
        console.error('Erro ao rodar seeders:', err)
    } finally {
        process.exit(0)
    }
}

runSeeders()
