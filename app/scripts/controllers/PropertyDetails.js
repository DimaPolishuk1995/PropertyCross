'use strict';

propertyCrossApp
    .controller('PropertyDetails', function ($scope, $stateParams, Properties, $localStorage, $state, GetArray, LocalStorage) {

        $scope.favourites = GetArray.getArrayData('favourites');

        if (typeof $localStorage.property != 'undefined' && $scope.favourites.length == 0) {
            $scope.favourites = LocalStorage.getFavourites();
        }

        var id = $stateParams.id;
        if (!$scope.property) {
            $scope.property = Properties.get(id);
        }

        $scope.saveToFavourites = function () {
            $scope.favourites.push({
                price: $scope.property.price,
                title: $scope.property.title,
                rooms: $scope.property.rooms,
                imageURL: $scope.property.imageURL,
                summary: $scope.property.summary
            });

            GetArray.setArrayData('favourites', $scope.favourites);
            LocalStorage.addFavourites($scope.favourites);
            $state.go('searchPage');
        };
    });