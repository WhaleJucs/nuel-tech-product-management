import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useAuthValue } from '../../context/AuthContext'
import { useAuthentication } from '../../hooks/useAuthentication'

const Auth = () => {
    // Estado para controlar qual tab está ativa (login ou register)
    const [activeTab, setActiveTab] = useState('login')
    
    // Estados de login
    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    
    // Estados de registro
    const [registerName, setRegisterName] = useState('')
    const [registerEmail, setRegisterEmail] = useState('')
    const [registerPassword, setRegisterPassword] = useState('')
    const [registerConfirmPassword, setRegisterConfirmPassword] = useState('')
    
    // Estado de erro geral
    const [error, setError] = useState('')

    // Contexto de autenticação
    const { updateAuth } = useAuthValue()
    const { login, createUser, error: authError, loading } = useAuthentication()

    // Navegação
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')

        const credentials = {
            email: loginEmail,
            password: loginPassword
        }

        const res = await login(credentials)

        if (res && res.token && res.user) {
            updateAuth(res.user, res.token)
            toast.success('Login realizado com sucesso!')
            navigate('/')
        }
    }

    const handleRegister = async (e) => {
        e.preventDefault()
        setError('')

        if (registerPassword !== registerConfirmPassword) {
            setError('As senhas precisam ser iguais!')
            return
        }

        if (registerPassword.length < 6) {
            setError('A senha precisa ter no mínimo 6 caracteres!')
            return
        }

        const userData = {
            name: registerName,
            email: registerEmail,
            password: registerPassword,
            confirmPassword: registerConfirmPassword
        }

        const res = await createUser(userData)

        if (res && res.token && res.user) {
            updateAuth(res.user, res.token)
            toast.success('Cadastro realizado com sucesso!')
            navigate('/')
        }
    }

    useEffect(() => {
        if (authError) {
            setError(authError)
        }
    }, [authError])

    return (
        <div className="min-h-[calc(100vh-200px)] bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8">
                
                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-8">
                    <button
                        onClick={() => {
                            setActiveTab('login')
                            setError('')
                        }}
                        className={`flex-1 py-3 px-4 text-center font-semibold transition-all duration-200 ${
                            activeTab === 'login'
                                ? 'text-[#1a2432] border-b-2 border-[#1a2432]'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Entrar
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab('register')
                            setError('')
                        }}
                        className={`flex-1 py-3 px-4 text-center font-semibold transition-all duration-200 ${
                            activeTab === 'register'
                                ? 'text-[#1a2432] border-b-2 border-[#1a2432]'
                                : 'text-gray-500 hover:text-gray-700'
                        }`}
                    >
                        Cadastrar
                    </button>
                </div>

                {/* Login Form */}
                {activeTab === 'login' && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Bem-vindo de volta!</h2>
                        <p className="text-gray-600 mb-6">Digite seu e-mail e senha para acessar</p>
                        
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div>
                                <label htmlFor="login-email" className="block text-sm font-medium text-gray-700 mb-1">
                                    E-mail
                                </label>
                                <input
                                    id="login-email"
                                    type="email"
                                    required
                                    placeholder="seu@email.com"
                                    value={loginEmail}
                                    onChange={(e) => setLoginEmail(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a2432] focus:border-transparent transition-all"
                                />
                            </div>

                            <div>
                                <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Senha
                                </label>
                                <input
                                    id="login-password"
                                    type="password"
                                    required
                                    placeholder="Sua senha"
                                    value={loginPassword}
                                    onChange={(e) => setLoginPassword(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a2432] focus:border-transparent transition-all"
                                />
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            {!loading && (
                                <button
                                    type="submit"
                                    className="w-full bg-[#1a2432] text-white py-3 rounded-lg font-semibold hover:bg-[#2a3442] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
                                >
                                    Entrar
                                </button>
                            )}
                            
                            {loading && (
                                <button
                                    type="button"
                                    disabled
                                    className="w-full bg-gray-400 text-white py-3 rounded-lg font-semibold cursor-not-allowed"
                                >
                                    Aguarde...
                                </button>
                            )}
                        </form>
                    </div>
                )}

                {/* Register Form */}
                {activeTab === 'register' && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Criar conta</h2>
                        <p className="text-gray-600 mb-6">Preencha os dados para se cadastrar</p>
                        
                        <form onSubmit={handleRegister} className="space-y-4">
                            <div>
                                <label htmlFor="register-name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Nome Completo
                                </label>
                                <input
                                    id="register-name"
                                    type="text"
                                    required
                                    placeholder="Seu nome completo"
                                    value={registerName}
                                    onChange={(e) => setRegisterName(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a2432] focus:border-transparent transition-all"
                                />
                            </div>

                            <div>
                                <label htmlFor="register-email" className="block text-sm font-medium text-gray-700 mb-1">
                                    E-mail
                                </label>
                                <input
                                    id="register-email"
                                    type="email"
                                    required
                                    placeholder="seu@email.com"
                                    value={registerEmail}
                                    onChange={(e) => setRegisterEmail(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a2432] focus:border-transparent transition-all"
                                />
                            </div>

                            <div>
                                <label htmlFor="register-password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Senha
                                </label>
                                <input
                                    id="register-password"
                                    type="password"
                                    required
                                    placeholder="Mínimo 6 caracteres"
                                    value={registerPassword}
                                    onChange={(e) => setRegisterPassword(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a2432] focus:border-transparent transition-all"
                                />
                            </div>

                            <div>
                                <label htmlFor="register-confirm-password" className="block text-sm font-medium text-gray-700 mb-1">
                                    Confirmar Senha
                                </label>
                                <input
                                    id="register-confirm-password"
                                    type="password"
                                    required
                                    placeholder="Digite a senha novamente"
                                    value={registerConfirmPassword}
                                    onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1a2432] focus:border-transparent transition-all"
                                />
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                    {error}
                                </div>
                            )}

                            {!loading && (
                                <button
                                    type="submit"
                                    className="w-full bg-[#1a2432] text-white py-3 rounded-lg font-semibold hover:bg-[#2a3442] transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0"
                                >
                                    Cadastrar
                                </button>
                            )}
                            
                            {loading && (
                                <button
                                    type="button"
                                    disabled
                                    className="w-full bg-gray-400 text-white py-3 rounded-lg font-semibold cursor-not-allowed"
                                >
                                    Aguarde...
                                </button>
                            )}
                        </form>
                    </div>
                )}

                {/* Info sobre admin */}
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-800">
                        <strong>Nota:</strong> Novos usuários são criados como usuários comuns. 
                        Para criar/editar/deletar produtos, é necessário permissão de administrador.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Auth
