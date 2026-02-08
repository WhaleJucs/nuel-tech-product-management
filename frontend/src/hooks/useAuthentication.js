import { useState } from 'react'
import { login as loginService, register as registerService } from '../services/api'

/**
 * Hook Personalizado para Autenticação
 * Gerencia operações de login e registro de usuários
 * Retorna funções, estados de loading e erros
 * Salva token e dados do usuário no localStorage após sucesso
 */
export const useAuthentication = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    // Função para registrar novo usuário
    const createUser = async (data) => {
        setLoading(true)
        setError(null)

        try {
            const response = await registerService(data)
            
            const { token, user } = response.data

            // Salvar no localStorage
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))

            setLoading(false)
            return { token, user }
        } 
        
        catch (error) {
            console.log(error)
            
            let systemErrorMessage
            
            if (error.response?.data?.message) {
                systemErrorMessage = error.response.data.message
            } 
            
            else if (error.response?.data?.errors) {
                
                // Erros de validação do express-validator
                systemErrorMessage = error.response.data.errors
                    .map(err => err.msg)
                    .join(', ')
            } 
            
            else if (error.message.includes('Network')) {
                systemErrorMessage = 'Erro de conexão. Verifique sua internet.'
            } 
            
            else {
                systemErrorMessage = 'Ocorreu um erro, por favor tente mais tarde.'
            }

            setLoading(false)
            setError(systemErrorMessage)
        }
    }

    // Função para fazer login de usuário existente
    const login = async (data) => {
        setLoading(true)
        setError(null)

        try {
            const response = await loginService(data)
            
            const { token, user } = response.data

            // Salvar no localStorage
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))

            setLoading(false)
            return { token, user }
        } 
        
        catch (error) {
            console.log(error)
            
            let systemErrorMessage

            if (error.response?.data?.message) {
                systemErrorMessage = error.response.data.message
            } 
            
            else if (error.response?.data?.errors) {

                // Erros de validação do express-validator
                systemErrorMessage = error.response.data.errors
                    .map(err => err.msg)
                    .join(', ')
            } 
            
            else if (error.message.includes('Network')) {
                systemErrorMessage = 'Erro de conexão. Verifique sua internet.'
            } 
            
            else {
                systemErrorMessage = 'Ocorreu um erro, tente novamente mais tarde.'
            }

            setError(systemErrorMessage)
            setLoading(false)
        }
    }

    // Logout
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }

    return { createUser, error, loading, login, logout }
}
