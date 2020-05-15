const express = require('express');
// СДелать карточки доп задания и разобраться с ошибкой при создании юзера
const { PORT = 3000 } = process.env;
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/db', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});



const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');

app.use(express.static(`${__dirname}/public`));


app.use('/', userRoutes);
app.use('/', cardRoutes);



app.all('*', (req, res) => {
  res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
});


app.listen(PORT, () => {
  console.log('Взлетаю без падения', );
});
