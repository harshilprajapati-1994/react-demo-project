// src/pages/AdminProductList.tsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchProducts, deleteProduct } from "../services/productService";
import { Link } from "react-router-dom";

const AdminProductList = () => {
  const queryClient = useQueryClient();

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    }
  });

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products</p>;

  return (
    <div className="container">
      <h2>Admin - Product List</h2>
      <Link to="/admin/products/add"><button>Add Product</button></Link>
      <table>
        <thead>
          <tr>
            <th>Image</th><th>Title</th><th>Price</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products?.map(product => (
            <tr key={product.id}>
              <td><img src={product.image} width="50" /></td>
              <td>{product.title}</td>
              <td>₹{product.price}</td>
              <td>
                <Link to={`/admin/products/edit/${product.id}`}><button>Edit</button></Link>
                <button onClick={() => deleteMutation.mutate(product.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProductList;
