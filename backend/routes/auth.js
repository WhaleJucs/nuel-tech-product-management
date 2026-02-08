const express = require('express')
const { body, validationResult } = require('express-validator')
const router = express.Router()
const { register, login } = require('../controllers/authController')

// Regras de validação para registro
const registerValidation = [
  body('name').isString().notEmpty().withMessage('Nome é obrigatório'),
  body('email').isEmail().withMessage('Email inválido'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Senha deve ter pelo menos 6 caracteres')
    .isStrongPassword({
      minLength: 6,
      minLowercase: 0,
      minUppercase: 0,
      minNumbers: 0,
      minSymbols: 0
    }),
  body('confirmPassword').notEmpty().withMessage('Confirmação de senha é obrigatória')
]

// Regras de validação para login
const loginValidation = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('Senha é obrigatória')
]

// Rotas de autenticação
router.post('/register', registerValidation, register)
router.post('/login', loginValidation, login)

module.exports = router
