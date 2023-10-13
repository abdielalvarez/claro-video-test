const API_BASE_URL = 'https://mfwkweb-api.clarovideo.net';

const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return response.json();
};

export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`);
    return handleResponse(response);
  } catch (error) {
    throw error;
  }
};
