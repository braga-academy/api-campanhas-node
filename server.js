const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const sequelize = require('./src/config/db')
const campanhaRoutes = require('./src/routes/campanhaRoutes')
const setupSwagger = require('./swagger/swagger')

setupSwagger(app)

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send(`
    <h1>Seja bem-vindo!! 🥳</h1>
    <p>Você pode acessar a documentação completa da API <a href="/api-docs" target="_blank">aqui</a>.</p>
  `)
})

app.use('/api/campanhas', campanhaRoutes)

sequelize.sync()
    .then(() => {
        app.listen(3000, '0.0.0.0', () => {
            console.log('Servidor rodando na porta 3000')
        })
    })
    .catch(err => console.log('Erro ao conectar com o banco de dados:', err))

module.exports = { app }
