import { useEffect, useState } from "react";
import ApiService from "../../common/apiService";

export default function UserList() {
    const [userList, setUserList] = useState([]);

    const getUserList = async () => {
        const result = await ApiService({
            url: '/user/list',
            method: 'GET',

        });

        setUserList(result.data);
    }
    useEffect(() => {
        getUserList()
    }, []);

    if (userList.length == 0) {
        return <h1>Loading...!</h1>
    }
    return (
        <>
            {
                userList.map((user) => (
                    <div key={user.id}>
                        <h1>{user.name}</h1>
                    </div>
                ))
            }
        </>
    )
}