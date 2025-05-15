export const commonPoint = process.env.REACT_APP_ENDPOINT;

export const getData = async (endPoint = "") => {
    try {
        const url = commonPoint + endPoint;

        const headers = {
            "Content-Type": "application/json"
        };

        const response = await fetch(url, {
            headers,
            method: "GET",
        });

        return response.json();
    } catch (error) {
        console.error("Error fetching data:");
    }
};

