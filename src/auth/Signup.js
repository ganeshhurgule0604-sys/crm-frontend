import { useState } from "react";
import Form from "../common/Form";
import ApiService from "../common/apiService";
import AuthLayout from "./AuthLayout";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const [loginObj, setLogin] = useState({
        name: '',

        email: '',

        role: '',

        phone: '',

        password: ''
    });
    const navigate = useNavigate();
    const onHandleChange = (e) => {
        const { name, value } = e.target;

        setLogin({
            ...loginObj,
            [name]: value
        })
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (loginObj) {
                const result = await ApiService({
                    url: "/auth/signup",
                    method: "POST",
                    formData: loginObj
                });
                console.log("SUCCESS:", result);
                localStorage.setItem('token', result.data.token)
                navigate('/users')
            }


        } catch (error) {
            console.log("ERROR:", error.message);
        }
    };
    const userMap = [
        {
            name: 'name',
            type: 'text',
            action: onHandleChange,
            value: loginObj.name
        },
        {
            name: 'email',
            type: 'text',
            action: onHandleChange,
            value: loginObj.email
        },
        {
            name: 'phone',
            type: 'text',
            action: onHandleChange,
            value: loginObj.phone
        },
        {
            name: 'role',
            type: 'radio',
            options: ['admin', 'cp'],
            action: onHandleChange,
            value: loginObj.role
        },
        {
            name: 'password',
            type: 'password',
            action: onHandleChange,
            value: loginObj.password
        },
        {
            name: 'submit',
            type: 'submit',
            value: 'Submit'
        }
    ];


    return (
        <AuthLayout>
            <form onSubmit={onHandleSubmit}>
                <Form params={userMap}></Form>
            </form>
        </AuthLayout>
    )
}