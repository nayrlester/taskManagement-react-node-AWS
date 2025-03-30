const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const serverless = require('serverless-http');
require('dotenv').config();
const connectDB = require('./config/mongoDb.js');
const taskRoutes = require('./routes/task.routes');

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); 

connectDB();
app.use('/tasks', taskRoutes);

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV === 'development') {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports.handler = serverless(app);
