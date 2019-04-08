import express from 'express';
import morgan from 'morgan';
import usersRouter from './routes/users';
import indexRouterV1 from './routes/index';

const app = express();

const baseUrl = '/api/v1';

app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));

app.use(morgan('dev'));
app.use(`${baseUrl}/users`, usersRouter);
app.use(`${baseUrl}`, indexRouterV1);

// ERRROR HANDLING
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
export default app;
