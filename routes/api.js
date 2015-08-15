/**
 * Created by Claas on 12.08.2015.
 */
var express = require('express');
var router = express.Router();


//Hier Alle Tools einlesen aus Tools-json
var available = null;


//ERST schauen ob es ein Backend Tool ist und wenn nicht das ganze aus dem Frontend Ordner laden
router.route('/:name')

    .post(function (req, res) {

        var response;
        try {
            var tool = require("./../backend_tools/javascripts/" + req.params.name);
            response = tool.calculate(req.body.values);
        } catch (e) {
            response = {
                result: NaN,
                err: "Bad API call"
            };
        }
        res.send(response);
    });


module.exports = router;