const prisma = require('../prismaClient')
const { validationResult } = require('express-validator')

// Função para lidar com erros
const handleError = (res, err) => {
  console.error(err)
  return res.status(500).json({ error: 'Erro interno do servidor' })
}

// Obter todos os produtos
getProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany()
    
    return res.json(products)
  } 
  
  catch (err) {
    return handleError(res, err)
  }
}

// Criar novo produto
createProduct = async (req, res) => {
  // Validação dos resultados da requisição
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  const { name, description, price, category, stock } = req.body

  try {
    const product = await prisma.product.create({
      data: {
        name,
        description: description || null,
        price: Number(price),
        category,
        stock: Number(stock),
      },
    })

    return res.status(201).json(product)
  } 
  
  catch (err) {
    return handleError(res, err)
  }
}

// Atualizar produto
updateProduct = async (req, res) => {
  const { id } = req.params
  const { name, description, price, category, stock } = req.body
  // Validação dos resultados da requisição
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  try {
    const existing = await prisma.product.findUnique({ where: { id: Number(id) } })
    if (!existing) return res.status(404).json({ error: 'Produto não encontrado' })

    const data = {}
    if (name !== undefined) data.name = name
    if (description !== undefined) data.description = description
    if (price !== undefined) data.price = Number(price)
    if (category !== undefined) data.category = category
    if (stock !== undefined) data.stock = Number(stock)

    const updated = await prisma.product.update({
      where: { id: Number(id) },
      data,
    })

    return res.json(updated)
  } 
  
  catch (err) {
    return handleError(res, err)
  }
}

// Deletar produto
deleteProduct = async (req, res) => {
  const { id } = req.params

  try {
    await prisma.product.delete({ where: { id: Number(id) } })
    return res.status(204).send()
  } 
  
  catch (err) {
    // Tratamento específico para erro de não encontrado
    if (err.code === 'P2025') return res.status(404).json({ error: 'Produto não encontrado' })
    return handleError(res, err)
  }
}

module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
}