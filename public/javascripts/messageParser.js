const { formatDistance } = require("date-fns");

function parseMessages(messages){
    const currentDate = new Date();
    const parsed = messages.map((message) => ({
        ...message,
        date: formatDistance(currentDate, message.date) + " ago"
    }));

    return parsed;
}

module.exports = {parseMessages};