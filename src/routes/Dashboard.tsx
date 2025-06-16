import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <>
      <h2>Welcome, {user?.email}</h2>
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default Dashboard;
