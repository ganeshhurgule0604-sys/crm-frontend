import { useState } from "react";
import ApiService from "../../common/apiService";
import Form from "../../common/Form";

export default function CreateLead() {
    // 1. Initialize with empty strings to prevent the warning
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

    const onHandleChange = (e) => {
        const { name, value } = e.target;
        setLead({ ...lead, [name]: value });
    };

    const onHandleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await ApiService({
                url: "/lead",
                method: "PUT",
                formData: lead
            });
            console.log("SUCCESS:", result);
        } catch (error) {
            console.log("ERROR:", error.message);
        }
    };

    // 2. Map state to the Form component parameters
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
