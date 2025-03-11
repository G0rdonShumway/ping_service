require("dotenv").config();
const cron = require("node-cron");
const axios = require("axios");

const URL_ARRAY = process.env.URL_ARRAY ? process.env.URL_ARRAY.split(",") : [];

cron.schedule(
  "*/5 * * * *",
  async () => {
    for (const url of URL_ARRAY) {
      try {
        await axios.get(url);
        console.log(`Пинг отправлен на ${url}`);
      } catch (error) {
        console.error(`Ошибка пинга ${url}:`, error.message);
      }
    }
  },
  { scheduled: true, timezone: "Asia/Tbilisi" }
);
