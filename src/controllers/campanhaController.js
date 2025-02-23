const { validationResult } = require('express-validator')
const CampanhaService = require('../services/campanhaService')
const { criarCampanhaValidation, atualizarCampanhaValidation } = require('../validators/campanhaValidator')

class CampanhaController {
    static async criarCampanha (req, res) {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            const campanhaData = req.body

            const campanha = await CampanhaService.criarCampanha(campanhaData)
            res.status(201).json(campanha)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Erro ao criar campanha', message: error.message })
        }
    }

    static async listarCampanhas (req, res) {
        try {
            const campanhas = await CampanhaService.listarCampanhas()
            res.status(200).json(campanhas)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Erro ao listar campanhas', message: error.message })
        }
    }

    static async obterCampanha (req, res) {
        try {
            const campanha = await CampanhaService.obterCampanha(req.params.id)
            if (!campanha) {
                return res.status(404).json({ error: 'Campanha não encontrada' })
            }
            res.status(200).json(campanha)
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Erro ao obter campanha', message: error.message })
        }
    }

    static async atualizarCampanha (req, res) {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            const campanhaData = req.body
            const campanhaId = req.params.id

            const campanha = await CampanhaService.atualizarCampanha(campanhaId, campanhaData)
            if (!campanha) {
                return res.status(404).json({ error: 'Campanha não encontrada para atualizar' })
            }
            res.status(200).json(campanha)
        } catch (error) {
            res.status(500).json({ error: 'Erro ao atualizar campanha', message: error.message })
        }
    }

    static async deletarCampanha (req, res) {
        try {
            const campanha = await CampanhaService.deletarCampanha(req.params.id)
            if (!campanha) {
                return res.status(404).json({ error: 'Campanha não encontrada para deletar' })
            }
            res.status(200).json({ message: 'Campanha deletada com sucesso' })
        } catch (error) {
            console.error(error)
            res.status(500).json({ error: 'Erro ao deletar campanha', message: error.message })
        }
    }
}

module.exports = { CampanhaController, criarCampanhaValidation, atualizarCampanhaValidation }
