require("dotenv").config();

module.exports = {
    botName: process.env.BOT_NAME,
    owner: process.env.OWNER_NUMBER,
    prefix: process.env.PREFIX,
    database: process.env.DATABASE_NAME,

    admins: [
        process.env.OWNER_NUMBER
    ]
};
