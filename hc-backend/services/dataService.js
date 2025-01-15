const axios = require('axios');
const postData = async (url, data, headers) => {
    try {
        const response = await axios.post(url, data, headers);
        return response.data
    } catch (error) {
        return { error: true, message: error.message, status: error.status}
    }
};

const getData = async (url, headers) => {
    try {
        const response = await axios.get(url, headers);
        return response.data
    } catch (error) {
        return { error: true, message: error.message, status: error.status}
    }
};
module.exports = { postData, getData }