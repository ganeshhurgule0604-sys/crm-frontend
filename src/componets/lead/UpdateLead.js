import { useEffect, useState } from "react";
import ApiService from "../../common/apiService";
import Form from "../../common/Form";
import { useNavigate, useParams } from "react-router-dom";
import useMasterData from "../../hooks/useMasterData";

export default function UpdateLead() {
    const { id } = useParams();
    const master = useMasterData();
    const navigate = useNavigate();
    const [lead, setLead] = useState({
        name: '',
        email: '',
        phone: '',
        configuration: '',
        budget: '',
        source: '',
    });

    const getLead = async () => {
        const result = await ApiService({
            url: `/lead/${id}`,
            method: 'GET',
        });

        if (result.data) {
            setLead({
                name: result.data.name || '',
                email: result.data.email || '',
                phone: result.data.phone || '',
                configuration: result.data.configuration || '',
                budget: result.data.budget || '',
                source: result.data.source || '',
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

        const cleanData = Object.fromEntries(
            Object.entries(lead).filter(([_, v]) => v !== "")
        );

        await ApiService({
            url: `/lead/${id}`,
            method: 'PUT',
            formData: cleanData
        });


        navigate('/leads')


    };

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

        { name: 'submit', type: 'submit', value: 'Update Lead' }
    ];

    return (
        <form onSubmit={onHandleSubmit}>
            <Form params={leadMap} />
        </form>
    );
}