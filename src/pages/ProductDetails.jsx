import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../services/productApi";


const ProductDetails = () =>{
    const { id } = useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

  useEffect(() => {
    const fetchProduct = async () => {
        try {
            setLoading(true)
            setError("")
    
            const data = await getProductById(id)
    
            setProduct(data)
        } catch (error) {
            setError("Product not found")
        } finally {
            setLoading(false)
        }
    }

    fetchProduct()
  }, [id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
  <div className="min-h-screen bg-gray-50 p-6">
    <div className="mx-auto max-w-6xl rounded-xl bg-white p-6 shadow-sm">
        <button
        onClick={() => navigate("/products")}
        className="mb-6 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
            ← Back to Products
        </button>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <img
            src={product.thumbnail}
            alt={product.title}
            className="h-96 w-full rounded-lg object-contain"
          />
        </div>
        <div>
          <p className="mb-2 text-sm capitalize text-gray-500">
            {product.category}
          </p>

          <h1 className="mb-4 text-3xl font-bold text-gray-900">
            {product.title}
          </h1>

          <p className="mb-6 text-gray-600">
            {product.description}
          </p>

          <p className="mb-4 text-2xl font-bold text-blue-600">
            ${product.price}
          </p>

          <div className="mb-6 flex gap-6 text-sm text-gray-600">
            <span>⭐ {product.rating}</span>
            <span>Stock: {product.stock}</span>
          </div>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-200 pt-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">
          Reviews
        </h2>

        {product.reviews?.length > 0 ? (
              <div className="space-y-4">
                {product.reviews.map((review, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-gray-200 p-4"
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">
                        {review.reviewerName}
                      </h3>
          
                      <span className="text-sm text-gray-500">
                        ⭐ {review.rating}/5
                      </span>
                    </div>
          
                    <p className="text-gray-600">
                      {review.comment}
                    </p>
                  </div>
                ))}
              </div>
              ) : (
              <p className="text-gray-500">
                  No reviews available.
              </p>
              )}
            </div>
        </div>
    </div>)
}


export default ProductDetails