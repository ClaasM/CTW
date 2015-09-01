/**
 * Created by Claas on 24.08.2015.
 */
var express = require('express');
var request = require('request');
var router = express.Router();

router.route('/:url')
    .get(function (req, res) {
        request.get(
            'https://plusone.google.com/_/+1/fastbutton?url=http://' + req.params.url,
            function (error, response, body) {
                if (!error && body) {
                    var shareCount = body.split("<div id=\"aggregateCount\" class=\"Oy\">")[1];
                    if(shareCount){
                        shareCount = shareCount.split("</div>")[0];
                        res.send(shareCount + "");
                    } else {
                        res.send("-2");//TODO auf 0 �ndern
                    }
                } else {
                    res.send("-3"); //TODO auf 0 �ndern
                }
            });
    });

module.exports = router;