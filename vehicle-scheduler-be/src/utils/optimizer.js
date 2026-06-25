function optimizeTasks(tasks, capacity) {

    const sortedTasks = [...tasks].sort((a, b) => {
        return (b.Impact / b.Duration) - (a.Impact / a.Duration);
    });

    let usedHours = 0;
    let totalImpact = 0;

    const selectedTasks = [];

    for (const task of sortedTasks) {

        if (usedHours + task.Duration <= capacity) {

            selectedTasks.push(task);

            usedHours += task.Duration;

            totalImpact += task.Impact;
        }
    }

    return {
        selectedTasks,
        totalDuration: usedHours,
        totalImpact
    };
}

module.exports = { optimizeTasks };