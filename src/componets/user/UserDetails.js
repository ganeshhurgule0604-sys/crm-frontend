import { useEffect, useState } from "react";
import ApiService from "../../common/apiService";
import { useParams } from "react-router-dom";
import "./userDetails.css";
import { useNavigate } from "react-router-dom";
export default function UserDetails() {
    const [user, setUser] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const getUser = async () => {
        const response = await ApiService({
            url: `/user/${id}`,
            method: "GET",
        });

        setUser(response?.data || response);
    };

    useEffect(() => {
        getUser();
    }, [id]);

    if (!user) return <h2>Loading...</h2>;

    return (
        <div className="user-details">
            <div className="card">
                <h2>{user.name}</h2>
                <button onClick={() => navigate(`/users/${user.id}/edit`)}>
                    ✏️ Edit
                </button>
                <div className="info">
                    <p><span>Email:</span> {user.email}</p>
                    <p><span>Phone:</span> {user.phone}</p>
                    <p><span>Role:</span> {user.role}</p>
                </div>
            </div>
        </div>
    );
}