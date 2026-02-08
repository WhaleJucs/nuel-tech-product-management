const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = require('../prismaClient')
const { validationResult } = require('express-validator')

const JWT_SECRET = process.env.JWT_SECRET || 'secret'

// Função para lidar com erros
const handleError = (res, err) => {
  console.error(err)
  return res.status(500).json({ error: 'Erro interno do servidor' })
}

// Registrar novo usuário
register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  // Validação dos resultados da requisição
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  try {
    // Verificar se as senhas coincidem
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'As senhas não coincidem' })
    }

    // Verificar se o usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return res.status(400).json({ error: 'Este email já está registrado' })
    }

    // Hash da senha
    const hashedPassword = bcrypt.hashSync(password, 8)

    // Criar novo usuário
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        isAdmin: false
      },
      select: {
        id: true,
        name: true,
        email: true,
        isAdmin: true
      }
    })

    // Gerar token JWT
    const token = jwt.sign(
      { id: newUser.id, isAdmin: newUser.isAdmin },
      JWT_SECRET,
      { expiresIn: 86400 } // 24 horas
    )

    return res.status(201).json({
      auth: true,
      token,
      user: newUser,
      message: 'Usuário registrado com sucesso!'
    })
  } 
  
  catch (err) {
    return handleError(res, err)
  }
}

// Login do usuário
login = async (req, res) => {
  const { email, password } = req.body

  // Validação dos resultados da requisição
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  try {
    // Procurar usuário
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' })
    }

    // Verificar senha
    const passwordIsValid = bcrypt.compareSync(password, user.password)

    if (!passwordIsValid) {
      return res.status(401).json({ error: 'Senha incorreta' })
    }

    // Gerar token JWT
    const token = jwt.sign(
      { id: user.id, isAdmin: user.isAdmin },
      JWT_SECRET,
      { expiresIn: 86400 } // 24 horas
    )

    return res.status(200).json({
      auth: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      },
      message: 'Login realizado com sucesso!'
    })
  } 
  
  catch (err) {
    return handleError(res, err)
  }
}

module.exports = {
  register,
  login
}
