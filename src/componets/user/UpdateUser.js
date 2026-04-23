import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ApiService from "../../common/apiService";
import Form from "../../common/Form";

export default function UpdateUser() {
    const { id } = useParams(); // ✅ dynamic id
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });

    const getUser = async () => {
        const result = await ApiService({
            url: `/user/${id}`, // ✅ FIX
            method: 'GET',
        });

        setUser(result?.data || result);
    };

    useEffect(() => {
        getUser();
    }, [id]);

    const onHandleChange = (e) => {
        const { name, value } = e.target;

        setUser({
            ...user,
            [name]: value
        });
    };

    const onHandleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await ApiService({
                url: `/user/${id}`, // ✅ FIX
                method: "PUT",
                data: user // ✅ FIX
            });

            console.log("SUCCESS:", result);

            navigate(`/users/${id}`); // 🔥 back to details page

        } catch (error) {
            console.log("ERROR:", error.message);
        }
    };

    const userMap = [
        { name: 'name', type: 'text', action: onHandleChange, value: user.name },
        { name: 'email', type: 'text', action: onHandleChange, value: user.email },
        { name: 'phone', type: 'text', action: onHandleChange, value: user.phone },
        { type: 'submit', value: "Update User" }
    ];

    return (
        <form onSubmit={onHandleSubmit}>
            <Form params={userMap} />
        </form>
    );
}