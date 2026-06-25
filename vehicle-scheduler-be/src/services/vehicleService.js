const axios = require("axios");

async function getVehicles(token) {
    try {
        const response = await axios.get(
            "http://4.224.186.213/evaluation-service/vehicles",
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        return response.data.vehicles;
    } catch (error) {
        throw error;
    }
}

module.exports = { getVehicles };