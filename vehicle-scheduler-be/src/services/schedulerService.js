const { getDepots } = require("./depotService");
const { getVehicles } = require("./vehicleService");
const { optimizeTasks } = require("../utils/optimizer");

async function generateSchedule(token) {

    const depots = await getDepots(token);

    const vehicles = await getVehicles(token);

    const schedules = depots.map(depot => {

        const result = optimizeTasks(
            vehicles,
            depot.MechanicHours
        );

        return {
            depotId: depot.ID,
            mechanicHours: depot.MechanicHours,
            totalDuration: result.totalDuration,
            totalImpact: result.totalImpact,
            selectedTasks: result.selectedTasks
        };
    });

    return schedules;
}

module.exports = { generateSchedule };