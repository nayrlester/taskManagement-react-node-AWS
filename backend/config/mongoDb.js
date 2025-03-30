const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/taskManagementDB';

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB Connected Successfully");
    } catch (err) {
        console.error("MongoDB Connection Error:", err);
        process.exit(1);
    }
};

module.exports = connectDB;