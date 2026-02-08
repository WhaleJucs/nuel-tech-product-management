import { createContext, useState, useEffect, useContext } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(undefined)
    const [token, setToken] = useState(null)

    const loadingUser = user === undefined

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

    const updateAuth = (userData, userToken) => {
        setUser(userData)
        setToken(userToken)
    }

    const clearAuth = () => {
        setUser(null)
        setToken(null)
    }

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

export const useAuthValue = () => useContext(AuthContext)
