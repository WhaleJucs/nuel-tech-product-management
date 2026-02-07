import { NavLink } from 'react-router-dom'
import logoNuel from '../assets/logo-white.png'

const NavBar = () => {
    const linkStyles = ({ isActive }) => 
        `relative pb-1 transition-all duration-300 before:content-[''] before:absolute before:bottom-0 before:left-0 before:w-0 before:h-0.5 before:bg-white before:transition-all before:duration-300 hover:before:w-full ${
            isActive ? 'text-white before:w-full font-bold' : 'text-white hover:text-white'
        }`

    return (
        <nav className="bg-[#1a2432] text-white shadow-xl sticky top-0 z-50">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                
                {/* Logo oficial alinhado à esquerda */}
                <NavLink to="/" className="flex items-center transition hover:opacity-80">
                    <img 
                        src={logoNuel} 
                        alt="Nuel Tech Logo" 
                        className="h-12 w-auto object-contain" 
                    />
                </NavLink>

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
                    <li>
                        <NavLink 
                            to="/products/create"
                            className={linkStyles}
                        >
                            Novo Produto
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default NavBar
