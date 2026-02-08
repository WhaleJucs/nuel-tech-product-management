import { createContext, useState, useEffect, useContext } from 'react'

/**
 * Context de Autenticação
 * Gerencia o estado global de autenticação do usuário
 * Persiste dados no localStorage (token e informações do usuário)
 * Fornece funções para atualizar e limpar o estado de autenticação
 */

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(undefined)
    const [token, setToken] = useState(null)

    // Estado de carregamento inicial
    const loadingUser = user === undefined

    // Carrega dados do localStorage ao iniciar a aplicação
    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        const storedToken = localStorage.getItem('token')

        if (storedUser && storedToken) {
            setUser(JSON.parse(storedUser))
            setToken(storedToken)
        } 
        
        else {
            setUser(null)
        }
    }, [])

    // Atualiza estado de autenticação após login/registro
    const updateAuth = (userData, userToken) => {
        setUser(userData)
        setToken(userToken)
    }

    // Limpa estado de autenticação após logout
    const clearAuth = () => {
        setUser(null)
        setToken(null)
    }

    // Exibi tela de loading enquanto carrega dados do localStorage
    if (loadingUser) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#1a2432] mx-auto mb-4"></div>
                    <p className="text-gray-600 text-lg">Carregando...</p>
                </div>
            </div>
        )
    }

    return (
        <AuthContext.Provider value={{ user, token, updateAuth, clearAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

// Hook personalizado para acessar o contexto de autenticação
export const useAuthValue = () => useContext(AuthContext)
