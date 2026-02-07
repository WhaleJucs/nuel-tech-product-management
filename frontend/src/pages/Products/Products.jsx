import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useFetchProducts } from '../../hooks/useFetchProducts'
import { useDeleteProduct } from '../../hooks/useDeleteProduct'
import { toast } from 'react-toastify'

const Products = () => {
  const { products, loading, error } = useFetchProducts()
  const { deleteProductData, loading: deleteLoading } = useDeleteProduct()
  const [deletingId, setDeletingId] = useState(null)

  const handleDelete = async (id, name) => {
    if (window.confirm(`Tem certeza que deseja deletar o produto "${name}"?`)) {
      setDeletingId(id)
      try {
        await deleteProductData(id)
        toast.success('Produto deletado com sucesso!')
        // Recarregar a página para atualizar a lista
        window.location.reload()
      } 
      
      catch (error) {
        toast.error('Erro ao deletar produto')
      } 
      
      finally {
        setDeletingId(null)
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="bg-[#1a2432] text-white py-16">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Catálogo de Produtos</h1>
          <p className="text-gray-300 mb-6">
            Gerencie todos os produtos do seu sistema
          </p>
          <Link 
            to="/products/create"
            className="inline-block bg-[#4a7ba7] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#3d6a8f] transition duration-300 shadow-lg"
          >
            + Adicionar Novo Produto
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        {loading && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">Carregando produtos...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6">
            <p className="font-semibold">Erro ao carregar produtos:</p>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && products && products.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-[#1a2432]">
              Nenhum Produto Cadastrado
            </h2>
            <p className="text-gray-600 mb-6">
              Comece adicionando seu primeiro produto ao catálogo
            </p>
            <Link 
              to="/products/create"
              className="inline-block bg-[#4a7ba7] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#3d6a8f] transition duration-300"
            >
              Criar Primeiro Produto
            </Link>
          </div>
        )}

        {!loading && !error && products && products.length > 0 && (
          <>
            <div className="mb-6 text-gray-600">
              <p className="text-lg">
                Total de produtos: <span className="font-semibold text-[#1a2432]">{products.length}</span>
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map(product => (
                <div 
                  key={product.id} 
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-[#1a2432] flex-1 truncate pr-2">
                        {product.name}
                      </h3>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                        ID: {product.id}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 mb-3 flex items-center gap-2">
                      <span className="font-medium">Categoria:</span>
                      <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs">
                        {product.category}
                      </span>
                    </p>

                    {product.description && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {product.description}
                      </p>
                    )}

                    <div className="border-t border-gray-100 pt-3 mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm text-gray-600">Preço:</span>
                        <span className="text-2xl font-bold text-[#1a2432]">
                          R$ {product.price.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Estoque:</span>
                        <span className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {product.stock > 0 ? '' : 'Sem estoque'}
                          {product.stock} unidades
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Link 
                        to={`/products/${product.id}`}
                        className="flex-1 text-center bg-[#1a2432] text-white py-2 rounded-lg hover:bg-[#2a3442] transition duration-300 text-sm font-medium"
                      >
                        Ver Detalhes
                      </Link>
                      <Link 
                        to={`/products/edit/${product.id}`}
                        className="flex-1 text-center bg-[#4a7ba7] text-white py-2 rounded-lg hover:bg-[#3d6a8f] transition duration-300 text-sm font-medium"
                      >
                        Editar
                      </Link>
                    </div>

                    <button 
                      onClick={() => handleDelete(product.id, product.name)}
                      disabled={deleteLoading && deletingId === product.id}
                      className="w-full mt-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition duration-300 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {deleteLoading && deletingId === product.id ? 'Deletando...' : 'Deletar Produto'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Products