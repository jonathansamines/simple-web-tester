const dotenv = require('dotenv');
const express = require('express');
const enverify = require('require-environment-variables');
const nunjucks = require('nunjucks');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const local = require('src/services/authentication/strategy');
const serializer = require('src/services/authentication/serializer');
const flash = require('connect-flash');
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

// view engine
nunjucks.configure('src/views', {
  autoscape: true,
  express: app
});

// session
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(session({
  secret: 'TESTER_UMG_KEY',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 60000
  }
}));

passport.use(local);
passport.serializeUser(serializer.serialize);
passport.deserializeUser(serializer.deserialize);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function attachSessionToLocal(req, res, next) {
  res.locals.session = req.session;
  res.locals.user = req.user;
  next();
});

require('src/database');

// routes
router.routes().forEach(function mapRouteController(controller) {
  /* eslint-disable new-cap */
  const route = controller(express.Router());
  app.use(route[0], route[1]);
});

// handle global errors
/* eslint-disable no-unused-vars */
app.use(function handleGlobalErrors(error, req, res, next) {
  console.error(error.stack);
  res.redirect('/error');
});

// start server
const server = app.listen(process.env.SERVICE_SERVER_PORT, function handleServerInit() {
  const info = server.address();
  console.log(`The server started at : http://localhost:${info.port}`);
});
