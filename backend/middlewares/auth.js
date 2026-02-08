const jwt = require('jsonwebtoken')

/**
 * Middlewares de Autenticação
 * Validam tokens JWT nas requisições protegidas
 * authMiddleware: Valida qualquer usuário autenticado
 * adminMiddleware: Valida usuários admin (isAdmin: true)
 */

const JWT_SECRET = process.env.JWT_SECRET || 'secret'

// Middleware para verificar se o usuário está autenticado
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' })
  }

  const parts = authHeader.split(' ')

  if (parts.length !== 2) {
    return res.status(401).json({ error: 'Erro no token' })
  }

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: 'Token mal formatado' })
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido ou expirado' })
    }

    // Adiciona informações do usuário à requisição para uso posterior
    req.userId = decoded.id
    req.isAdmin = decoded.isAdmin
    return next()
  })
}

// Middleware para verificar se o usuário é admin
const adminMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ error: 'Token não fornecido' })
  }

  const parts = authHeader.split(' ')

  // Token deve estar no formato: "Bearer <token>"
  if (parts.length !== 2) {
    return res.status(401).json({ error: 'Erro no token' })
  }

  const [scheme, token] = parts

  // Valida formato do token
  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ error: 'Token mal formatado' })
  }

  // Verifica e decodifica token e valida se é admin
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Token inválido ou expirado' })
    }

    // Verifica se é admin
    if (!decoded.isAdmin) {
      return res.status(403).json({ error: 'Usuário não autorizado' })
    }

    // Adiciona informações do usuário à requisição
    req.userId = decoded.id
    req.isAdmin = decoded.isAdmin
    return next()
  })
}

// Exporta middlewares para uso nas rotas
module.exports = {
  authMiddleware,
  adminMiddleware
}
