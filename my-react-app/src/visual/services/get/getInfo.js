import api from '../../../apis/api';

export async function getInfo() {
    try {
        const response = await api.get('/');
        console.log(response.data);
        return response.data;
    } catch (error) {
        return { error: error.message };
    }
}