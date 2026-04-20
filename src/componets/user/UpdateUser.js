import { useEffect, useState } from "react";
import ApiService from "../../common/apiService";
import Form from "../../common/Form";

export default function UpdateUser() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });

    const getUser = async () => {
        const result = await ApiService({
            url: '/user/1',
            method: 'GET',
        })

        setUser(result.data);
    }
    useEffect(() => {
        getUser()
    }, []);
    const onHandleChange = (e) => {
        const { name, value } = e.target;

        setUser({
            ...user,
            [name]: value
        })
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (user) {
                const result = await ApiService({
                    url: "/user/1",
                    method: "PUT",
                    formData: user
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
            value: user.name
        },
        {
            name: 'email',
            type: 'text',
            action: onHandleChange,
            value: user.email
        },
        {
            name: 'phone',
            type: 'text',
            action: onHandleChange,
            value: user.phone
        },
        {

            type: 'submit',
            value: "edit"
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