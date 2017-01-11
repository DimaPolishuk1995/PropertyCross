'use strict';

propertyCrossApp
    .controller('SearchPage', function ($scope, $rootScope, $state, Properties, LastSearch, $localStorage) {

        var search_error = function (error) {
            if (error instanceof Array) {
                $scope.locations = error;
                $scope.showLocations = true;
                $scope.showRecentSearches = false;
            }
            else {
                $scope.errorMessage = error;
                $scope.showError = true;
            }
        };

        $scope.search = function (searchText) {
            Properties.search(searchText).then(
                function () {
                    $state.go('results');
                },
                search_error);
        };

        $scope.searchMyLocation = function () {
            Properties.searchByCurrentLocation().then(
                function () {
                    $state.go('results');
                },
                search_error);
        };

        $scope.lastSearches = [];

        if (typeof $localStorage.searches != 'undefined') {
            $scope.lastSearches = LastSearch.get();
            $scope.showRecentSearches = LastSearch.get().length;
        }

        $scope.goTofavouritesPage = function () {
            $state.go('favourites');
        };
    });