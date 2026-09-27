import { useState } from "react";
import { addProduct } from "../services/productApi"

const AddProduct = () => {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState("")

    const [formData, setFormData] = useState({
        title: "",
        price: "",
        category: "",
        description: "",
        stock: "",
    })
  
    const handleChange = (e) => {
    const { name, value } = e.target
  
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }

    const handleSubmit = async(e) => {
      e.preventDefault();
    
      if (!formData.title.trim()) {
        setError("Product title is required")
        return;
      }
    
      if (!formData.price || Number(formData.price) <= 0) {
        setError("Price must be greater than 0")
        return;
      }
    
      if (!formData.category.trim()) {
        setError("Category is required")
        return;
      }
    
      if (!formData.description.trim()) {
        setError("Description is required")
        return;
      }
    
      if (formData.stock === "" || Number(formData.stock) < 0) {
        setError("Stock cannot be negative")
        return;
      }
    
      setError("");
    
      setLoading(true)

      setSuccess("")

      try {
        const data = await addProduct({
          title: formData.title,
          price: Number(formData.price),
          category: formData.category,
          description: formData.description,
          stock: Number(formData.stock),
          thumbnail: formData.image
        })
      
        console.log("Product created:", data)
        setSuccess("Product added successfully")
        setFormData({
           title: "",
           price: "",
           category: "",
           description: "",
           stock: "",
           image: "",
        })

        const existingProducts = JSON.parse(
            localStorage.getItem("createdProducts") || "[]")

        const newProduct = {
            ...data,
            id: `local-${Date.now()}`,
        }

        localStorage.setItem(
          "createdProducts",
          JSON.stringify([...existingProducts, newProduct])
        )

      } catch (error) {
        setError("Failed to add product")
      } finally {
        setLoading(false);
      }
    }
  
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-sm">
          <h1 className="mb-6 text-2xl font-bold text-gray-900">
            Add Product
          </h1>

          {success && (
            <div className="mb-5 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
                {success}
            </div>
           )}
  
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
                <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                    {error}
                </div>
            )}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Product Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
                placeholder="Enter product title"
              />
            </div>

            <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Image URL
                </label>
              
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
                  placeholder="https://example.com/image.jpg"
                />
            </div>
  
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
                placeholder="Enter price"
              />
            </div>
  
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
                placeholder="Enter category"
              />
            </div>
  
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
                placeholder="Enter product description"
              />
            </div>
  
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 outline-none focus:border-blue-500"
                placeholder="Enter stock quantity"
              />
            </div>
  
            <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loading ? "Adding..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    )
}
  
export default AddProduct