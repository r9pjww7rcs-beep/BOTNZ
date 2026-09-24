require("dotenv").config();

const { startBot } = require("./src/connection");

console.log("╭─ ⋆｡˚✩ NZstore Bot ✩˚｡⋆ ─╮");
console.log("Bot sedang dimulai...");

startBot();
