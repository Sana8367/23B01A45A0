const axios = require("axios");

async function getNotifications(token) {

    const response = await axios.get(
        "http://4.224.186.213/evaluation-service/notifications",
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data.notifications;
}

module.exports = { getNotifications };