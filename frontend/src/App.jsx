import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Context
import { AuthProvider, useAuthValue } from './context/AuthContext'

// Pages
import Home from './pages/Home/Home'
import Products from './pages/Products/Products'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import CreateProduct from './pages/CreateProducts/CreateProducts'
import EditProduct from './pages/EditProduct/EditProduct'
import Auth from './pages/Auth/Auth'

// Components
import NavBar from './components/NavBar'
import Footer from './components/Footer'

// Styles
import './App.css'

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <NavBar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path='/products/:id' element={<ProductDetails />} />
              <Route path="/auth" element={<AuthRoute />} />
              <Route path="/products/create" element={<ProtectedRoute><CreateProduct /></ProtectedRoute>} />
              <Route path="/products/edit/:id" element={<ProtectedRoute><EditProduct /></ProtectedRoute>} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          <Footer />
          <ToastContainer 
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

// Componente para proteger rotas que precisam de autenticação de admin
const ProtectedRoute = ({ children }) => {
  const { user } = useAuthValue()
  
  if (!user) {
    // Não está logado - redireciona para login
    return <Navigate to="/auth" />
  }

  if (!user.isAdmin) {
    // Está logado mas não é admin - redireciona para home
    return <Navigate to="/" />
  }

  // É admin - permite acessar
  return children
}

// Componente para redirecionar usuários já logados da página de auth
const AuthRoute = () => {
  const { user } = useAuthValue()
  
  // Se já está logado, redireciona para home
  if (user) {
    return <Navigate to="/" />
  }
  
  // Se não está logado, mostra página de auth
  return <Auth />
}

export default App
