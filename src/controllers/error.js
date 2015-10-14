module.exports = function ErrorController(router) {
  router.get('/error', function handleError(req, res) {
    res.render('error.html');
  });

  return ['/', router];
};
