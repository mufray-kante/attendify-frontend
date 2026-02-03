import axios from 'axios';

export const loginUser = async (email, password) => {
  try {
    const res = await axios.post(
      import.meta.env.VITE_API_URL + '/api/v1/auth/login',
      { email, password },
      { withCredentials: true }
    );
    localStorage.setItem('token', res.data.token);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    return { success: true, message: res.data.message };
  } catch (err) {
    if (err.response) {
      return { success: false, message: err.response.data.message };
    } else {
      return { success: false, message: 'Network error. Please try again later.' };
    }
  }
};
