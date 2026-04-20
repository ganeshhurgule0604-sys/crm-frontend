import { useEffect, useState } from "react";
import ApiService from "../../common/apiService";
import Form from "../../common/Form";

export default function UpdateLead() {
    // 1. Initialize state with empty strings to avoid the "uncontrolled" warning
    const [lead, setLead] = useState({
        name: '',
        email: '',
        phone: '',
        project: '',
        configuration: '',
        budget: '',
        status: '',
        source: '',
        owner: ''
    });

    const getLead = async () => {
        const result = await ApiService({
            url: 'lead/1', // Ensure this matches your NestJS route
            method: 'GET',
        });
        // Use fallback to empty string in case API returns null for some fields
        if (result.data) {
            setLead({
                ...result.data,
                name: result.data.name || '',
                email: result.data.email || '',
                phone: result.data.phone || '',
                // Add other fields as needed
            });
        }
    };

    useEffect(() => {
        getLead();
    }, []);

    const onHandleChange = (e) => {
        const { name, value } = e.target;
        setLead({ ...lead, [name]: value });
    };

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        try {
            await ApiService({
                url: 'lead/1',
                method: 'PUT',
                formData: lead
            });
            console.log("Updated successfully");
        } catch (error) {
            console.error("Update failed", error);
        }
    };

    // 2. Properly format the leadMap array for your Form component
    const leadMap = [
        { name: 'name', type: 'text', action: onHandleChange, value: lead.name },
        { name: 'email', type: 'email', action: onHandleChange, value: lead.email },
        { name: 'phone', type: 'text', action: onHandleChange, value: lead.phone },
        { name: 'configuration', type: 'text', action: onHandleChange, value: lead.configuration },
        { name: 'budget', type: 'text', action: onHandleChange, value: lead.budget },
        { name: 'status', type: 'text', action: onHandleChange, value: lead.status },
        { name: 'source', type: 'text', action: onHandleChange, value: lead.source },
        { name: 'submit', type: 'submit', value: 'Update Lead' }
    ];

    return (
        <form onSubmit={onHandleSubmit}>
            <Form params={leadMap} />
        </form>
    );
}
