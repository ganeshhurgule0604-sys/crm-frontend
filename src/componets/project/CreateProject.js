import { useState } from "react";
import ApiService from "../../common/apiService";
import Form from "../../common/Form";
import { useNavigate } from "react-router-dom";

export function CreateProject() {
    // 1. Initialize state with empty strings
    const [project, setProject] = useState({
        name: '',
        location: '',
    });
    const navigate = useNavigate();

    const onHandleChange = (e) => {
        const { name, value } = e.target;
        setProject({ ...project, [name]: value });
    };

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await ApiService({
                url: "/project",
                method: "POST",
                formData: project
            });
            console.log("PROJECT CREATED:", result);
            navigate('/projects')
            // Optional: Reset form or redirect after success
        } catch (error) {
            console.log("ERROR:", error.message);
        }
    };

    // 2. Map fields for the Form component
    const projectMap = [
        { name: 'name', type: 'text', action: onHandleChange, value: project.name },
        { name: 'location', type: 'text', action: onHandleChange, value: project.location },
        { name: 'submit', type: 'submit', value: 'Create Project' }
    ];

    return (
        <form onSubmit={onHandleSubmit}>
            <h2 style={{ marginBottom: '20px' }}>Create New Project</h2>
            <Form params={projectMap} />
        </form>
    );
}
