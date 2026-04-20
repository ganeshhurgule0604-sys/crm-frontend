import { useEffect, useState } from "react";
import ApiService from "../../common/apiService";

export default function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const getProjects = async () => {
        try {
            const result = await ApiService({
                url: '/project', // Hits your Lead/Project Controller
                method: 'GET',
            });
            // Handle NestJS response structure (usually result.data)
            setProjects(result.data || []);
        } catch (error) {
            console.error("Error fetching projects:", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProjects();
    }, []);

    if (loading) return <p>Loading projects...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <h2>Project List</h2>
            <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f4f4f4' }}>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.length > 0 ? (
                        projects.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.location}</td>
                                <td>{item.status}</td>
                                <td>
                                    <button onClick={() => console.log('Edit', item.id)}>Edit</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" style={{ textAlign: 'center' }}>No projects found</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
