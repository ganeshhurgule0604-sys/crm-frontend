import { useEffect, useState } from "react";
import ApiService from "../../common/apiService";
import CommonTable from "../../common/commonTable";
import { useNavigate } from "react-router-dom";

export default function LeadList() {
    const [leads, setLead] = useState([]);
    const [meta, setMeta] = useState({
        total: 0,
        page: 1,
        limit: 5
    });

    const navigate = useNavigate();

    // 🔥 Fetch leads with pagination
    const fetLeadList = async (page = 1, limit = 5) => {
        try {
            const result = await ApiService({
                url: `/lead?page=${page}&limit=${limit}`,
                method: "GET"
            });

            setLead(result.data || []);
            setMeta(result.metaData || { total: 0, page: 1, limit: 5 });

        } catch (err) {
            console.log("Error fetching leads:", err);
        }
    };

    // 🔥 Call API when page changes
    useEffect(() => {
        fetLeadList(meta.page, meta.limit);
    }, [meta.page]);

    // 🔥 Calculate total pages from backend
    const totalPages = Math.ceil(meta.total / meta.limit);

    // 🔥 Table config
    const tableData = {
        columns: [
            {
                header: "#",
                render: (_, index) =>
                    (meta.page - 1) * meta.limit + index + 1 // ✅ correct numbering
            },
            { header: "Name", accessor: "name" },
            { header: "Email", accessor: "email" },
            { header: "Phone", accessor: "phone" },
            { header: "Configuration", accessor: "configuration" },
            { header: "Budget", accessor: "budget" },
            { header: "Status", accessor: "status" },
            { header: "Source", accessor: "source" },

            // 🔥 Actions
            {
                header: "Actions",
                render: (row) => (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/leads/${row.id}/edit`);
                        }}
                    >
                        Edit
                    </button>
                )
            }
        ],

        data: leads,

        // 🔥 Row click → details page
        rowClick: (row) => navigate(`/leads/${row.id}`),

        // 🔥 Pagination props
        currentPage: meta.page,
        totalPages,
        onPageChange: (page) =>
            setMeta((prev) => ({ ...prev, page }))
    };

    return (
        <div>
            {/* 🔥 Create Button */}
            <button onClick={() => navigate("/leads/create")}>
                Create Lead
            </button>

            {/* 🔥 Table */}
            <CommonTable {...tableData} />
        </div>
    );
}