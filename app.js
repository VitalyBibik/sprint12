require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const app = express();
const mongoose = require('mongoose');
const helmet = require('helmet');

const { requestLogger, errorLogger } = require('./middleware/logger');
const { PORT, DATABASE_URL } = require('./config');

const ErrorHandler = require('./middleware/ErrorHandler');

const NotValidUrl = require('./NotValidUrl');
const { limiter } = require('./limiter');

mongoose.connect(DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});


app.use(requestLogger);
app.use(limiter);
app.use(helmet());

app.use('/', userRoutes);
app.use('/', cardRoutes);
app.use('*', NotValidUrl);
app.use('/', ErrorHandler);

app.use(errors());
app.use(errorLogger);


app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
