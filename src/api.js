// api.js

const API_BASE_URL = 'http://localhost:5000'; 

const api = {
  // Define  API endpoints and methods here
  registerAstrologer: async (astrologerData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/astrologers/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(astrologerData),
      });

      if (!response.ok) {
        throw new Error('Failed to register astrologer');
      }

      return response.json();
    } catch (error) {
      throw new Error('Failed to register astrologer: ' + error.message);
    }
  },

  // Method to fetch astrologers data
  fetchAstrologers: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/astrologers`,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }); 
      
      if (!response.ok) {
        throw new Error('Failed to fetch astrologers');
      }
      return response.json();
    } catch (error) {
      throw new Error('Failed to fetch astrologers: ' + error.message);
    }
  },

  // Method to update astrologer information
  updateAstrologer: async (id, astrologerData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/astrologers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(astrologerData),
      });

      if (!response.ok) {
        throw new Error('Failed to update astrologer');
      }

      return response.json();
    } catch (error) {
      throw new Error('Failed to update astrologer: ' + error.message);
    }
  },
  
  // Add more API methods as needed
};

export default api;
