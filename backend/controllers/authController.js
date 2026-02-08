const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const prisma = require('../prismaClient')
const { validationResult } = require('express-validator')

/**
 * Controller de Autenticação
 * Gerencia registro de novos usuários e login
 * Utiliza bcrypt para hash de senhas e JWT para tokens de autenticação
 */

const JWT_SECRET = process.env.JWT_SECRET || 'secret'

// Função auxiliar para lidar com erros de servidor
const handleError = (res, err) => {
  console.error(err)
  return res.status(500).json({ error: 'Erro interno do servidor' })
}

// Cria um usuário comum
register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  // Validação dos resultados da requisição
  const errors = validationResult(req)
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

  try {
    // Verifica se as senhas coincidem
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'As senhas não coincidem' })
    }

    // Verifica se o usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return res.status(400).json({ error: 'Este email já está registrado' })
    }

    // Hash da senha
    const hashedPassword = bcrypt.hashSync(password, 8)

    // Cria novo usuário
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

    // Gera token JWT
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
    // Procura usuário
    const user = await prisma.user.findUnique({
      where: { email }
    })

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' })
    }

    // Verifica senha
    const passwordIsValid = bcrypt.compareSync(password, user.password)

    if (!passwordIsValid) {
      return res.status(401).json({ error: 'Senha incorreta' })
    }

    // Gera token JWT válido por 24 horas (mesmo processo do registro)
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

// Exporta funções do controller
module.exports = {
  register,
  login
}
