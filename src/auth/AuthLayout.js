import "./auth.css";

export default function AuthLayout({ children }) {
    return (
        <div className="auth-container">

            <div className="auth-left">
                <h1>My App</h1>
                <h2>Login into your account</h2>
                <p>Let us make your app better 🚀</p>
            </div>

            <div className="auth-right">
                <div className="auth-card">
                    {children}
                </div>
            </div>

        </div>
    );
}