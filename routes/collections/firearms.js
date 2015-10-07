var express = require('express'),
    router = express.Router(),
    rest = require('restler-q'),
    apiUrl = 'http://localhost:3500';

/* GET all firearms */
router.get('/', function(req, res, next) {
    rest.get(apiUrl + '/v1/Firearms').then(function(result, err) {
        if(err) return console.error(err);
        res.render('collections/firearms', {
            title: 'Firearms',
            firearms: result.firearms,
            apiUrl: apiUrl + '/v1/Firearms'
        });
    });
});

/* RENDER create firearm form */
router.get('/create', function(req, res, next) {
    res.render('collections/firearmsForm', {
        title: 'Create Firearms Form',
        formUrl: 'http://localhost:3000/collections/firearms/post',
        make: '',
        model: '',
        action: '',
        caliber: ''
    });
});

/* POST a firearm */
router.post('/post', function(req, res, next) {
    rest.post(apiUrl + '/v1/Firearms', {data: req.body}).then(function(result) {
        res.render('collections/firearmsConfirmation', {
            title: 'Create Confirmation',
            verb: 'created'
        });
    });
});

/* GET/RENDER update firearm form  */
router.get('/:id', function(req, res, next) {
    var getUrl = apiUrl + '/v1/Firearms/' + req.params.id;

    rest.get(getUrl).then(function(result) {
        var firearm = result.firearms;
        res.render('collections/firearmsForm', {
            title: 'Update Firearms Form',
            formUrl: 'http://localhost:3000/collections/firearms/update/' + req.params.id,
            make: firearm[0].make,
            model: firearm[0].model,
            action: firearm[0].caliber,
            caliber: firearm[0].action
        });
    });
});

/* PUT a firearm  */
router.post('/update/:id', function(req, res, next) {
    var putUrl = apiUrl + '/v1/Firearms/' + req.params.id;

    rest.put(putUrl, {data: req.body}).then(function(result) {
        res.render('collections/firearmsConfirmation', {
            title: 'Update Confirmation',
            verb: 'updated'
        });
    });
});

/* DELETE a firearm */
router.get('/delete/:id', function(req, res, next) {
    var deleteUrl = apiUrl + '/v1/Firearms/' + req.params.id;

    rest.del(deleteUrl).then(function(result) {
        res.render('collections/firearmsConfirmation', {
            title: 'Delete Confirmation',
            verb: 'deleted'
        });
    });
});

module.exports = router;