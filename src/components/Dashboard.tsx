import { useAuth } from "../context/AuthContext"

const Dashboard = () => {
    const {user} = useAuth()
    return (
        <>
            Welcome {user}
        </>
    )
}

export default Dashboard