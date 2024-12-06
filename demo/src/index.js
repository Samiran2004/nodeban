const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');


const app = express();
const server = http.createServer(app);


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// const apiRouter = require('./route/apiRoute');
// app.use('/api', apiRouter);

const port = process.env.PORT;
const dbDriver = process.env.DBSTRING


let option = {
  auth: {
    username: '',
    password: '',
  },
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(dbDriver, option)
  .then(result => {
    server.listen(port, () => {
      console.log("Server running on port: http://localhost:");
      console.log('Database connected');
    });
  })
  .catch(error => {
    console.error('Error connecting to database:', error);
  });

