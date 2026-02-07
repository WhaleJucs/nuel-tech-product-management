import { Link } from 'react-router-dom'
import { useFetchProducts } from '../../hooks/useFetchProducts'

const Home = () => {
  const { products, loading } = useFetchProducts()

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="bg-[#1a2432] text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Sistema de Gerenciamento de Produtos
          </h1>
          <p className="text-xl mb-8 text-gray-300">
            Gerencie seu catálogo de produtos de forma simples e eficiente
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              to="/products" 
              className="bg-white text-[#1a2432] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300 shadow-lg"
            >
              Ver Produtos
            </Link>
            <Link 
              to="/products/create" 
              className="bg-[#4a7ba7] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#3d6a8f] transition duration-300 shadow-lg"
            >
              Criar Novo Produto
            </Link>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-[#1a2432]">
          Funcionalidades do Sistema
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition duration-300">

            <h3 className="text-xl font-semibold mb-3 text-[#1a2432]">Cadastro de Produtos</h3>
            <p className="text-gray-600">
              Adicione produtos com nome, descrição, preço, categoria e estoque
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold mb-3 text-[#1a2432]">Edição Completa</h3>
            <p className="text-gray-600">
              Atualize informações dos produtos de forma rápida e prática
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-xl transition duration-300">
            <h3 className="text-xl font-semibold mb-3 text-[#1a2432]">Gestão Eficiente</h3>
            <p className="text-gray-600">
              Visualize, edite e remova produtos do seu catálogo
            </p>
          </div>
        </div>
      </div>

      {!loading && products && products.length > 0 && (
        <div className="container mx-auto px-6 py-16 bg-white">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#1a2432]">
            Produtos Recentes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 4).map(product => (
              <div 
                key={product.id} 
                className="bg-gray-50 rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-[#1a2432] truncate">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    {product.category}
                  </p>
                  <p className="text-2xl font-bold text-[#1a2432] mb-2">
                    R$ {product.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    Estoque: {product.stock} unidades
                  </p>
                  <Link 
                    to={`/products/${product.id}`}
                    className="block text-center bg-[#1a2432] text-white py-2 rounded-lg hover:bg-[#2a3442] transition duration-300"
                  >
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          {products.length > 4 && (
            <div className="text-center mt-8">
              <Link 
                to="/products"
                className="inline-block bg-[#4a7ba7] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#3d6a8f] transition duration-300"
              >
                Ver Todos os Produtos
              </Link>
            </div>
          )}
        </div>
      )}

      {loading && (
        <div className="container mx-auto px-6 py-16 text-center">
          <p className="text-xl text-gray-600">Carregando produtos...</p>
        </div>
      )}

      {!loading && (!products || products.length === 0) && (
        <div className="container mx-auto px-6 py-16 text-center bg-white">
          <h2 className="text-2xl font-bold mb-4 text-[#1a2432]">
            Nenhum Produto Cadastrado
          </h2>
          <p className="text-gray-600 mb-6">
            Comece adicionando seu primeiro produto ao sistema
          </p>
          <Link 
            to="/products/create"
            className="inline-block bg-[#4a7ba7] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#3d6a8f] transition duration-300"
          >
            Criar Primeiro Produto
          </Link>
        </div>
      )}
    </div>
  )
}

export default Home