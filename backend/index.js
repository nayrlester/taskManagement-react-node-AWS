const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require("dotenv").config();
const serverless = require('serverless-http');
const connectDB = require('./config/mongoDb.js');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const swaggerDocument = yaml.load(require("path").join(__dirname, "swagger.yml"));

const taskRoutes = require('./routes/task.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 

connectDB();

app.use('/swagger.yml', express.static(require('path').join(__dirname, 'swagger.yml')));

app.use('/tasks', taskRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports.handler = serverless(app);
