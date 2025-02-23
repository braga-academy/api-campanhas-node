const request = require('supertest')
const { app } = require('../../server')
const Campanha = require('../models/campanha')
const sequelize = require('../config/db')

let server

afterEach(async () => {
    await Campanha.destroy({ where: {}, truncate: true })
})

beforeAll(async () => {
    await sequelize.sync({ force: true })
    server = app.listen(4000)
})

describe('Campanha Controller', () => {
    it('should create a new campanha with valid data', async () => {
        const campanhaData = {
            nome: 'Campanha de Teste',
            dataInicio: new Date(Date.now() + 86400000).toISOString(),
            dataFim: new Date(Date.now() + 7 * 86400000).toISOString(),
            status: 'ativa',
            categoria: 'Descontos',
        }

        const res = await request(app).post('/api/campanhas').send(campanhaData)
        console.log(res)


        expect(res.status).toBe(201)
        expect(res.body).toHaveProperty('id')
        expect(res.body.nome).toBe(campanhaData.nome)
        expect(res.body.dataInicio).toBe(campanhaData.dataInicio)
        expect(res.body.dataFim).toBe(campanhaData.dataFim)
    })

    it('should fail if required fields are missing', async () => {
        const res = await request(app).post('/api/campanhas').send({})

        expect(res.status).toBe(400)
        expect(res.body.errors).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ msg: 'O nome da campanha é obrigatório' }),
                expect.objectContaining({ msg: 'A data de início é obrigatória' }),
                expect.objectContaining({ msg: 'A data de término é obrigatória' }),
            ])
        )
    })

    it('should fail if dataInicio is in the past', async () => {
        const campanhaData = {
            nome: 'Campanha Inválida',
            dataInicio: new Date(Date.now() - 86400000).toISOString(),
            dataFim: new Date(Date.now() + 7 * 86400000).toISOString(),
            status: 'ativa',
            categoria: 'promoção',
        }

        const res = await request(app).post('/api/campanhas').send(campanhaData)

        expect(res.status).toBe(400)
        expect(res.body.errors).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ msg: 'A data de início deve ser igual ou posterior à data atual' }),
            ])
        )
    })

    it('should fail if dataFim is before or equal to dataInicio', async () => {
        const campanhaData = {
            nome: 'Campanha Inválida',
            dataInicio: new Date(Date.now() + 86400000).toISOString(),
            dataFim: new Date(Date.now() + 86400000).toISOString(),
            status: 'ativa',
            categoria: 'promoção',
        }

        const res = await request(app).post('/api/campanhas').send(campanhaData)

        expect(res.status).toBe(400)
        expect(res.body.errors).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ msg: 'A data de término deve ser maior que a data de início' }),
            ])
        )
    })

    it('should fail if status is invalid', async () => {
        const campanhaData = {
            nome: 'Campanha Inválida',
            dataInicio: new Date(Date.now() + 86400000).toISOString(),
            dataFim: new Date(Date.now() + 7 * 86400000).toISOString(),
            status: 'pendente',
            categoria: 'promoção',
        }

        const res = await request(app).post('/api/campanhas').send(campanhaData)

        expect(res.status).toBe(400)
        expect(res.body.errors).toEqual(
            expect.arrayContaining([
                expect.objectContaining({ msg: 'O status deve ser "ativo", "pausada" ou "expirada"' }),
            ])
        )
    })

    it('should return an error if campanha not found for update', async () => {
        const novaCampanhaData = {
            nome: 'Campanha Atualizada',
            dataInicio: new Date(Date.now() + 86400000).toISOString(),
            dataFim: new Date(Date.now() + 7 * 86400000).toISOString(),
            status: 'ativa',
            categoria: 'desconto',
        }

        const res = await request(app).put('/api/campanhas/999999').send(novaCampanhaData)

        expect(res.status).toBe(404)
        expect(res.body).toHaveProperty('error', 'Campanha não encontrada para atualizar')
    })

    it('should return an error if ID is invalid', async () => {
        const res = await request(app).put('/api/campanhas/invalidID').send({
            nome: 'Campanha Atualizada',
            dataInicio: new Date(Date.now() + 86400000).toISOString(),
            dataFim: new Date(Date.now() + 7 * 86400000).toISOString(),
            status: 'ativa',
            categoria: 'desconto',
        })

        expect(res.status).toBe(400)
        expect(res.body.errors.some(error => error.msg === 'O ID da campanha deve ser um número inteiro válido')).toBe(true)
    })

    it('should return an error if dataInicio or dataFim is invalid', async () => {
        const campanhaData = {
            nome: 'Campanha Expirada',
            dataInicio: new Date(Date.now() - 86400000).toISOString(),
            dataFim: new Date(Date.now() - 86500000).toISOString(),
            status: 'ativa',
            categoria: 'promoção',
        }

        const res = await request(app).post('/api/campanhas').send(campanhaData)

        expect(res.status).toBe(400)

        expect(res.body.errors.some(error => error.msg === 'A data de início deve ser igual ou posterior à data atual')).toBe(true)
        expect(res.body.errors.some(error => error.msg === 'A data de término deve ser maior que a data de início')).toBe(true)
    })

})

afterAll(() => {
    server.close()
})
