import api from "../services/api"; // Axios instance pointing to your backend
import QRCode from "qrcode";

/**
 * Logs in a user, saves auth info, generates QR code, and returns role info.
 * @param {string} email
 * @param {string} password
 * @returns {Object} { success, message, qrCodeUrl, role }
 */
export const loginAndGenerateQR = async (email, password) => {
    try {
        const res = await api.post("/auth/login", { email, password });

        // Save auth info in localStorage
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // Generate QR code from user ID
        const qrData = res.data.user.id;
        const qrCodeUrl = await QRCode.toDataURL(qrData);

        // Return success, QR code, and role for redirects
        return {
            success: true,
            message: res.data.message || "Login successful",
            qrCodeUrl,
            role: res.data.user.role,
        };
    } catch (err) {
        // Handle backend responses
        if (err.response) {
            const status = err.response.status;
            const backendMessage = err.response.data?.message;

            if (status === 429) {
                return {
                    success: false,
                    type: "warning",
                    message:
                        backendMessage ||
                        "Too many login attempts. Please wait a few minutes and try again.",
                };
            }

            if (status === 401) {
                return {
                    success: false,
                    type: "error",
                    message: "Invalid email or password.",
                };
            }

            return {
                success: false,
                type: "error",
                message: backendMessage || "Login failed. Please try again.",
            };
        }

        // Handle network / server errors
        return {
            success: false,
            type: "error",
            message: "Cannot connect to server. Check your internet connection.",
        };
    }
};