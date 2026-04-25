import { useEffect, useState } from "react";
import ApiService from "../../common/apiService";
import "./user.css";
import { useNavigate } from "react-router-dom";
import CommonTable from "../../common/commonTable";

export default function UserList() {
    const [users, setUsers] = useState([]);
    const [meta, setMeta] = useState({
        total: 0,
        page: 1,
        limit: 5
    });

    const navigate = useNavigate();

    // 🔥 Fetch users with pagination
    const getUsers = async (page = 1, limit = 5) => {
        try {
            const res = await ApiService({
                url: `/user/list?page=${page}&limit=${limit}`,
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

    // 🔥 Call API on page change
    useEffect(() => {
        getUsers(meta.page, meta.limit);
    }, [meta.page]);

    const totalPages =
        meta.limit && meta.total
            ? Math.ceil(meta.total / meta.limit)
            : 1;

    // ✅ Table config
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

        // 🔥 Row click
        rowClick: (row) => navigate(`/users/${row.id}`),

        // 🔥 Pagination
        currentPage: meta.page,
        totalPages,
        onPageChange: (page) =>
            setMeta((prev) => ({ ...prev, page }))
    };

    return (
        <div className="user-container">
            <h2>User List</h2>
            <CommonTable {...tableData} />
        </div>
    );
}