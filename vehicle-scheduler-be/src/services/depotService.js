const axios = require("axios");

async function getDepots(token) {
    try {

        const response = await axios.get(
            "http://4.224.186.213/evaluation-service/depots",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data.depots;
    } catch (error) {
        throw error;
    }
}

module.exports = { getDepots };