const express = require('express');
const fs = require('fs');
const path = require('path');
const promClient = require('prom-client');

const app = express();
const PORT = 36363;
const TEMPERATURE_INTERVAL_MS = process.env.INTERVAL || 60000;
const TEMPERATURE_FILE_PATH = path.join(__dirname, 'temp');

const temperatureGauge = new promClient.Gauge({ name: 'rpi_temperature_celsius', help: 'Temperature of the Raspberry Pi in Celsius' });

// Function to read temperature
const getTemperature = () => {
  try {
    const tempRaw = fs.readFileSync(TEMPERATURE_FILE_PATH, 'utf8');
    // Temperature is usually reported as an integer in millidegrees Celsius
    const tempCelsius = parseFloat(tempRaw) / 1000.0;
    return tempCelsius.toFixed(2);
  } catch (err) {
    console.error('Error reading temperature:', err);
    return null;
  }
};

// Update Gauge at interval
setInterval(() => {
  const temperature = getTemperature();
  if (temperature) {
    temperatureGauge.set(parseFloat(temperature));
  }
}, TEMPERATURE_INTERVAL_MS);

// Prometheus metrics endpoint
app.get('/metrics', async(req, res) => {
  res.set('Content-Type', promClient.register.contentType);
  res.end(await promClient.register.metrics());
});

// Define the endpoint
app.get('/', (req, res) => {
  const temperature = getTemperature();
  if (temperature) {
    res.send(temperature);
  } else {
    res.status(500).send('Error reading temperature');
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Temperature server is running on http://localhost:${PORT}`);
});
