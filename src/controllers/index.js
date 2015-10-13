module.exports = function IndexController(router) {
  router.get('/', function handleIndex(req, res) {
    res.render('index.html');
  });

  return ['/', router];
};
