import { useEffect, useState } from "react";
import ApiService from "../../common/apiService";

export default function LeadDetails() {
    const [lead, setLead] = useState({});
    const getLead = async () => {
        const response = await ApiService({
            url: '/lead/2',
            method: 'GET',
        })
        setLead(response.data);
    }
    useEffect(() => {
        getLead();
    }, []);
    return (
        <>
            {lead.name}
        </>
    )

}