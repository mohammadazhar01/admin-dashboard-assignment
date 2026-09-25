import api from './axios'

export const getProducts = async(limit, skip, search, signal) => {
    let url = `/products?limit${limit}&skip=${skip}`

    console.log(search)

    if(search) {
        console.log(search)
        url = `/products/search?q=${encodeURIComponent(search)}&limit${limit}&skip=${skip}`
    }

    const response = await api.get(url, {signal})

    return response.data
}