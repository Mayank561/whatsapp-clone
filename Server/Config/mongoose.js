import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const Connection = async () => {
    const URL = process.env.DB_URL;

    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("MongoDB connected successfully");

        // Additional log statements
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        db.once('open', () => {
            console.log("MongoDB connection is open");
        });
    } catch (error) {
        console.error("Error while connecting with MongoDB", error.message);
    }
};

export default Connection;
