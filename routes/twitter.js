/**
 * Created by Claas on 24.08.2015.
 */
var express = require('express');
var request = require('request');
var router = express.Router();

router.route('/:url')
    .get(function (req, res) {
        request.get(
            'http://cdn.api.twitter.com/1/urls/count.json?url=http://' + req.params.url,
            function (error, response, body) {
                if (!error && body) {
                    var obj = JSON.parse(body);
                    if (obj) {
                        res.send(obj.count + "");
                    } else {
                        res.send("-2");//TODO auf 0 ändern
                    }
                } else {
                    res.send("-3"); //TODO auf 0 ändern
                }
            });
    });
module.exports = router;