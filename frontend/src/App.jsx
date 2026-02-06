import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

// Pages
import Home from './pages/Home/Home'
import Products from './pages/Products/Products'
import ProductDetails from './pages/ProductDetails/ProductDetails'
import CreateProduct from './pages/CreateProducts/CreateProducts'
import EditProduct from './pages/EditProduct/EditProduct'

// Components
import NavBar from './components/NavBar'
import Footer from './components/Footer'

// Styles
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path='/products/:id' element={<ProductDetails />} />
          <Route path="/products/create" element={<CreateProduct />} />
          <Route path="/products/edit/:id" element={<EditProduct />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  )
}

export default App
