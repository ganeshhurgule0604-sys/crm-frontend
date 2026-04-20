import { type } from "@testing-library/user-event/dist/type";
import { useState } from "react";
import Form from "../common/Form";
import ApiService from "../common/apiService";

export default function Login() {
    const [loginForm, setLoginForm] = useState({
        email: "",
        phone: "",
        password: ""
    });


    const onHandleChange = (e) => {
        const { name, value } = e.target;

        setLoginForm({
            ...loginForm,
            [name]: value
        })

    }

    const onHandleSubmit = async (e) => {
        e.preventDefault()
        console.log(loginForm)

        try {
            if (loginForm) {
                const result = await ApiService({
                    url: '/auth/login',
                    method: 'POST',
                    formData: loginForm
                })

                console.log(result);
            }
        } catch (error) {
            console.log(error)
        }

    }

    const formData = [
        { name: 'email', type: 'email', value: loginForm.emial, action: onHandleChange },
        {
            name: 'phone', type: 'number', value: loginForm.value, action: onHandleChange
        },
        {
            name: 'password', type: 'password', value: loginForm.password, action: onHandleChange
        }
        ,
        {
            type: 'submit', value: 'login'
        }

    ]



    return (
        <>
            <form onSubmit={onHandleSubmit}>
                <Form params={formData}></Form>
            </form>
        </>
    )

}