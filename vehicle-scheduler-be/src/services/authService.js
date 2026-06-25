const axios = require("axios");

async function getToken() {
    const response = await axios.post(
        "http://4.224.186.213/evaluation-service/auth",
            {
                email:"sanazahera45@gmail.com",
                name:"Sana Zahera",
                rollNo:"23B01A45A0",
                accessCode:"ahXjvp",
                clientID:"3fffdd13-038f-4ad8-8b6f-0aeae9cd76b3",
                clientSecret:"ZXVYFRbtXQemvBEb"
            }
    );

    return response.data.access_token;
}

module.exports = { getToken };