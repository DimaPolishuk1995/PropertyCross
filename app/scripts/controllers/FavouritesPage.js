'use strict';

propertyCrossApp
    .controller('FavouritesPage', function ($scope, LocalStorage) {
        $scope.favourites = LocalStorage.getFavourites();
        $scope.removeFavouriteProperty = function (id) {
            LocalStorage.clearFavouritesById(id, id);
        };
    });