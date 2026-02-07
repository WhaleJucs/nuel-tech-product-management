import { useState, useEffect, useCallback } from 'react'
import { getProduct } from '../services/api'

export const useFetchProduct = (id) => {
    const [product, setProduct] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [cancelled, setCancelled] = useState(false)
    const [refetchTrigger, setRefetchTrigger] = useState(0)

    const refetch = useCallback(() => {
        setRefetchTrigger(prev => prev + 1)
    }, [])

    useEffect(() => {
        const loadProduct = async () => {
            if (cancelled || !id) return
            
            setLoading(true)
            setError(null)

            try {
                const response = await getProduct(id)
                
                if (!cancelled) {
                    setProduct(response.data)
                    setError(null)
                }
            } 
            
            catch (error) {
                if (!cancelled) {
                    console.log(error)
                    setError(error.response?.data?.error || 'Erro ao carregar produto')
                }
            } 
            
            finally {
                if (!cancelled) {
                    setLoading(false)
                }
            }
        }

        loadProduct()

        return () => setCancelled(true)
    }, [id, refetchTrigger, cancelled])

    return { product, loading, error, refetch }
}
