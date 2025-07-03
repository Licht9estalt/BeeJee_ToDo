const express = require('express');
const expressWinston = require('express-winston');
const winston = require('winston');
const path = require('path');
const cors = require('cors');
const todoRouter = require('./routes/todos');

const logFolderPath = path.resolve(__dirname, 'logs')

const app = express();

app.use(cors());
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.File({filename: path.resolve(logFolderPath, 'errors.log')})
  ]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/todos', todoRouter);

module.exports = app;
