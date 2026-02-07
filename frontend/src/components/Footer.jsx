import logoNuel from '../assets/logo-white.png'

const Footer = () => {
    
    return (
        <footer className="bg-[#475b70] text-white mt-auto">
            <div className="container mx-auto px-4 py-12">
                {/* Grid de 3 colunas */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    
                    {/* Coluna 1: Contato */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Contato</h3>
                        <div className="space-y-3 text-gray-300">
                            <p className="flex items-center gap-2">
                                <span>(12) 98186-3046</span>
                            </p>
                            <p className="flex items-start gap-2">
                                <span>Av. Amazonas, n. 43 – Jardim Paraíba, Jacareí/SP</span>
                            </p>
                        </div>
                    </div>

                    {/* Coluna 2: Support */}
                    <div>
                        <h3 className="text-xl font-bold mb-4">Support</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li>
                                <a href="#faq" className="hover:text-blue-400 transition">FAQ</a>
                            </li>
                            <li>
                                <a href="#help" className="hover:text-blue-400 transition">Help Center</a>
                            </li>
                            <li>
                                <a href="#security" className="hover:text-blue-400 transition">Public Security</a>
                            </li>
                        </ul>
                    </div>

                    {/* Coluna 3: Links Rápidos */}
                    <div>
                        <img 
                            src={logoNuel} 
                            alt="Nuel Tech Logo" 
                            className="h-16 mb-4 object-contain"
                        />
                        <p className="flex items-center gap-2">
                            Soluções inteligentes e personalizadas para levar a sua empresa ao próximo nível de eficiência.
                        </p>
                    </div>
                </div>

                {/* Redes Sociais */}
                <div className="border-t border-gray-700 pt-6">
                    <div className="flex justify-center gap-6 mb-6">
                            {/* WhatsApp */}
                            <a href="https://wa.me/+5512981863046" target="_blank" rel="noreferrer" className="hover:opacity-80 transition">
                                <img src="https://cdn-icons-png.flaticon.com/512/733/733585.png" alt="WhatsApp" className="w-6 h-6" />
                            </a>
                            {/* Instagram */}
                            <a href="https://www.instagram.com/nuel.tech.solucoes/" target="_blank" rel="noreferrer" className="hover:opacity-80 transition">
                                <img src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" alt="Instagram" className="w-6 h-6" />
                            </a>
                            {/* LinkedIn */}
                            <a href="https://www.linkedin.com/company/nueltechsolucoes/" target="_blank" rel="noreferrer" className="hover:opacity-80 transition">
                                <img src="https://cdn-icons-png.flaticon.com/512/145/145807.png" alt="LinkedIn" className="w-6 h-6" />
                            </a>
                            {/* Facebook */}
                            <a href="#" target="_blank" rel="noreferrer" className="hover:opacity-80 transition">
                                <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" className="w-6 h-6" />
                            </a>
                            {/* YouTube */}
                            <a href="#" target="_blank" rel="noreferrer" className="hover:opacity-80 transition">
                                <img src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" alt="YouTube" className="w-6 h-6" />
                            </a>
                    </div>

                    {/* Copyright */}
                    <div className="text-center text-sm text-gray-400">
                        <p>© {new Date().getFullYear()} Nuel Tech. Todos os direitos reservados.</p>
                        <p className="mt-2">
                            Av. Amazonas, N° 43 - Jardim Paraiba, Jacareí/SP - CEP 12327-650 | 
                            Tel: (12) 3456-7890 | Email: carlos@nueltech.com.br
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer