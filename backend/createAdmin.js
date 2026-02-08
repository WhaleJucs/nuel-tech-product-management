require('dotenv').config()
const bcrypt = require('bcryptjs')
const prisma = require('./prismaClient')

/**
 * Script para criar usuário administrador
 * Execute com: node createAdmin.js
 * Credenciais padrão: admin@nueltech.com / admin123
 */

async function createAdmin() {
  try {
    const email = 'admin@nueltech.com'
    const password = 'admin123'
    
    // Verifica se já existe
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      console.log('Usuário admin já existe!')
      console.log('Email:', email)
      return
    }

    // Cria admin
    const hashedPassword = bcrypt.hashSync(password, 8)
    
    const admin = await prisma.user.create({
      data: {
        name: 'Administrador',
        email: email,
        password: hashedPassword,
        isAdmin: true
      }
    })

    console.log('Usuário admin criado com sucesso!')
    console.log('Email:', email)
    console.log('Senha:', password)
    console.log('ID:', admin.id)
  } 
  
  catch (error) {
    console.error('Erro ao criar admin:', error)
  } 
  
  finally {
    await prisma.$disconnect()
  }
}

createAdmin()
