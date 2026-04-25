import { useState } from "react";
import ApiService from "../../common/apiService";
import Form from "../../common/Form";
import useMasterData from "../../hooks/useMasterData";
import { useNavigate } from "react-router-dom";

export default function CreateLead() {
    // 1. Initialize with empty strings to prevent the warning
    const [lead, setLead] = useState({
        name: '',
        email: '',
        phone: '',
        project: '',
        configuration: '',
        budget: '',
        source: '',
        owner: ''
    });
    const navigate = useNavigate();
    const onHandleChange = (e) => {
        const { name, value } = e.target;
        setLead({ ...lead, [name]: value });
    };
    const master = useMasterData();
    const onHandleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await ApiService({
                url: "/lead",
                method: "POST",
                formData: lead
            });
            console.log("SUCCESS:", result);
            navigate('/leads')
        } catch (error) {
            console.log("ERROR:", error.message);
        }
    };

    // 2. Map state to the Form component parameters
    const leadMap = [
        { name: 'name', type: 'text', action: onHandleChange, value: lead.name },
        { name: 'email', type: 'email', action: onHandleChange, value: lead.email },
        { name: 'phone', type: 'text', action: onHandleChange, value: lead.phone },
        {
            name: 'configuration',
            type: 'select',
            options: master.configuration,
            action: onHandleChange,
            value: lead.configuration
        },
        {
            name: 'budget',
            type: 'select',
            options: master.budget,
            action: onHandleChange,
            value: lead.budget
        },
        {
            name: 'source',
            type: 'select',
            options: master.source,
            action: onHandleChange,
            value: lead.source
        },
        { name: 'submit', type: 'submit', value: 'Create Lead' }
    ];

    return (
        <form onSubmit={onHandleSubmit}>
            <Form params={leadMap} />
        </form>
    );
}
