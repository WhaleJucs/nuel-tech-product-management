const { PrismaClient } = require('@prisma/client')

// Cria uma instância do Prisma Client
// Em desenvolvimento, reutiliza a instância global para evitar múltiplas conexões
// Em produção, cria uma nova instância a cada vez
const prisma = global.__prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') global.__prisma = prisma

// Exporta a instância do Prisma Client
module.exports = prisma