import { useState, useReducer } from 'react'
import { deleteProduct } from '../services/api'

const initialState = {
    loading: false,
    error: null
}

const deleteReducer = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return { loading: true, error: null }
        case 'DELETED_PRODUCT':
            return { loading: false, error: null }
        case 'ERROR':
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const useDeleteProduct = () => {
    const [response, dispatch] = useReducer(deleteReducer, initialState)
    const [cancelled, setCancelled] = useState(false)

    const checkCancelBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action)
        }
    }

    const deleteProductData = async (id) => {
        checkCancelBeforeDispatch({
            type: 'LOADING'
        })

        try {
            const res = await deleteProduct(id)
            
            checkCancelBeforeDispatch({
                type: 'DELETED_PRODUCT',
                payload: res.data
            })

            return res.data
        } 
        
        catch (error) {
            const errorMessage = error.response?.data?.error || error.response?.data?.errors?.[0]?.msg || 'Erro ao deletar produto'
            
            checkCancelBeforeDispatch({
                type: 'ERROR',
                payload: errorMessage
            })

            throw error
        }
    }

    return { deleteProductData, ...response }
}
