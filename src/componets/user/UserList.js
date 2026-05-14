import { useEffect, useState } from "react";
import ApiService from "../../common/apiService";
import "./user.css";
import { useNavigate } from "react-router-dom";
import CommonTable from "../../common/commonTable";
import SearchList from "../../common/seachList";

export default function UserList() {
    const [users, setUsers] = useState([]);

    const [name, setName] = useState("");

    const [meta, setMeta] = useState({
        total: 0,
        page: 1,
        limit: 5
    });

    const navigate = useNavigate();

    // Fetch users
    const getUsers = async (
        page = 1,
        limit = 5,
        name = ""
    ) => {
        try {
            const res = await ApiService({
                url: `/user/list?page=${page}&limit=${limit}&name=${name}`,
                method: "GET",
            });

            setUsers(res?.data || []);

            setMeta({
                total: res?.metaData?.total ?? 0,
                page: res?.metaData?.page ?? 1,
                limit: res?.metaData?.limit ?? 5
            });

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getUsers(meta.page, meta.limit, name);
    }, [meta.page, name]);

    const totalPages =
        meta.limit && meta.total
            ? Math.ceil(meta.total / meta.limit)
            : 1;

    const tableData = {
        columns: [
            {
                header: "#",
                render: (_, index) =>
                    (meta.page - 1) * meta.limit + index + 1
            },
            { header: "Name", accessor: "name" },
            { header: "Email", accessor: "email" },
            { header: "Phone", accessor: "phone" },
            { header: "Role", accessor: "role" }
        ],

        data: users,

        rowClick: (row) => navigate(`/users/${row.id}`),

        currentPage: meta.page,
        totalPages,

        onPageChange: (page) =>
            setMeta((prev) => ({ ...prev, page }))
    };

    return (
        <div className="user-container">
            <h2>User List</h2>

            <SearchList
                placeHolder="Search here"
                type="text"
                onChange={(e) => setName(e.target.value)}
            />

            <CommonTable {...tableData} />
        </div>
    );
}