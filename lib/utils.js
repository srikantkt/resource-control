'use strict';

var ArrayUtil = {

    isArray: function isArray(object) {
        if (object && object.constructor === Array) {
            return true;
        } else {
            return false;
        }
    },
    intersection: function intersection(array1, array2) {
        var resultArray = array1.filter(function(element) {
            return array2.indexOf(element) >= 0;
        });
        return resultArray;
    }
}

module.exports = ArrayUtil;