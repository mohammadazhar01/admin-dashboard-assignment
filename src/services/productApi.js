import api from './axios'

export const getProducts = async(limit, skip, search) => {
    let url = `/products?limit${limit}&skip=${skip}`

    if(search) {
        url = `/products?q=${encodeURIComponent(search)}&limit${limit}&skip=${skip}`
    }

    const response = await api.get(url)

    return response.data
}