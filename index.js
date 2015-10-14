const dotenv = require('dotenv');
const express = require('express');
const enverify = require('require-environment-variables');
const nunjucks = require('nunjucks');
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
// public dir
app.use('/public', express.static(__dirname + process.env.SERVICE_PUBLIC_DIR));

// routes
router.routes().forEach(function mapRouteController(controller) {
  /* eslint-disable new-cap */
  const route = controller(express.Router());
  app.use(route[0], route[1]);
});

// view engine
nunjucks.configure('src/views', {
  autoscape: true,
  express: app
});

// handle global errors
app.use(function handleGlobalErrors(req, res, error, next) {
  console.error(error);
  next();
});

// start server
const server = app.listen(process.env.SERVICE_SERVER_PORT, function handleServerInit() {
  const info = server.address();
  console.log(`The server started at : http://localhost:${info.port}`);
});
