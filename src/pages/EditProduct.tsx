import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProductById, updateProduct } from "../services/productService";
import type { Product } from "../types/Product";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["product", id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
  });

  const [form, setForm] = useState({
    title: "",
    price: "",
    image: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    if (product) {
      setForm({
        title: product.title,
        price: product.price.toString(),
        image: product.image,
        description: product.description,
        category: product.category,
      });
    }
  }, [product]);

  const mutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/admin");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    mutation.mutate({
      id: parseInt(id),
      title: form.title,
      price: parseFloat(form.price),
      image: form.image,
      description: form.description,
      category: form.category,
    });
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="container">
      <h2>Edit Product</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Price" />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" />
        <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" />
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProduct;
