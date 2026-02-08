import { useState, useEffect } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useUpdateProduct } from '../../hooks/useUpdateProduct'
import { useFetchProduct } from '../../hooks/useFetchProduct'
import { toast } from 'react-toastify'

const EditProduct = () => {
  const { id } = useParams()
  const { product, loading: loadingProduct, error: errorProduct } = useFetchProduct(id)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [stock, setStock] = useState('')
  const [formError, setFormError] = useState('')

  const { updateProductData, loading, error } = useUpdateProduct()
  const navigate = useNavigate()

  // Preencher campos quando o produto carregar
  useEffect(() => {
    if (product) {
      setName(product.name || '')
      setDescription(product.description || '')
      setPrice(product.price?.toString() || '')
      setCategory(product.category || '')
      setStock(product.stock?.toString() || '')
    }
  }, [product])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')

    // Validações
    if (!name || !price || !category || !stock) {
      setFormError('Por favor, preencha todos os campos obrigatórios!')
      return
    }

    const priceNumber = parseFloat(price)
    const stockNumber = parseInt(stock)

    if (isNaN(priceNumber) || priceNumber <= 0) {
      setFormError('Preço deve ser um número válido e maior que zero.')
      return
    }

    if (isNaN(stockNumber) || stockNumber < 0) {
      setFormError('Estoque deve ser um número inteiro maior ou igual a zero.')
      return
    }

    const productData = {
      name,
      description: description || undefined,
      price: priceNumber,
      category,
      stock: stockNumber
    }

    try {
      const result = await updateProductData(id, productData)

      if (result) {
        toast.success('Produto atualizado com sucesso!')
        navigate('/products')
      }
    } catch (err) {
      // Erro já é tratado pelo hook
      console.error(err)
    }
  }

  // Loading state
  if (loadingProduct) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-[#1a2432] mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Carregando produto...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (errorProduct) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="bg-[#1a2432] text-white py-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold mb-4">Erro ao Carregar Produto</h1>
          </div>
        </div>
        <div className="container mx-auto px-6 py-12">
          <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 text-red-700 px-6 py-8 rounded-lg text-center">
            <p className="text-xl font-semibold mb-4">{errorProduct}</p>
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

  // Not found state
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
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Editar Produto</h1>
          <p className="text-xl mb-8 text-gray-300">
            Atualize as informações do produto: <span className="font-semibold">{product.name}</span>
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8">
          <div className="mb-6 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg">
            <p className="text-sm">
              <span className="font-semibold">ID do Produto:</span> {product.id}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nome do Produto <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Ex: Notebook Dell Inspiron"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a7ba7] focus:border-transparent transition duration-200"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Descrição
              </label>
              <textarea
                name="description"
                placeholder="Descrição detalhada do produto (opcional)"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a7ba7] focus:border-transparent transition duration-200 resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Preço (R$) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                  onChange={(e) => setPrice(e.target.value)}
                  value={price}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a7ba7] focus:border-transparent transition duration-200"
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Estoque <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="stock"
                  placeholder="0"
                  min="0"
                  onChange={(e) => setStock(e.target.value)}
                  value={stock}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a7ba7] focus:border-transparent transition duration-200"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Categoria <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="category"
                placeholder="Ex: Eletrônicos, Móveis, Vestuário..."
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a7ba7] focus:border-transparent transition duration-200"
              />
            </div>

            {formError && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <p className="font-semibold">{formError}</p>
              </div>
            )}

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                <p className="font-semibold">{error}</p>
              </div>
            )}

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#4a7ba7] text-white py-3 rounded-lg font-semibold hover:bg-[#3d6a8f] transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? 'Salvando alterações...' : 'Salvar Alterações'}
              </button>

              <Link
                to="/products"
                className="flex-1 text-center bg-gray-500 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition duration-300 shadow-lg"
              >
                Cancelar
              </Link>
            </div>
          </form>
        </div>

        <div className="max-w-2xl mx-auto mt-6 text-center text-sm text-gray-600">
          <p>* Campos obrigatórios</p>
        </div>
      </div>
    </div>
  )
}

export default EditProduct