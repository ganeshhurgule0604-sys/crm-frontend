import { useEffect, useState } from "react";
import ApiService from "../../common/apiService";

export default function ProjectDetail() {
    // Initialize state with keys to keep inputs controlled
    const [project, setProject] = useState({
        name: '',
        location: '',
        status: ''
    });

    const getProject = async () => {
        try {
            const result = await ApiService({
                url: '/project/1', // Replace with dynamic ID if using routing
                method: 'GET',
            });

            if (result.data) {
                setProject({
                    name: result.data.name || '',
                    location: result.data.location || '',
                    status: result.data.status || '',
                });
            }
        } catch (error) {
            console.error("Error fetching project:", error.message);
        }
    };

    useEffect(() => {
        getProject();
    }, []);

    const onHandleChange = (e) => {
        const { name, value } = e.target;
        setProject({ ...project, [name]: value });
    };





    return (
        <>
            {
                project.name
            }
        </>
    );
}
