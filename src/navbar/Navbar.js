import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav>
            <Link to="/">Dashboard</Link> |
            <Link to="/leads">Leads</Link> |
            <Link to="/users">Users</Link> |
            <Link to="/projects">Projects</Link> |

            {!token ? (
                <>
                    <Link to="/login">Login</Link> |
                    <Link to="/signup">Signup</Link>
                </>
            ) : (
                <button onClick={handleLogout}>Logout</button>
            )}
        </nav>
    );
}