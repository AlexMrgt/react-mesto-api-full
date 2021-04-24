const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { errors } = require('celebrate');


const { requestLogger, errorLogger } = require('./middlewares/Logger');

const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const { login, createUser, logOut } = require('./controllers/users');

const { registrationValidator, loginValidator } = require('./middlewares/celebrateValidation');
const auth = require('./middlewares/auth');

const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  autoIndex: true,
})
  .catch((err) => {
    console.log(err);
  });

app.use(requestLogger);

const whiteCors = [
  'http://mesto.practikum.nomoredomains.club',
  'https://apimesto.practikum.nomoredomains.club',
  'http://localhost:3001',
]

app.use(cors({
  origin: whiteCors,
  credentials: true,
}));

app.post('/signup',
  registrationValidator,
  createUser);

app.post('/signin',
  loginValidator,
  login);

app.delete('/logout', logOut);

app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);



app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден :['));
});

app.use(errorLogger);

app.use(errors());

app.use((err, _, res, next) => {
  const { statusCode = 500, message } = err;

  if (err.kind === 'ObjectId') {
    res.status(400).send({ message: 'Неверный формат данных' });
  } else {
    res.status(statusCode).send({ message: statusCode === 500 ? 'Server ERROr' : message });
  }
  next();
});

app.listen(PORT, () => {
  console.log('app has been started successfully');
});
