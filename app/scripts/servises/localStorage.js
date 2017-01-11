'use strict';

propertyCrossApp
    .service('LocalStorage', function ($localStorage) {

        this.addFavourites = function (property) {
            $localStorage.property = property;
        };

        this.getFavourites = function () {
            return $localStorage.property;
        };

        this.clearFavouritesById = function (id) {
            var newId = id - id + 1;
            $localStorage.property.splice(id, newId);
        };
    });