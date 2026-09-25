import api from './axios'

export const getProducts = async(limit, skip) => {
    const response = await api.get(`/products?limit${limit}&skip=${skip}`)

    return response.data
}