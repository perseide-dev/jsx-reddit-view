import axios from 'axios'

export const postRegisterService = async (formData) => {
    try {
        const response = await axios.post('/api/register', formData)
        return response.data
    } catch (error) {
        throw error.response.data
    }
}

export const postLoginService = async (formData) => {
    try {
        const response = await axios.post('/api/login', formData)
        return response.data
    } catch (error) {
        throw error.response.data
    }
}