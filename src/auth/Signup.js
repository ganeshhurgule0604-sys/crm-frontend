import { useState } from "react";
import Form from "../common/Form";
import ApiService from "../common/apiService";
export default function SignUp() {
    const [loginObj, setLogin] = useState({
        name: '',

        email: '',

        role: '',

        phone: '',

        password: ''
    });
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
        <>
            <form onSubmit={onHandleSubmit}>
                <Form params={userMap}></Form>
            </form>
        </>
    )
}