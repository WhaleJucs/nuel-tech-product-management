import { useState, useReducer } from 'react'
import { createProduct } from '../services/api'

const initialState = {
    loading: false,
    error: null
}

const insertReducer = (state, action) => {
    switch (action.type) {
        case 'LOADING':
            return { loading: true, error: null }
        case 'INSERTED_PRODUCT':
            return { loading: false, error: null }
        case 'ERROR':
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const useInsertProduct = () => {
    const [response, dispatch] = useReducer(insertReducer, initialState)
    const [cancelled, setCancelled] = useState(false)

    const checkCancelBeforeDispatch = (action) => {
        if (!cancelled) {
            dispatch(action)
        }
    }

    const insertProduct = async (product) => {
        checkCancelBeforeDispatch({
            type: 'LOADING'
        })

        try {
            const res = await createProduct(product)
            
            checkCancelBeforeDispatch({
                type: 'INSERTED_PRODUCT',
                payload: res.data
            })

            return res.data
        } 
        
        catch (error) {
            const errorMessage = error.response?.data?.error || error.response?.data?.errors?.[0]?.msg || 'Erro ao criar produto'
            
            checkCancelBeforeDispatch({
                type: 'ERROR',
                payload: errorMessage
            })

            throw error
        }
    }

    return { insertProduct, ...response }
}
