'use strict';
propertyCrossApp
    .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$sceProvider',
        function ($locationProvider, $stateProvider, $urlRouterProvider, $sceProvider) {

            $sceProvider.enabled(false);
            $urlRouterProvider.otherwise('/');

            $stateProvider
                .state('searchPage', {
                    url: '/',
                    templateUrl: 'views/searchPage.html',
                    controller: 'SearchPage'
                })

                .state('results', {
                    url: '/results',
                    templateUrl: 'views/resultsListing.html',
                    controller: 'ResultsListing'
                })

                .state('property', {
                    url: '/property/:id',
                    templateUrl: 'views/propertyDetails.html',
                    controller: 'PropertyDetails'
                })

                .state('favourites', {
                    url: '/favourites',
                    templateUrl: 'views/favourites.html',
                    controller: 'FavouritesPage'
                });
        }]);