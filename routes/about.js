var express = require('express'),
    router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('about', {
        title: 'About',
        name: 'Eric'
    });
});

module.exports = router;