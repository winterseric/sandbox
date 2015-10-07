var express = require('express'),
    router = express.Router(),
    rest = require('restler-q'),
    apiUrl = 'http://localhost:3500';

/* GET all airguns */
router.get('/', function(req, res, next) {
    rest.get(apiUrl + '/v1/Airguns').then(function(result) {
        res.render('collections/airguns', {
            title: 'Airguns',
            airguns: result.airguns,
            apiUrl: apiUrl + '/v1/Airguns'
        });
    });
});

/* RENDER create airgun form */
router.get('/create', function(req, res, next) {
    res.render('collections/airgunsForm', {
        title: 'Create Airguns Form',
        formUrl: 'http://localhost:3000/collections/airguns/post',
        make: '',
        model: '',
        action: '',
        caliber: ''
    });
});

/* POST a airgun */
router.post('/post', function(req, res, next) {
    rest.post(apiUrl + '/v1/Airguns', {data: req.body}).then(function(result) {
        res.render('collections/airgunsConfirmation', {
            title: 'Create Confirmation',
            verb: 'created'
        });
    });
});

/* GET/RENDER update airgun form  */
router.get('/:id', function(req, res, next) {
    var getUrl = apiUrl + '/v1/Airguns/' + req.params.id;

    rest.get(getUrl).then(function(result) {
        var airgun = result.airguns;
        res.render('collections/airgunsForm', {
            title: 'Update Airguns Form',
            formUrl: 'http://localhost:3000/collections/airguns/update/' + req.params.id,
            make: airgun[0].make,
            model: airgun[0].model,
            action: airgun[0].caliber,
            caliber: airgun[0].action
        });
    });
});

/* PUT a airgun  */
router.post('/update/:id', function(req, res, next) {
    var putUrl = apiUrl + '/v1/Airguns/' + req.params.id;

    rest.put(putUrl, {data: req.body}).then(function(result) {
        res.render('collections/airgunsConfirmation', {
            title: 'Update Confirmation',
            verb: 'updated'
        });
    });
});

/* DELETE a airgun */
router.get('/delete/:id', function(req, res, next) {
    var deleteUrl = apiUrl + '/v1/Airguns/' + req.params.id;

    rest.del(deleteUrl).then(function(result) {
        res.render('collections/airgunsConfirmation', {
            title: 'Delete Confirmation',
            verb: 'deleted'
        });
    });
});

module.exports = router;