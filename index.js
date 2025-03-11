require("dotenv").config();
const express = require("express");
const cron = require("node-cron");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 3000;
const URL_ARRAY = process.env.URL_ARRAY ? process.env.URL_ARRAY.split(",") : [];

app.get("/", (req, res) => {
  res.send("Cron job is running...");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

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
