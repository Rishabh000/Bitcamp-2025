const API_BASE_URL = 'http://localhost:5000';

const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Something went wrong');
    }
    return response.json();
};

const getHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };
};

export const api = {
    // Authentication
    login: async (email, password) => {
        const response = await fetch(`${API_BASE_URL}/api/login`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify({ email, password }),
            credentials: 'include'
        });
        return handleResponse(response);
    },

    register: async (userData) => {
        const response = await fetch(`${API_BASE_URL}/api/register`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(userData),
            credentials: 'include'
        });
        return handleResponse(response);
    },

    checkAuth: async () => {
        const response = await fetch(`${API_BASE_URL}/api/check-auth`, {
            headers: getHeaders(),
            credentials: 'include'
        });
        return handleResponse(response);
    },

    logout: async () => {
        const response = await fetch(`${API_BASE_URL}/api/logout`, {
            method: 'POST',
            headers: getHeaders(),
            credentials: 'include'
        });
        return handleResponse(response);
    },

    // Student Routes
    getStudentProfile: async () => {
        const response = await fetch(`${API_BASE_URL}/api/student/profile`, {
            headers: getHeaders(),
            credentials: 'include'
        });
        return handleResponse(response);
    },

    updateStudentProfile: async (profileData) => {
        const response = await fetch(`${API_BASE_URL}/api/student/profile`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(profileData),
            credentials: 'include'
        });
        return handleResponse(response);
    },

    // Professor Routes
    getProfessorPortal: async () => {
        const response = await fetch(`${API_BASE_URL}/api/professor/portal`, {
            headers: getHeaders(),
            credentials: 'include'
        });
        return handleResponse(response);
    },

    updateProfessorProfile: async (profileData) => {
        const response = await fetch(`${API_BASE_URL}/api/professor/profile`, {
            method: 'PUT',
            headers: getHeaders(),
            body: JSON.stringify(profileData),
            credentials: 'include'
        });
        return handleResponse(response);
    },

    // Match Routes
    getMatches: async () => {
        const response = await fetch(`${API_BASE_URL}/api/matches`, {
            headers: getHeaders(),
            credentials: 'include'
        });
        return handleResponse(response);
    },
}; 