require("dotenv").config();

const express = require("express");
const cors = require("cors");
const PORT = process.env.PORT || 8080;
const app = express();
const data = require("./Data/weather.json");

app.use(cors());

app.get("/", (req, res) => {
  return res.json("Home page");
});

app.get("/weather", (req, res) => {
  const searchLat = req.query.lat;
  const searchLon = req.query.lon;

  const weatherFilter = data.filter((city) => {
    console.log(city.lat);
    return searchLat === city.lat && searchLon === city.lon;
  });

  console.log(weatherFilter);
});

app.listen(PORT, () => console.log(`App is running in PORT: ${PORT}`));
