import axiosInstance from '../api/axiosInstance';

export const login = async (email: string, password: string) => {
    const response = await axiosInstance.post(`/login`, { email, password });
    return response.data;
};
