import axios from 'axios';

const dataService = {
  getData: async (endpoint) => {
    try {
      const response = await axios.get(endpoint);
      return response.data;
    } catch (error) {
      console.log('Error fetching data:', error);
      throw error;
    }
  },

  postData: async (url, data, headers ={}) => {
    const defaultHeaders = {
      ...headers,
    };
    
    try {
      const response = await axios.post(url, data, { headers: defaultHeaders });
      return response.data;
    } catch (error) {
      return error?.response?.data || { customMessage : 'Something went wrong!'}
    }
  }
};

export default dataService;
