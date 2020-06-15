require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const app = express();
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

const { requestLogger, errorLogger } = require('./middleware/logger');
const { PORT, DATABASE_URL } = require('./config');
const ErrorHandler = require('./errors/ErrorHandler');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // за 15 минут
  max: 10000, // можно совершить максимум 10000 запросов с одного IP
});

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
app.use('/', ErrorHandler);

app.use(errors());
app.use(errorLogger);


app.all('*', (req, res) => {
  res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
});


app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
