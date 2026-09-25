
const products = [ { id: 1, title: "Essence Mascara Lash Princess", category: "beauty", price: 9.99, rating: 4.94, stock: 5, thumbnail: "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp", },
                   { id: 2, title: "Eyeshadow Palette with Mirror", category: "beauty", price: 19.99, rating: 3.28, stock: 44, thumbnail: "https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp", },
                { id: 3, title: "Powder Canister", category: "beauty", price: 14.99, rating: 4.59, stock: 59, thumbnail: "https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp", }, 
            ];

const Products = () => {


    return(
        <div className= "min-h-screen bg-gray-50">
            <header className="border-b border-gray-200 bg-white">
                <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
                    <div>
                        <h1 className="text-xl font-semibold text-gray-900">
                            Products
                        </h1>
                        <p className="hidden text-sm text-gray-500 sm:block">
                            Manage your products 
                        </p>
                    </div>

                    <button className= "rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
                        + Add product
                    </button>
                </div>
            </header>

            <main className="p-4 sm:p-6 lg:p-8">
                <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="w-full lg:max-w-md">
                        <input 
                          type="text"
                          placeholder="Search products"
                          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                        />
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <select className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-500">
                            <option>All Categories</option>
                            <option>Beauty</option>
                            <option>Fragrances</option>
                            <option>Furniture</option>
                        </select>

                        <select className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-500">
                            <option>Sort by</option>
                            <option>Title</option>
                            <option>Price</option>
                            <option>Rating</option>
                        </select>
                    </div>
                </div>

                <div className="hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm md:block">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="border-b border-gray-200 bg-gray-50">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Product
                                    </th>

                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Category
                                    </th>

                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Price
                                    </th>

                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Rating
                                    </th>

                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Stock
                                    </th>

                                    <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {products.map((product) => (
                                        <tr key= {product.id} className="transition hover:bg-gray-50">

                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <img src={product.thumbnail} 
                                                      alt={product.title} 
                                                      className="h-12 w-12 rounded-lg object-cover" 
                                                    />

                                                    <div> 
                                                        <p className="font-medium text-gray-900">
                                                            {product.title} 
                                                        </p> 
                                                        <p className="text-xs text-gray-500">
                                                            ID: #{product.id} 
                                                        </p> 
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-6 py-4">
                                                <span className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium capitalize text-gray-700">
                                                    {product.category} 
                                                </span> 
                                            </td> 
                                            <td className="px-6 py-4 font-medium text-gray-900"> 
                                                ${product.price} 
                                            </td> 
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-gray-700"> 
                                                    {product.rating} 
                                                </span> 
                                            </td>
                                            <td className="px-6 py-4"> 
                                                <span className={`text-sm font-medium ${ product.stock < 10 ? "text-red-600" : "text-green-600" }`} >
                                                    {product.stock} in stock 
                                                </span> </td> <td className="px-6 py-4"> 
                                                <button className="text-sm font-medium text-blue-600 hover:text-blue-800">
                                                    View 
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                        </table>
                    </div>
                </div>

                <div className="space-y-4 md:hidden"> 
                    {products.map((product) => ( 
                        <div key={product.id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm" > 
                           <div className="flex gap-4"> 
                              <img src={product.thumbnail} 
                                alt={product.title} 
                                className="h-20 w-20 shrink-0 rounded-lg object-cover" 
                              />

                              <div className="min-w-0 flex-1"> 
                                  <h2 className="truncate font-semibold text-gray-900"> 
                                      {product.title} 
                                  </h2> 
                                  <p className="mt-1 text-sm capitalize text-gray-500"> 
                                      {product.category} 
                                  </p> 
                                  <p className="mt-2 font-semibold text-gray-900"> 
                                      ${product.price} 
                                  </p> 
                                  
                              </div> 
                            </div> 
                            
                            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4"> 
                                <span className="text-sm text-gray-600"> 
                                    ⭐ {product.rating} 
                                </span> 
                                <span className={`text-sm font-medium ${ product.stock < 10 ? "text-red-600" : "text-green-600" }`} > 
                                    {product.stock} in stock 
                                </span> 
                                
                                <button className="text-sm font-medium text-blue-600"> 
                                    View 
                                </button> 
                            </div> 
                        </div> 
                    ))} 
                </div>

                <div className="mt-6 flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-gray-500"> 
                        Showing 
                        <span className="font-medium text-gray-700">
                            1–10
                        </span> {" "} of <span className="font-medium text-gray-700">194</span> 
                    </p>
                    
                    <div className="flex items-center gap-2">
                        <button className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"> 
                            Previous 
                        </button> 
                        
                        <button className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-medium text-white"> 
                            1 
                        </button> 
                        
                        <button className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"> 
                            2 
                        </button> 
                        
                        <button className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"> 
                            3 
                        </button> 
                        <button className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50"> 
                            Next 
                        </button> 
                    </div> 
                </div>
            </main>
        </div>
    )
    
}

export default Products

