require('dotenv').config()
const express = require('express')
const cors = require('cors')
const productsRouter = require('./routes/products')
const authRouter = require('./routes/auth')
const { adminMiddleware } = require('./middlewares/auth')

// Criação do app Express
const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Rotas de autenticação (públicas)
app.use('/auth', authRouter)

// Rotas de produtos
// GET e GET/:id são públicos (sem autenticação)
// POST, PUT, DELETE requerem token de admin
app.use('/products', productsRouter)

// Iniciar o servidor
const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})
