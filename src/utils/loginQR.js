import axios from 'axios';
import QRCode from 'qrcode';

export const loginAndGenerateQR = async (email, password) => {
    try {
        const res = await axios.post(
            import.meta.env.VITE_API_URL + '/api/v1/auth/login',
            { email, password },
            { withCredentials: true }
        );

        // Save token and user info
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));

        // Generate QR code from user ID
        const qrData = res.data.user.id;
        const qrCodeUrl = await QRCode.toDataURL(qrData);

        return { success: true, message: res.data.message, qrCodeUrl };
    } catch (err) {
        if (err.response) {
            return { success: false, message: err.response.data.message };
        } else {
            return { success: false, message: 'Network error. Please try again later.' };
        }
    }
};
