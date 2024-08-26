import { hashPassword } from '../../utils/hashPassword';
import axiosInstance from '../api/axiosInstance';

export const signup = async (
    username: string,
    email: string,
    password: string
) => {
    password = await hashPassword(password);
    const response = await axiosInstance.post(`/register`, {
        username,
        email,
        password,
    });
    return response.data;
};
