import api from './axios'

export const getProducts = async(limit, skip, search, category,signal) => {
    let url = `/products?limit${limit}&skip=${skip}`

    console.log(search)

    if(search) {
        url = `/products/search?q=${encodeURIComponent(search)}&limit${limit}&skip=${skip}`
    } else if(category) {
        url = `/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`
    }

    const response = await api.get(url, {signal})

    return response.data
}

export const getCategories = async() => {
    const response = await api.get('/products/categories')

    return response.data
}