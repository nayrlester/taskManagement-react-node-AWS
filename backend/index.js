const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const serverless = require('serverless-http');
const taskRoutes = require('./routes/task.routes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/tasks', taskRoutes);

module.exports = app;

const PORT = process.env.PORT || 3000;
if (process.env.NODE_ENV === 'development') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports.handler = serverless(app);