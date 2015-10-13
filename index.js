const dotenv = require('dotenv');
const express = require('express');
const app = express();

// load environment variables
dotenv.load();
const router = require('src/router');

// configure middlewares
app.use(express.static(process.env.SERVICE_PUBLIC_DIR));
app.use(router.routes());

// handle global errors
app.use(function handleGlobalErrors(req, res, error, next) {
  console.error(error);
  next();
});

// start server
const server = app.listen(process.env.SERVICE_SERVER_PORT, function handleServerInit() {
  const info = server.address();
  console.log(`The server started at : ${info.address}:${info.port}`);
});
