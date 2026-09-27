import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProductById, updateProduct } from "../services/productApi"

const EditProduct = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("")
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        category: "",
        description: "",
        stock: "",
        image: "",
    })

    const [isSaving, setIsSaving] = useState(false);
    const [success, setSuccess] = useState("")

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setIsLoading(true);
                setError("");
    
                const data = await getProductById(id);
                setProduct(data)
                setFormData({
                title: data.title || "",
                price: data.price || "",
                category: data.category || "",
                description: data.description || "",
                stock: data.stock ?? "",
                image: data.thumbnail || "",
            })
        } catch (error) {
                setError("Failed to load product");
            } finally {
                setIsLoading(false);
            }
        }
         fetchProduct()
    }, [id]);

    const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }

    const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setError("");

    if (!formData.title.trim()) {
        setError("Title is required");
        return;
    }

    if (!formData.price || Number(formData.price) <= 0) {
        setError("Price must be greater than 0");
        return;
    }

    if (!formData.category.trim()) {
        setError("Category is required");
        return;
    }

    if (!formData.description.trim()) {
        setError("Description is required");
        return;
    }

    if (
        formData.stock === "" ||
        Number(formData.stock) < 0
    ) {
        setError("Stock cannot be negative");
        return;
    }

    setIsSaving(true);

try {
    const data = await updateProduct(id, {
        title: formData.title,
        price: Number(formData.price),
        category: formData.category,
        description: formData.description,
        stock: Number(formData.stock),
        thumbnail: formData.image,
    });

    setProduct(data);
    setSuccess("Product updated successfully")
    setTimeout(() => {
        navigate("/products");
    }, 1000);
} catch (error) {
    setError("Failed to update product");
} finally {
    setIsSaving(false);
}
};

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }
    
    if (!product) {
        return <p>Product not found</p>;
    }
    
return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="mx-auto max-w-3xl">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                    Edit Product
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    Update the product information below.
                </p>
            </div>

            <div className="rounded-xl bg-white p-6 shadow-sm">
                {error && (
                    <div className="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-5 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-600">
                        {success}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Title
                        </label>

                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            placeholder="Enter product title"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Price
                            </label>

                            <input
                                name="price"
                                type="number"
                                value={formData.price}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                placeholder="Enter price"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Stock
                            </label>

                            <input
                                name="stock"
                                type="number"
                                value={formData.stock}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                placeholder="Enter stock"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Category
                        </label>

                        <input
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                            rows={5}
                            className="w-full resize-none rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            placeholder="Enter product description"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-medium text-gray-700">
                            Image URL
                        </label>

                        <input
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    <div className="flex justify-end pt-2">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {isSaving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
)
}

export default EditProduct