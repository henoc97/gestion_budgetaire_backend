const express = require('express');
const bodyParser = require('body-parser');

const app = express();


const userRouter = require("./router");



app.use('/userapi', userRouter);
app.use(express.json());
app.use(bodyParser.json());

module.exports = app