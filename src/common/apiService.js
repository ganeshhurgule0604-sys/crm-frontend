import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
    baseURL: 'http://localhost:3000',
    headers: {
        "Content-Type": "application/json"
    }
});

// ✅ Attach token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ✅ Handle success + error globally
api.interceptors.response.use(
    (response) => {
        // 🔥 SUCCESS POPUP (only for non-GET)
        if (response.config.method !== "get") {
            toast.success(response.data?.message || "Success!");
        }

        return response.data;
    },
    (error) => {
        if (error.response) {

            if (error.response.status === 401) {
                toast.error("Session expired. Please login again.");

                localStorage.removeItem("token");

                // setTimeout(() => {
                //     window.location.href = "/login";

                // }, 2000);
                // return; // ❌ STOP error here (no reject)

            } else {
                toast.error(error.response.data?.message || "Something went wrong");
            }

        } else {
            toast.error("Server not reachable");
        }

        return Promise.reject(error);
    }
);

// ✅ Wrapper
export default function ApiService({ url, method = 'GET', formData }) {
    return api({
        url,
        method,
        data: formData
    });
}