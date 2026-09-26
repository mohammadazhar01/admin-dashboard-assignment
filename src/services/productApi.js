import api from './axios'

export const getProducts = async(limit, skip, search, category, sortBy,signal) => {
    let url = `/products?limit${limit}&skip=${skip}`

    console.log(search)

    if(search) {
        url = `/products/search?q=${encodeURIComponent(search)}&limit${limit}&skip=${skip}`
    } else if(category) {
        url = `/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`
    }
    console.log(sortBy)

    if(sortBy) {
        console.log(sortBy)
        url += `&sortBy=${sortBy}&order=asc`
    }

    const response = await api.get(url, {signal})

    return response.data
}

export const getCategories = async() => {
    const response = await api.get('/products/categories')

    return response.data
}

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`)

  return response.data
};