export {};
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const middleware = require('./middleware');
const routers = require('./routes');

const app = express()
const PORT = process.env.port || 8020;
const API_VERSION = process.env.version || '0.0.0';

const { notFound, errorHandler, stream } = middleware;
const { authRouter, healthRouter, metadataRouter } = routers;

app.use(cors());
app.use(express.json());
app.use(morgan('combined', { stream }));
app.use(`/api/v${API_VERSION}/health`, healthRouter);
app.use(`/api/v${API_VERSION}/auth`, authRouter);
app.use(`/api/v${API_VERSION}/query`, metadataRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => 
    console.log(`Metadata API v${API_VERSION} started on port ${PORT}`)
)




