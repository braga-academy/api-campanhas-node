const Campanha = require('../models/campanha')

class CampanhaRepository {
    static async criar (campanhaData) {
        return await Campanha.create(campanhaData)
    }

    static async listar () {
        return await Campanha.findAll()
    }

    static async obterPorId (id) {
        return await Campanha.findByPk(id)
    }

    static async atualizar (id, campanhaData) {
        const campanha = await Campanha.findByPk(id)
        if (campanha) {
            return await campanha.update(campanhaData)
        }
        return null
    }

    static async deletar (id) {
        const campanha = await Campanha.findByPk(id)
        if (campanha) {
            return await campanha.destroy()
        }
        return null
    }
}

module.exports = CampanhaRepository
