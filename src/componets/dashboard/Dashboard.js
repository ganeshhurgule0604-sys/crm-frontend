import { useEffect, useState } from "react";
import ApiService from "../../common/apiService";

export default function Dashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const getDashboard = async () => {
        try {
            const res = await ApiService({
                url: "/dashboard",
                method: "GET",
            });

            setData(res?.data);
        } catch (err) {
            console.log("Dashboard error:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getDashboard();
    }, []);

    if (loading) return <h3>Loading dashboard...</h3>;

    return (
        <div style={{ padding: "20px" }}>
            <h1>📊 Dashboard</h1>

            {/* Leads Summary */}
            <div className="card">
                <h2>Leads</h2>
                <p>Total Leads: {data?.leads?.total}</p>
                <p>Today's Leads: {data?.leads?.today}</p>
            </div>

            {/* Status Wise */}
            <div className="card">
                <h3>Status Wise</h3>
                {data?.leads?.statusWise?.map((item, i) => (
                    <p key={i}>
                        {item.status}: {item.count}
                    </p>
                ))}
            </div>

            {/* Source Wise */}
            <div className="card">
                <h3>Source Wise</h3>
                {data?.leads?.sourceWise?.map((item, i) => (
                    <p key={i}>
                        {item.source}: {item.count}
                    </p>
                ))}
            </div>

            {/* Owner Wise */}
            <div className="card">
                <h3>Owner Wise</h3>
                {data?.leads?.ownerWise?.map((item, i) => (
                    <p key={i}>
                        {item.ownerName || "Unassigned"}: {item.count}
                    </p>
                ))}
            </div>
        </div>
    );
}