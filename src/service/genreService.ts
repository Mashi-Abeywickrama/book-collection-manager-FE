import axiosInstance from './api/axiosInstance';

export const fetchGenres = async () => {
    const response = await axiosInstance.get('/genre');
    return response.data;
};

export const addGenre = async (genreName: string) => {
    const response = await axiosInstance.post('/genre', { name: genreName });
    return response.data;
};
