import { Link, useNavigate, useLocation } from "react-router-dom";
import "./navbar.css";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation(); // ✅ get current route
    const { theme, toggleTheme } = useContext(ThemeContext);

    if (location.pathname === "/login" || location.pathname === "/signup") {
        return null;
    }
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="sidebar">
            <h2 className="logo">My App</h2>

            <Link to="/">Dashboard</Link>
            <Link to="/leads">Leads</Link>
            <Link to="/users">Users</Link>
            <Link to="/projects">Projects</Link>
            <button onClick={toggleTheme}>
                {theme === "light" ? "🌙 Dark" : "☀️ Light"}
            </button>
            {!token && (
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Signup</Link>
                </>
            )}

            {token && (
                <button className="logout-btn" onClick={handleLogout}>
                    Logout
                </button>
            )}
        </nav>
    );
}