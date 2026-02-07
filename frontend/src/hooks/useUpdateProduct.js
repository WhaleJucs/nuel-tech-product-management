import { useState, useReducer } from 'react'
import { updateProduct } from '../services/api'

const initialState = {
    loading: false,
    error: null
}

const updateReducer = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return { loading: true, error: null }
        case 'UPDATED_PRODUCT':
            return { loading: false, error: null }
        case 'ERROR':
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const useUpdateProduct = () => {
    const [response, dispatch] = useReducer(updateReducer, initialState)
    const [cancelled, setCancelled] = useState(false)

    const checkCancelBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action)
        }
    }

    const updateProductData = async (id, product) => {
        checkCancelBeforeDispatch({
            type: 'LOADING'
        })

        try {
            const res = await updateProduct(id, product)
            
            checkCancelBeforeDispatch({
                type: 'UPDATED_PRODUCT',
                payload: res.data
            })

            return res.data
        } 
        
        catch (error) {
            const errorMessage = error.response?.data?.error || error.response?.data?.errors?.[0]?.msg || 'Erro ao atualizar produto'
            
            checkCancelBeforeDispatch({
                type: 'ERROR',
                payload: errorMessage
            })

            throw error
        }
    }

    return { updateProductData, ...response }
}
