const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
const data = require("./data/weather.json");

app.get("/", (_, response) => response.json("Root route."));

app.get("/weather", async (request, response) => {
  const lat = request.query.lat;
  const lon = request.query.lon;
  //const searchQuery = request.query.searchQuery;
  const API = `https://api.weatherbit.io/v2.0/current?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`;
  const res = await axios.get(API);
  const weatherData = res.data.data.map((place) => {
    return {
      description: place.weather.description,
      date: place.datetime,
      temp: place.temp,
    };
  });
  response.json(weatherData);
  /* const filteredCity = data.find((city) => {
    return (
      city.city_name === searchQuery //&& city.lat === lat && city.lon === lon
    );
  });

  const wrangledData = filteredCity.data.map((day) => {
    return {
      description: day.weather.description,
      date: day.datetime,
    };
  });

  response.json(wrangledData); */
});

app.listen(PORT, () => console.log(`App is running in PORT: ${PORT}`));
