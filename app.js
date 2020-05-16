const express = require('express');
const bodyParser = require('body-parser');
const { PORT = 3000 } = process.env;
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/db', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});



const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = {
    _id: '5ebe84fa30240105b4680687' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };
  next();
});
app.use('/', userRoutes);
app.use('/', cardRoutes);



app.all('*', (req, res) => {
  res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
});


app.listen(PORT, () => {
  console.log('Взлетаю без падения', );
});
