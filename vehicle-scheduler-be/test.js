const { getToken } = require("./src/services/authService");
const { generateSchedule } = require("./src/services/schedulerService");

async function test() {
    try {
        const token = await getToken();

        console.log("Token received");

        const result = await generateSchedule(token);

        console.log(result);
    } catch (error) {
        console.log(error.response?.data || error.message);
    }
}

test();