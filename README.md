# Raspberry Pi Temperature Monitor

This project provides a Node.js + Express application that monitors the temperature of a Raspberry Pi and exposes it via an HTTP endpoint. The temperature data is also formatted for Prometheus, allowing for easy monitoring.

## Features

- Monitor Raspberry Pi temperature.
- Expose temperature data via an HTTP endpoint.
- Format temperature data for Prometheus.

## Requirements

- Docker
- Docker Compose
- Raspberry Pi (or compatible device) with temperature sensor

## Getting Started

### Prerequisites

- Ensure Docker and Docker Compose are installed on your system.

### Clone the Repository

```bash
git clone https://github.com/akiojk/rpi-temperature-monitor.git
cd rpi-temperature-monitor
```

### Environment Variables

Create a `.env` file in the root of the project directory and set the following environment variables:

```
PORT=36363  #Port enabled on the host
INTERVAL=60000   #Temperature fetch interval in ms
```

### Docker Compose

Use Docker Compose to build and run the service.

```bash
docker compose up --build -d
```

### Accessing the Service

- **Temperature Endpoint:** `http://localhost:36363/temperature`
- **Prometheus Metrics Endpoint:** `http://localhost:36363/metrics`

## Usage

1. Make sure your Raspberry Pi temperature sensor is accessible at `/sys/class/thermal/thermal_zone0/temp`.
2. Start the service using Docker Compose:
   ```bash
   docker compose up --build -d
   ```
3. Use Prometheus to scrape the metrics from `http://localhost:36363/metrics`.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
