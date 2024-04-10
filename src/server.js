const express = require('express');
const app = express();
const bodyParser = require('body-parser');
require("dotenv/config");

const userRouter = require("./router");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/userapi', userRouter);

const port = 3000;

app.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur le port ${port}`);
});
