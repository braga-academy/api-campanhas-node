const { DataTypes } = require('sequelize')
const sequelize = require('../config/db')

const categoriasValidas = ['Promoção', 'Descontos', 'Feriado', 'Novo Produto']

const Campanha = sequelize.define('Campanhas', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'O nome da campanha não pode estar vazio.'
            },
            len: {
                args: [3, 255],
                msg: 'O nome da campanha deve ter entre 3 e 255 caracteres.'
            }
        }
    },
    dataCadastro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    dataInicio: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: {
                msg: 'A data de início deve ser uma data válida.'
            },
            isAfter: {
                args: [new Date().toISOString()],
                msg: 'A data de início não pode ser no passado.'
            }
        }
    },
    dataFim: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
            isDate: {
                msg: 'A data de término deve ser uma data válida.'
            },
            isAfterDataInicio (value) {
                if (new Date(value) <= new Date(this.dataInicio)) {
                    throw new Error('A data de término não pode ser antes ou igual à data de início.')
                }
            }
        }
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'ativa',
        validate: {
            isIn: {
                args: [['ativa', 'pausada', 'expirada']],
                msg: 'Status deve ser um dos seguintes: ativa, pausada, expirada.'
            }
        }
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'A categoria da campanha não pode estar vazia.'
            },
            isIn: {
                args: [categoriasValidas],
                msg: 'Categoria inválida. As opções válidas são: ' + categoriasValidas.join(', '),
            },
        }
    },
}, {
    paranoid: true,
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt'
})

module.exports = Campanha
