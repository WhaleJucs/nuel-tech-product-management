import axios from 'axios'

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000',
})

// Produtos
export const getProducts = () => api.get('/products')
export const getProduct = (id) => api.get(`/products/${id}`)
export const createProduct = (product) => api.post('/products', product)
export const updateProduct = (id, product) => api.put(`/products/${id}`, product)
export const deleteProduct = (id) => api.delete(`/products/${id}`)

export default api
