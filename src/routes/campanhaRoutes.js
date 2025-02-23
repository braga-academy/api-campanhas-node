const express = require('express')
const { CampanhaController, criarCampanhaValidation, atualizarCampanhaValidation } = require('../controllers/campanhaController')
const router = express.Router()

router.post('/', criarCampanhaValidation, CampanhaController.criarCampanha)

/**
 * @swagger
 * /api/campanhas:
 *   post:
 *     summary: Cria uma nova campanha
 *     description: Cria uma nova campanha no sistema. Os dados necessários devem ser enviados no corpo da requisição.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: O nome da campanha.
 *               dataInicio:
 *                 type: string
 *                 format: date-time
 *                 description: A data de início da campanha.
 *               dataFim:
 *                 type: string
 *                 format: date-time
 *                 description: A data de término da campanha.
 *               status:
 *                 type: string
 *                 enum: [ativa, pausada, expirada]
 *                 description: O status da campanha.
 *               categoria:
 *                 type: string
 *                 description: A categoria da campanha.
 *     responses:
 *       201:
 *         description: Campanha criada com sucesso.
 *       400:
 *         description: Dados inválidos ou campos obrigatórios ausentes.
 */

router.get('/', CampanhaController.listarCampanhas)

/**
 * @swagger
 * /api/campanhas:
 *   get:
 *     summary: Retorna todas as campanhas
 *     description: Obtém uma lista de todas as campanhas cadastradas no sistema.
 *     responses:
 *       200:
 *         description: Lista de campanhas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nome:
 *                     type: string
 *                   dataCadastro:
 *                     type: string
 *                     format: date-time
 *                   dataInicio:
 *                     type: string
 *                     format: date-time
 *                   dataFim:
 *                     type: string
 *                     format: date-time
 *                   status:
 *                     type: string
 *                     enum: [ativa, pausada, expirada]
 *                   categoria:
 *                     type: string
 */

// Rota para obter uma campanha específica
router.get('/:id', CampanhaController.obterCampanha)

/**
 * @swagger
 * /api/campanhas/{id}:
 *   get:
 *     summary: Retorna uma campanha específica
 *     description: Obtém os detalhes de uma campanha com base no seu ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da campanha a ser retornada.
 *     responses:
 *       200:
 *         description: Detalhes da campanha
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nome:
 *                   type: string
 *                 dataCadastro:
 *                   type: string
 *                   format: date-time
 *                 dataInicio:
 *                   type: string
 *                   format: date-time
 *                 dataFim:
 *                   type: string
 *                   format: date-time
 *                 status:
 *                   type: string
 *                   enum: [ativa, pausada, expirada]
 *                 categoria:
 *                   type: string
 *       404:
 *         description: Campanha não encontrada.
 */

router.put('/:id', atualizarCampanhaValidation, CampanhaController.atualizarCampanha)

/**
 * @swagger
 * /api/campanhas/{id}:
 *   put:
 *     summary: Atualiza uma campanha específica
 *     description: Atualiza os detalhes de uma campanha existente com base no seu ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da campanha a ser atualizada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: O nome da campanha.
 *               dataInicio:
 *                 type: string
 *                 format: date-time
 *                 description: A data de início da campanha.
 *               dataFim:
 *                 type: string
 *                 format: date-time
 *                 description: A data de término da campanha.
 *               status:
 *                 type: string
 *                 enum: [ativa, pausada, expirada]
 *                 description: O status da campanha.
 *               categoria:
 *                 type: string
 *                 description: A categoria da campanha.
 *     responses:
 *       200:
 *         description: Campanha atualizada com sucesso.
 *       400:
 *         description: Dados inválidos ou campos obrigatórios ausentes.
 *       404:
 *         description: Campanha não encontrada.
 */

router.delete('/:id', CampanhaController.deletarCampanha)

/**
 * @swagger
 * /api/campanhas/{id}:
 *   delete:
 *     summary: Deleta uma campanha específica
 *     description: Deleta uma campanha com base no seu ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da campanha a ser deletada.
 *     responses:
 *       200:
 *         description: Campanha deletada com sucesso.
 *       404:
 *         description: Campanha não encontrada.
 */

module.exports = router
