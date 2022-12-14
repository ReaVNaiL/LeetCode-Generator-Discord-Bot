const express = require('express');
const app = express();

const settings = require('./config/api-settings.json');
const PORT = settings.port;

const problemRoutes = require('./api/routes/problems');

// Simple Logger
let currTime = new Date().toLocaleString();
app.use((req, res, next) => {
    console.log(
        `[${currTime}]: [${req.method}] http://localhost:50520${req.url} | Domain: "${req.hostname}" | IP: "${req.ip}`
    );
    next();
});

// Routes Configuration
app.use('/problems', problemRoutes);

app.listen(PORT, () =>
    console.log(`Server listening on http://localhost:${PORT}/`)
);
