import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import usersRouter from './routes/users';
// import indexRouterV1 from './routes/index';
// Instantiate express
const app = express();
// initialize url version
app.use(express.json());
const baseUrl = '/api/v1';
// Configure app to user bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(`${baseUrl}/auth`, usersRouter);
// app.use(`${baseUrl}`, indexRouterV1);

// ERRROR HANDLING
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// Export our app for testing purposes
export default app;
