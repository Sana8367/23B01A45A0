const { getToken } = require("./services/authService");
const { getNotifications } = require("./services/notificationService");

const weights = {
    Placement: 3,
    Result: 2,
    Event: 1
};

function calculateScore(notification) {

    const weight = weights[notification.Type] || 0;

    const timestamp =
        new Date(notification.Timestamp).getTime();

    return (weight * 1000000000000) + timestamp;
}

async function main() {

    try {

        const token = await getToken();

        const notifications =
            await getNotifications(token);

        const rankedNotifications =
            notifications
                .map(notification => ({
                    ...notification,
                    score: calculateScore(notification)
                }))
                .sort((a, b) => b.score - a.score);

        const top10 =
            rankedNotifications.slice(0, 10);

        console.log("\nTOP 10 PRIORITY NOTIFICATIONS\n");

        top10.forEach((notification, index) => {

            console.log(
                `${index + 1}. ${notification.Type}`
            );

            console.log(
                `Message: ${notification.Message}`
            );

            console.log(
                `Time: ${notification.Timestamp}`
            );

            console.log(
                `Score: ${notification.score}`
            );

            console.log(
                "--------------------------------"
            );
        });

    } catch (error) {

        console.error(
            error.response?.data || error.message
        );
    }
}

main();