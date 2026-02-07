require('dotenv').config()
const express = require('express')
const cors = require('cors')
const productsRouter = require('./routes/products')

// Criação do app Express
const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Rotas 
app.use('/products', productsRouter)

// Iniciar o servidor
const port = process.env.PORT || 3001

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})
