const express = require('express');

const { PORT = 3000 } = process.env;
const app = express();
const userRoutes = require('./routes/users');
const cardRoutes = require('./routes/cards');

app.use(express.static(`${__dirname}/public`));


app.use('/', userRoutes);
app.use('/', cardRoutes);


app.get('*', (req, res) => {
  res.status(404).json({ message: 'Запрашиваемый ресурс не найден' });
});


app.listen(PORT, () => {
  console.log('Взлетаю без падения');
});
