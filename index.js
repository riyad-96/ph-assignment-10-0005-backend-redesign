// External modules
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Local modules
const indexRouter = require('./src/routes/indexRoutes');
const { establishDBConnection } = require('./src/db/establishConnection');

const app = express();

// Middlewares

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());

// Route
app.use(indexRouter);

// database connection
const PORT = process.env.PORT || 3000;

establishDBConnection((err) => {
  if (err) return console.error(err);

  app.listen(PORT, () => {
    console.log('Server started');
  });
});
