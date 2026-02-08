import axios from 'axios'

/**
 * Configuração da API
 * Cria instância do Axios com baseURL e interceptors para autenticação JWT
 * Todos os endpoints da API são acessados através desta instância
 */

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001',
})

// Interceptor para adicionar token JWT automaticamente em todas as requisições
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token')
        if (token) {
            // Adicionar token no header Authorization
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
    (response) => response,
    
    (error) => {
        if (error.response?.status === 401) {

            // Token inválido ou expirado - limpar localStorage
            localStorage.removeItem('token')
            localStorage.removeItem('user')
            
            // Redirecionar para login apenas se não estiver em rotas públicas
            const publicRoutes = ['/', '/products', '/auth']
            const currentPath = window.location.pathname
            
            if (!publicRoutes.some(route => currentPath.startsWith(route))) {
                window.location.href = '/auth'
            }
        }
        return Promise.reject(error)
    }
)

// Autenticação
export const login = (credentials) => api.post('/auth/login', credentials)
export const register = (userInfo) => api.post('/auth/register', userInfo)

// ========== Endpoints de Produtos ==========
// Token JWT é adicionado automaticamente pelo interceptor nas rotas protegidas
export const getProducts = () => api.get('/products')
export const getProduct = (id) => api.get(`/products/${id}`)
export const createProduct = (product) => api.post('/products', product)
export const updateProduct = (id, product) => api.put(`/products/${id}`, product)
export const deleteProduct = (id) => api.delete(`/products/${id}`)

export default api
