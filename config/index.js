const config = () => ({
    headers: {
        "Content-Type": "application/json",
        "x-api-key": localStorage.getItem("apiKey"),
    },
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
});

export default config;
