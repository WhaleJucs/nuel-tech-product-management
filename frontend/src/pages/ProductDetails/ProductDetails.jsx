import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useFetchProduct } from '../../hooks/useFetchProduct'
import { useDeleteProduct } from '../../hooks/useDeleteProduct'
import { useAuthValue } from '../../context/AuthContext'
import { toast } from 'react-toastify'

const ProductDetails = () => {
  const { id } = useParams()
  const { product, loading, error } = useFetchProduct(id)
  const { deleteProductData, loading: deleteLoading } = useDeleteProduct()
  const { user } = useAuthValue()
  const [isDeleting, setIsDeleting] = useState(false)
  const navigate = useNavigate()

  const handleDelete = async () => {
    if (window.confirm(`Tem certeza que deseja deletar o produto "${product.name}"? Esta ação não pode ser desfeita.`)) {
      setIsDeleting(true)
      try {
        await deleteProductData(id)
        toast.success('Produto deletado com sucesso!')
        navigate('/products')
      } 
      
      catch (error) {
        toast.error('Erro ao deletar produto')
        setIsDeleting(false)
      }
    }
  }

  // Estado de loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#1a2432] mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Carregando produto...</p>
        </div>
      </div>
    )
  }

  // Estado de erro
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="bg-[#1a2432] text-white py-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold mb-4">Erro ao Carregar Produto</h1>
          </div>
        </div>
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 text-red-700 px-6 py-8 rounded-lg text-center">
            <p className="text-xl font-semibold mb-4">{error}</p>
            <Link
              to="/products"
              className="inline-block bg-[#1a2432] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#2a3442] transition duration-300"
            >
              Voltar para Produtos
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // Estado de produto não encontrado
  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="bg-[#1a2432] text-white py-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold mb-4">Produto Não Encontrado</h1>
          </div>
        </div>
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto bg-yellow-50 border border-yellow-200 text-yellow-700 px-6 py-8 rounded-lg text-center">
            <p className="text-xl font-semibold mb-4">O produto solicitado não existe.</p>
            <Link
              to="/products"
              className="inline-block bg-[#1a2432] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#2a3442] transition duration-300"
            >
              Voltar para Produtos
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="bg-[#1a2432] text-white py-16">
        <div className="container mx-auto px-6">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition duration-300 mb-6"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Voltar para Produtos
          </Link>
          <h1 className="text-5xl font-bold mb-4">{product.name}</h1>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Informações principais */}
          <div className="bg-white rounded-lg shadow-xl overflow-hidden mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
              {/* Informações do Produto */}
              <div>
                <div className="mb-6 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg">
                  <p className="text-sm">
                    <span className="font-semibold">ID do Produto:</span> {product.id}
                  </p>
                </div>

                <div className="space-y-6">
                  {/* Categoria */}
                  <div>
                    <p className="text-sm text-gray-600 font-semibold mb-2">Categoria</p>
                    <div className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                      {product.category}
                    </div>
                  </div>

                  {/* Preço */}
                  <div>
                    <p className="text-sm text-gray-600 font-semibold mb-2">Preço</p>
                    <p className="text-4xl font-bold text-[#1a2432]">
                      R$ {product.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Estoque */}
                  <div>
                    <p className="text-sm text-gray-600 font-semibold mb-2">Disponibilidade em Estoque</p>
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`}></div>
                      <p className={`text-lg font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.stock} {product.stock === 1 ? 'unidade' : 'unidades'}
                        {product.stock > 0 ? ' disponíveis' : ' - Fora de estoque'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Descrição e Ações */}
              <div>
                {/* Descrição */}
                <div className="mb-8">
                  <p className="text-sm text-gray-600 font-semibold mb-3">Descrição</p>
                  <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    {product.description ? (
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {product.description}
                      </p>
                    ) : (
                      <p className="text-gray-500 italic">
                        Este produto não possui descrição detalhada.
                      </p>
                    )}
                  </div>
                </div>

                {/* Resumo de Especificações */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-800 mb-4">Resumo do Produto</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Código:</span>
                      <span className="font-semibold text-gray-800">#{product.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Categoria:</span>
                      <span className="font-semibold text-gray-800">{product.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Preço:</span>
                      <span className="font-semibold text-gray-800">R$ {product.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Estoque:</span>
                      <span className={`font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {product.stock} {product.stock === 1 ? 'un.' : 'un.'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {user && user.isAdmin && (
                <Link
                  to={`/products/edit/${product.id}`}
                  className="text-center bg-[#4a7ba7] text-white py-3 rounded-lg font-semibold hover:bg-[#3d6a8f] transition duration-300 shadow-lg"
                >
                  Editar Produto
                </Link>
              )}

              {user && user.isAdmin && (
                <button
                  onClick={handleDelete}
                  disabled={isDeleting || deleteLoading}
                  className="bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting || deleteLoading ? 'Deletando...' : 'Deletar Produto'}
                </button>
              )}

              <Link
                to="/products"
                className="text-center bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition duration-300 shadow-lg"
              >
                Voltar para Catálogo
              </Link>
            </div>
          </div>

          {/* Waring se fora de estoque */}
          {product.stock === 0 && (
            <div className="mt-8 bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-yellow-700 font-semibold">Produto Fora de Estoque</p>
                  <p className="text-sm text-yellow-600 mt-1">Este produto não está disponível para compra no momento.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductDetails