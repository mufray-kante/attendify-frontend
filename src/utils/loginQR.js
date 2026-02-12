import api from "../services/api";
import QRCode from "qrcode";

/**
 * Login user and generate QR
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{success:boolean, message:string, qrCodeUrl?:string, user?:object, type?:string}>}
 */
export const loginAndGenerateQR = async (email, password) => {
    try {
        const response = await api.post("/auth/login", { email, password });

        const { token, user, message } = response.data;

        if (!token || !user) {
            return {
                success: false,
                type: "error",
                message: "Invalid server response."
            };
        }

        // Persist auth safely
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // Generate QR from unique identifier
        const qrPayload = `${user.id}|${user.role}`;
        const qrCodeUrl = await QRCode.toDataURL(qrPayload);

        return {
            success: true,
            message: message || "Login successful",
            qrCodeUrl,
            user
        };

    } catch (error) {

        if (error.response) {
            const status = error.response.status;
            const backendMessage = error.response.data?.message;

            if (status === 429) {
                return {
                    success: false,
                    type: "warning",
                    message:
                        backendMessage ||
                        "Too many login attempts. Please wait before trying again."
                };
            }

            if (status === 401) {
                return {
                    success: false,
                    type: "error",
                    message: "Invalid email or password."
                };
            }

            return {
                success: false,
                type: "error",
                message: backendMessage || "Login failed."
            };
        }

        return {
            success: false,
            type: "error",
            message: "Cannot connect to server. Check your connection."
        };
    }
};