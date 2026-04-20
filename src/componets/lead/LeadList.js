import { useEffect, useState } from "react";
import ApiService from "../../common/apiService";

export default function LeadList() {
    const [leads, setLead] = useState([]);

    const fetLeadList = async () => {
        const reslut = await ApiService({
            url: '/lead',
            method: 'GET'
        });
        console.log(reslut);
        setLead(reslut.data);
    }
    useEffect(() => {
        fetLeadList();

    }, []);
    return (
        <>
            {
                leads.map((lead) => (
                    <h1>{lead.name}</h1>
                ))
            }
        </>
    )
}