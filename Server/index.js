import express from 'express';
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const Connection = require('./Config/mongoose.js');
const Route = require('./routes/route.js');

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
