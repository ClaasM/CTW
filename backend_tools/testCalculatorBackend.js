/**
 * Created by Claas on 14.08.2015.
 */
/**
 * Created by Claas on 12.08.2015.
 */

var validate = function (first, second) {
    /*Hier muss normalerweise noch überprüft werden ob values alle passend sind, ansonsten exception werfen*/
    return true;
};

var calculate = function (first, second) {
    //Bei API calls kommt die gesamte response vom Server!


    if (validate(first, second)) {

        var result;

        //Do calculations
        result = first * second;

        return {
            result: result,
            err: "OK"
        };

    } else {
        return {
            result: NaN,
            err: "Bad Input"
        };
    }


};

module.exports = calculate;
