const { formatDistance } = require("date-fns");

function parseMessages(messages){
    const currentDate = new Date();
    const parsed = messages.map((message) => ({
        ...message,
        added: formatDistance(currentDate, message.added) + " ago"
    }));

    return parsed;
}

module.exports = {parseMessages};