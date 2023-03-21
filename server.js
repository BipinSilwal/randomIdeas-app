const express = require('express');
const connectDB = require('./config/db.js');
const userRouter = require('./routes/user');
const path = require('path');
require('dotenv').config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

//static folder access

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/user', userRouter);

app.listen(port, () => console.log(`Server listening on port : ${port}`));
