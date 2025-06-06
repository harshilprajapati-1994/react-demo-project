import { useAuth } from "../context/AuthContext"

const Dashboard = () => {
    const {user, logout} = useAuth();

    const handlelogout = () => {
        logout();
    }

    return (
        <>
            Welcome {user?.username}
            <button type="button" onClick={handlelogout}>Logout</button>
        </>
    )
}

export default Dashboard