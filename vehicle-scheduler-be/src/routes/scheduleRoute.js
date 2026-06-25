const express = require("express");
const router = express.Router();

const { generateSchedule } = require("../services/schedulerService");
const { getToken } = require("../services/authService");

router.get("/schedule", async (req, res) => {
    try {

        const token = await getToken();

        const schedules = await generateSchedule(token);

        res.status(200).json({
            success: true,
            data: schedules
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;