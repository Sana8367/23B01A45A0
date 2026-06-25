const express = require("express");

const scheduleRoute = require("./src/routes/scheduleRoute");

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
    res.json({
        status: "running"
    });
});

app.use("/api", scheduleRoute);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});