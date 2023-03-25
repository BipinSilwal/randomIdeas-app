const express = require('express');
const connectDB = require('./config/db.js');
const userRouter = require('./routes/user');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const port = process.env.PORT || 5000;

connectDB();

const app = express();

//static folder access

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//cors middleware;

app.use(
  cors({
    origin: ['http://localhost:5000', 'http://localhost:3000'],
    credentials: true,
  })
);

app.use('/api/ideas', userRouter);

app.listen(port, () => console.log(`Server listening on port : ${port}`));
