export default async function ApiService({ url, method = 'GET', formData }) {
    const base_url = 'http://localhost:3000';

    try {
        const response = await fetch(`${base_url}${url}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: formData ? JSON.stringify(formData) : null,
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'API Error');
        }

        return result;
    } catch (error) {
        console.error('API ERROR:', error.message);
        throw error;
    }
}