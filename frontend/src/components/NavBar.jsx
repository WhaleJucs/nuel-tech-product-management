import { NavLink, useLocation } from 'react-router-dom'
import { useAuthValue } from '../context/AuthContext'
import { useAuthentication } from '../hooks/useAuthentication'
import logoNuel from '../assets/logo-white.png'

const NavBar = () => {
    const { user } = useAuthValue()
    const { logout } = useAuthentication()
    const location = useLocation()
    
    const isAuthPage = location.pathname === '/auth'
    
    const linkStyles = ({ isActive }) => 
        `relative pb-1 transition-all duration-300 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-white before:transition-all before:duration-300 hover:before:w-full ${
            isActive ? 'text-white before:w-full font-bold' : 'text-white hover:text-white'
        }`

    const handleLogout = () => {
        logout()
        window.location.href = '/'
    }

    return (
        <nav className="bg-[#1a2432] text-white shadow-xl sticky top-0 z-50">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                
                {/* Logo oficial alinhado à esquerda */}
                {!user && (
                <NavLink to="/" className="flex items-center transition hover:opacity-80">
                    <img 
                        src={logoNuel} 
                        alt="Nuel Tech Logo" 
                        className="h-12 w-auto object-contain" 
                    />
                </NavLink>
                )}

                {/* Nome do usuário no centro (se logado) */}
                {user && !isAuthPage && (
                    <div className="text-white font-medium">
                        <span className="text-gray-300 text-xl">Olá, </span>
                        <span className="font-semibold text-xl">{user.name}</span>
                    </div>
                )}

                {/* Links de navegação alinhados à direita */}
                <ul className="flex gap-8 items-center text-sm font-medium uppercase tracking-wider">
                    <li>
                        <NavLink 
                            to="/" 
                            className={linkStyles}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink 
                            to="/products" 
                            end
                            className={linkStyles}
                        >
                            Produtos
                        </NavLink>
                    </li>
                    
                    {/* Novo Produto - Só admin */}
                    {user && user.isAdmin && !isAuthPage && (
                        <li>
                            <NavLink 
                                to="/products/create"
                                className={linkStyles}
                            >
                                Novo Produto
                            </NavLink>
                        </li>
                    )}

                    {/* Botões de autenticação */}
                    {!isAuthPage && (
                        <>
                            {!user && (
                                <li>
                                    <NavLink 
                                        to="/auth"
                                        className={linkStyles}
                                    >
                                        Entrar
                                    </NavLink>
                                </li>
                            )}

                            {user && (
                                <li>
                                    <NavLink
                                        to="/"
                                        onClick={handleLogout}
                                        className="relative pb-1 transition-all duration-300 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-white before:transition-all before:duration-300 hover:before:w-full text-white hover:text-white uppercase"
                                    >
                                        Sair
                                    </NavLink>
                                    
                                </li>
                            )}
                        </>
                    )}
                </ul>
            </div>
        </nav>
    )
}

export default NavBar
