var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/houses', function (req, res, next) {
  res.render('houses', { title: 'Houses page' });
  res.send('ok');
});

module.exports = router;
