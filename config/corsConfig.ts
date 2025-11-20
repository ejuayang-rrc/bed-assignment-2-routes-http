export const getCorsOptions = () => {
    const isDevelopment = process.env.NODE_ENV === "development";

    // Allow all origins in development for easy testing
    if (isDevelopment) {
        return {
            origin: "http://localhost",
            credentials: true,
        };
    }

    // Strict origins in production
    return {
        origin: process.env.ALLOWED_ORIGINS?.split(",") || [],
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    };
};
