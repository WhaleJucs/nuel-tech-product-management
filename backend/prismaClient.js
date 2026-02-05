const { PrismaClient } = require('@prisma/client')

// Criar uma instância do Prisma Client
const prisma = global.__prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') global.__prisma = prisma

// Exportar a instância do Prisma Client
module.exports = prisma