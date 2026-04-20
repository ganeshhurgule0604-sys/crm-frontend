import { useEffect, useState } from "react";
import ApiService from "../../common/apiService";

export default function UserDetails() {
    const [user, setUser] = useState({});
    const getUser = async () => {
        const response = await ApiService({
            url: '/user/1',
            method: 'GET',

        })
        console.log(response.data)
        setUser(response.data)
    }
    useEffect(() => {
        getUser();
    }, []);

    if (user.length == 0) {
        return <h1>Loading...</h1>
    }
    return (
        <>
            {

                <>
                    <h1>{user.name}</h1>
                    <p>Email: {user.email}</p>
                    <p>Role: {user.role}</p>
                </>

            }
        </>
    )
}