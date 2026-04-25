// src/hooks/useMasterData.js
import { useEffect, useState } from "react";
import ApiService from "../common/apiService";

export default function useMasterData() {
    const [master, setMaster] = useState({
        configuration: [],
        budget: [],
        source: []
    });

    const convert = (obj = {}) =>
        Object.entries(obj).map(([key, value]) => ({
            label: key,
            value: value
        }));

    const fetchMaster = async () => {
        try {
            const res = await ApiService({
                url: "/lead/master-data",
                method: "GET"
            });

            const data = res.data;

            setMaster({
                configuration: convert(data.configuration),
                budget: convert(data.budget),
                source: convert(data.source)
            });

        } catch (err) {
            console.log("MasterData Error:", err.message);
        }
    };

    useEffect(() => {
        fetchMaster();
    }, []);

    return master;
}