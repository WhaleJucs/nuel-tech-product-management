const express = require('express')
const { body, param } = require('express-validator')
const router = express.Router()
const { adminMiddleware } = require('../middlewares/auth')
const {
        getProducts,
        getProduct,
        createProduct,
        updateProduct,
        deleteProduct,
} = require('../controllers/productController')

// Regras de validação para criação de produto
const createValidation = [
    body('name').isString().notEmpty().withMessage('nome é obrigatório'),
    body('price').isFloat({ min: 0 }).withMessage('preço deve ser um número >= 0'),
    body('category').isString().notEmpty().withMessage('categoria é obrigatória'),
    body('stock').isInt({ min: 0 }).withMessage('estoque deve ser um inteiro >= 0'),
    body('description').optional().isString().withMessage('descrição deve ser uma string'),
]

// Regras de validação para atualização de produto
const updateValidation = [
    param('id').isInt().withMessage('id deve ser um inteiro'),
    body('name').optional().isString().notEmpty().withMessage('nome deve ser uma string não vazia'),
    body('price').optional().isFloat({ min: 0 }).withMessage('preço deve ser um número >= 0'),
    body('category').optional().isString().notEmpty().withMessage('categoria deve ser uma string não vazia'),
    body('stock').optional().isInt({ min: 0 }).withMessage('estoque deve ser um inteiro >= 0'),
    body('description').optional().isString().withMessage('descrição deve ser uma string'),
]

// Rotas de produtos

// GET (listar todos) - Público
router.get('/', getProducts)

// GET/:id (obter um específico) - Público
router.get('/:id', getProduct)

// POST (criar) - Requer autenticação de admin
router.post('/', adminMiddleware, createValidation, createProduct)

// PUT/:id (atualizar) - Requer autenticação de admin
router.put('/:id', adminMiddleware, updateValidation, updateProduct)

// DELETE/:id (deletar) - Requer autenticação de admin
router.delete('/:id', adminMiddleware, deleteProduct)

module.exports = router