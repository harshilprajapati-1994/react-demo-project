import { useAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../services/orderServices";

const MyOrders = () => {
  const { state } = useAuth();

  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders', state.user?.email],
    queryFn: () => getOrders(state.user!.email),
    enabled: !!state.user
  });

  if (isLoading) return <p>Loading your orders...</p>;

  return (
    <div className="container">
      <h2>My Orders</h2>
      {orders?.map((order, i) => (
        <div key={i}>
          <p>Order #{i + 1}</p>
          <ul>
            {order.items.map(item => (
              <li key={item.id}>{item.title} × {item.quantity}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
