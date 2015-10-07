var express = require('express'),
    router = express.Router(),
    rest = require('restler-q'),
    apiUrl = 'http://localhost:3500/v1/Movies';

/* GET all movies */
router.get('/', function(req, res, next) {
    rest.get(apiUrl).then(function(result) {
        res.render('collections/movies', {
            title: 'Movies',
            movies: result.movies,
            apiUrl: apiUrl
        });
    });
});

/* RENDER create movie form */
router.get('/create', function(req, res, next) {
    res.render('collections/moviesForm', {
        title: 'Create Movies Form',
        formUrl: 'http://localhost:3000/collections/movies/post',
        movieTitle: '',
        genre: '',
        rating: '',
        runningTime: '',
        review: ''
    });
});

/* POST a movie */
router.post('/post', function(req, res, next) {
    rest.post(apiUrl, {data: req.body}).then(function(result) {
        res.render('collections/moviesConfirmation', {
            title: 'Create Confirmation',
            verb: 'created'
        });
    });
});

/* GET/RENDER update movie form  */
router.get('/:id', function(req, res, next) {
    var getUrl = apiUrl + '/' + req.params.id;

    rest.get(getUrl).then(function(result) {
        var movie = result.movies;
        res.render('collections/moviesForm', {
            title: 'Update Movies Form',
            formUrl: 'http://localhost:3000/collections/movies/update/' + req.params.id,
            movieTitle: movie[0].title,
            genre: movie[0].genre,
            rating: movie[0].rating,
            runningTime: movie[0].runningTime,
            review: movie[0].review
        });
    });
});

/* PUT a movie  */
router.post('/update/:id', function(req, res, next) {
    var putUrl = apiUrl + '/' + req.params.id;

    rest.put(putUrl, {data: req.body}).then(function(result) {
        res.render('collections/moviesConfirmation', {
            title: 'Update Confirmation',
            verb: 'updated'
        });
    });
});

/* DELETE a movie */
router.get('/delete/:id', function(req, res, next) {
    var deleteUrl = apiUrl + '/' + req.params.id;

    rest.del(deleteUrl).then(function(result) {
        res.render('collections/moviesConfirmation', {
            title: 'Delete Confirmation',
            verb: 'deleted'
        });
    });
});

module.exports = router;