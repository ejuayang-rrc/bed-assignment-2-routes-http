import helmet from "helmet";

export const getHelmetConfig = () => {
    const isDevelopment = process.env.NODE_ENV === "development";

    if (isDevelopment) {
        return helmet({
            contentSecurityPolicy: false,
            hsts: false,
        });
    }

    // Production configuration optimized for APIs
    return helmet({
        // Disable CSP for API-only applications
        contentSecurityPolicy: false,

        // Keep essential security headers
        hsts: {
            maxAge: 31536000,
            includeSubDomains: true,
            preload: true,
        },

        // Hide server technology information
        hidePoweredBy: true,

        // Prevent MIME type sniffing
        noSniff: true,

        // Set referrer policy for API responses
        referrerPolicy: { policy: "no-referrer" },

        // Prevent clickjacking
        frameguard: { action: "deny" },
    });
};
