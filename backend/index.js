require('dotenv').config()
const express = require('express')
const cors = require('cors')
const productsRouter = require('./routes/products')
const authRouter = require('./routes/auth')
const { adminMiddleware } = require('./middlewares/auth')

// Criação do app Express
const app = express()

// Middlewares globais
app.use(cors()) // Permite requisições de diferentes origens (frontend)
app.use(express.json()) // Permite receber dados JSON no body das requisições

// Rotas de autenticação (públicas)
app.use('/auth', authRouter)

// Rotas de produtos
// GET e GET/:id são públicos (qualquer pessoa pode visualizar)
// POST, PUT, DELETE requerem token JWT de admin (apenas administradores podem modificar)
app.use('/products', productsRouter)

// Inicia o servidor na porta especificada no .env ou 3001 por padrão
const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})
