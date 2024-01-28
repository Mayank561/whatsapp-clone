import express from 'express';
import cors from 'cors'; 
import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import Connection from './Config/mongoose.js'; 
import Route from './routes/route.js';

dotenv.config();

const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/', Route);
Connection();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
