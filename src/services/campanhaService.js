const CampanhaRepository = require('../repositories/campanhaRepository')

class CampanhaService {
    static async criarCampanha (campanhaData) {
        return await CampanhaRepository.criar(campanhaData)
    }

    static async listarCampanhas () {
        return await CampanhaRepository.listar()
    }

    static async obterCampanha (id) {
        return await CampanhaRepository.obterPorId(id)
    }

    static async atualizarCampanha (id, campanhaData) {
        return await CampanhaRepository.atualizar(id, campanhaData)
    }

    static async deletarCampanha (id) {
        return await CampanhaRepository.deletar(id)
    }
}

module.exports = CampanhaService
