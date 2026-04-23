import { useEffect, useState } from "react";
import ApiService from "../../common/apiService";
import "./user.css";
import { useNavigate } from "react-router-dom";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const getUsers = async () => {
        try {
            const res = await ApiService({
                url: "/user/list",
                method: "GET",
            });

            console.log("USERS:", res);

            // adjust based on your backend response
            setUsers(res?.data || res);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <div className="user-container">
            <h2>User List</h2>

            <table className="user-table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                    </tr>
                </thead>

                <tbody>
                    {users.length > 0 ? (
                        users.map((user, index) => (
                            <tr
                                key={user.id}
                                onClick={() => navigate(`/users/${user.id}`)} // 🔥 CLICK
                                style={{ cursor: "pointer" }}
                            >
                                <td>{index + 1}</td>
                                <td>{user.name || "-"}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>{user.role}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: "center" }}>
                                No users found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}