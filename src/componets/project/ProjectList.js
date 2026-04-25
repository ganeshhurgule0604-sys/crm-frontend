import { useEffect, useState } from "react";
import ApiService from "../../common/apiService";
import { useNavigate } from "react-router-dom";
import CommonTable from "../../common/commonTable";

export default function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [meta, setMeta] = useState({
        total: 0,
        page: 1,
        limit: 5
    });
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    // 🔥 Fetch with pagination (future ready)
    const getProjects = async (page = 1, limit = 5) => {
        try {
            const result = await ApiService({
                url: `/project?page=${page}&limit=${limit}`,
                method: "GET",
            });

            setProjects(result.data || []);
            setMeta(result.metaData || { total: 0, page: 1, limit: 5 });

        } catch (error) {
            console.error("Error fetching projects:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProjects(meta.page, meta.limit);
    }, [meta.page]);

    if (loading) return <p>Loading projects...</p>;

    const totalPages = Math.ceil(meta.total / meta.limit);

    // ✅ CommonTable config
    const tableData = {
        columns: [
            {
                header: "#",
                render: (_, index) =>
                    (meta.page - 1) * meta.limit + index + 1
            },
            { header: "Name", accessor: "name" },
            { header: "Location", accessor: "location" },
            { header: "Status", accessor: "status" },

            {
                header: "Actions",
                render: (row) => (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/projects/${row.id}/edit`);
                        }}
                    >
                        Edit
                    </button>
                )
            }
        ],

        data: projects,

        // 🔥 Row click → details
        rowClick: (row) => navigate(`/projects/${row.id}`),

        // 🔥 Pagination
        currentPage: meta.page,
        totalPages,
        onPageChange: (page) =>
            setMeta((prev) => ({ ...prev, page }))
    };

    return (
        <div style={{ padding: "20px" }}>
            <button onClick={() => navigate("/projects/create")}>
                Create Project
            </button>

            <h2>Project List</h2>

            <CommonTable {...tableData} />
        </div>
    );
}