'use strict'

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Campanhas', [
      {
        nome: 'Campanha de Verão',
        dataCadastro: new Date(),
        dataInicio: new Date('2025-06-01T00:00:00Z'),
        dataFim: new Date('2025-07-01T00:00:00Z'),
        status: 'ativa',
        categoria: 'Promoção',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Campanha Black Friday',
        dataCadastro: new Date(),
        dataInicio: new Date('2025-11-01T00:00:00Z'),
        dataFim: new Date('2025-11-30T23:59:59Z'),
        status: 'ativa',
        categoria: 'Descontos',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Campanha de Natal',
        dataCadastro: new Date(),
        dataInicio: new Date('2025-12-01T00:00:00Z'),
        dataFim: new Date('2025-12-31T23:59:59Z'),
        status: 'ativa',
        categoria: 'Feriado',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Campanhas', null, {})
  }
}
