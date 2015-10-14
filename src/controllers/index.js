module.exports = function IndexController(router) {
  const application = {
    year: (new Date()).getFullYear()
  };

  router.get('/', function handleIndex(req, res) {
    res.render('index.html', application);
  });

  router.get('/home', function handleHome(req, res) {
    res.render('index.html', application);
  });

  return ['/', router];
};
