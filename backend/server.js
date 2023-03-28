const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const fetch = require("node-fetch");

const app = express();
app.use(express.json());
app.use(cors());

const uri =
  "mongodb+srv://klirowskis:sdfsdgsdfsdf@researchcluster.jwsaica.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.post("/weather", async (req, res) => {
  try {
    const city = req.body.city;
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=sgsdjfhsilab263823b&units=metric`
    );

    if (!response.ok) {
      throw new Error("Error fetching city data from OpenWeatherMap");
    }

    const weatherData = await response.json();
    const cityWeather = {
      name: weatherData.name,
      temperature: weatherData.main.temp,
    };

    const collection = client.db("weather_app").collection("cities");
    await collection.insertOne(cityWeather);

    res.status(201).json(cityWeather);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get("/weather", async (req, res) => {
  try {
    const collection = client.db("weather_app").collection("cities");
    const cities = await collection.find().toArray();
    res.json(cities);
  } catch (error) {
    res.status(500).json({ error: "Error fetching cities from the database" });
  }
});

client
  .connect()
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => {
      console.log("Server listening on port 3000");
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
