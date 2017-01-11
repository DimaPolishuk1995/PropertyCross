'use strict';

propertyCrossApp
    .factory('GetArray', function () {

        var typesCollection = {
            favourites: []
        };

        return {
            setArrayData: function (key, val) {
                typesCollection[key] = val;
            },
            getArrayData: function (key) {
                return typesCollection[key];
            }
        };

    });