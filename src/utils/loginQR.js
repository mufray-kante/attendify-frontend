import api from "../services/api";
import QRCode from "qrcode";

export const loginAndGenerateQR = async (email, password) => {
    try {
        const res = await api.post("/auth/login", { email, password });

        // Save auth info
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        // Generate QR from user ID
        const qrData = res.data.user.id;
        const qrCodeUrl = await QRCode.toDataURL(qrData);

        return {
            success: true,
            message: res.data.message || "Login successful",
            qrCodeUrl,
        };

    } catch (err) {
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

        return {
            success: false,
            type: "error",
            message: "Cannot connect to server. Check your internet connection.",
        };
    }
};
