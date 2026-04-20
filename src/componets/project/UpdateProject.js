import { useEffect, useState } from "react";
import ApiService from "../../common/apiService";
import Form from "../../common/Form";

export default function UpdateProject() {
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

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await ApiService({
                url: "/project/1",
                method: "PUT",
                formData: project
            });
            console.log("SUCCESS:", result);
        } catch (error) {
            console.log("ERROR:", error.message);
        }
    };

    const projectMap = [
        { name: 'name', type: 'text', action: onHandleChange, value: project.name },
        { name: 'location', type: 'text', action: onHandleChange, value: project.location },
        { name: 'status', type: 'text', action: onHandleChange, value: project.status },
        { name: 'submit', type: 'submit', value: 'Update Project' }
    ];

    return (
        <form onSubmit={onHandleSubmit}>
            <h2>Project Details</h2>
            <Form params={projectMap} />
        </form>
    );
}
