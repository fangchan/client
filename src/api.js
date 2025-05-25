import axios from 'axios';

const API_URL = 'http://localhost:5000';

// 登录请求
export const login = async (username, password) => {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data; // 返回 token、username 和 role
};

// 登出请求（如果需要）
export const logout = () => {
    // 这里可以添加任何需要的登出逻辑，例如清理状态
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');
    localStorage.removeItem('role');
    localStorage.removeItem('token'); // 移除 token
};