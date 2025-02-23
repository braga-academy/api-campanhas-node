const { body, param } = require('express-validator')

const criarCampanhaValidation = [
    body('nome')
        .notEmpty().withMessage('O nome da campanha é obrigatório')
        .isString().withMessage('O nome da campanha deve ser uma string'),
    body('dataInicio')
        .notEmpty().withMessage('A data de início é obrigatória')
        .isISO8601().withMessage('A data de início deve ser uma data válida em formato ISO')
        .custom((value) => {
            const currentDate = new Date(Date.now())
            const dataInicio = new Date(value)

            if (dataInicio < currentDate) {
                throw new Error('A data de início deve ser igual ou posterior à data atual')
            }
            return true
        }),
    body('dataFim')
        .notEmpty().withMessage('A data de término é obrigatória')
        .isISO8601().withMessage('A data de término deve ser uma data válida em formato ISO')
        .custom((value, { req }) => {
            const startDate = new Date(req.body.dataInicio)
            const endDate = new Date(value)

            if (endDate <= startDate) {
                throw new Error('A data de término deve ser maior que a data de início')
            }

            const currentDate = new Date(Date.now())
            if (endDate < currentDate) {
                req.body.status = 'expirada'
            }
            return true
        }),
    body('status')
        .isIn(['ativa', 'pausada', 'expirada']).withMessage('O status deve ser "ativo", "pausada" ou "expirada"'),
]

const atualizarCampanhaValidation = [
    param('id').isInt().withMessage('O ID da campanha deve ser um número inteiro válido'),
    ...criarCampanhaValidation,
]

module.exports = { criarCampanhaValidation, atualizarCampanhaValidation }
