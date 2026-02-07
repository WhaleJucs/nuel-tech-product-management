import { useState, useEffect } from 'react'
import { getProducts } from '../services/api'

export const useFetchProducts = (refetch = false) => {
    const [products, setProducts] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [cancelled, setCancelled] = useState(false)

    useEffect(() => {
        const loadData = async () => {
            if (cancelled) return
            
            setLoading(true)
            setError(null)

            try {
                const response = await getProducts()
                
                if (!cancelled) {
                    setProducts(response.data)
                }
            } 
            
            catch (error) {
                if (!cancelled) {
                    console.log(error)
                    setError(error.response?.data?.error || 'Erro ao carregar produtos')
                }
            } 
            
            finally {
                if (!cancelled) {
                    setLoading(false)
                }
            }
        }

        loadData()

        return () => setCancelled(true)
    }, [refetch, cancelled])

    return { products, loading, error }
}
