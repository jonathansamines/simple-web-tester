const dotenv = require('dotenv');
const express = require('express');
const enverify = require('require-environment-variables');
const app = express();

// load environment variables
dotenv.load();

// verify if all environment variables needed are present
enverify([
  'NODE_ENV',
  'NODE_PATH',
  'SERVICE_SERVER_PORT',
  'SERVICE_PUBLIC_DIR',
  'SERVICE_CONTROLLER_DIR'
]);

const router = require('src/router');

// configure middlewares
app.use(express.static(process.env.SERVICE_PUBLIC_DIR));
router.routes().forEach(function mapRouteController(controller) {
  /* eslint-disable new-cap */
  const route = controller(express.Router());
  app.use(route[0], route[1]);
});

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
