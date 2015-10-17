module.exports = function printErrorAndExit(error, res) {
  console.log(error);
  res.redirect('/error');
};
