'use strict';

propertyCrossApp
    .factory('Nestoria', function ($resource, $q, LastSearch, $sce) {

        var service = $resource($sce.trustAsResourceUrl('http://api.nestoria.co.uk/api'),
            {
                country: 'uk',
                pretty: '1',
                action: 'search_listings',
                encoding: 'json',
                listing_type: 'buy',
                callbackKey: 'callback'
            },
            {
                search: {
                    method: 'JSONP'
                }
            });

        return {

            search: function (placeName, page) {
                var q = $q.defer();
                service.search({
                        place_name: placeName,
                        page: page
                    },
                    function (response) {
                        response = response.response;
                        if (['100', '101', '110'].indexOf(response.application_response_code) != -1) {
                            LastSearch.add(placeName);
                            q.resolve(response);
                        }
                        else if (['200', '202'].indexOf(response.application_response_code) != -1) {
                            q.reject(response.locations.map(function (item) {
                                return {key: item.place_name, value: item.long_title};
                            }));
                        }
                        else {
                            q.reject('An error occurred while searching. Please check your network connection and try again.');
                        }
                    },
                    function (error) {
                        q.reject(error);
                    });
                return q.promise;
            },

            searchByCoordinates: function (latitude, longitude, page) {
                var q = $q.defer();
                var searchLocation = latitude.toFixed(4) + ',' + longitude.toFixed(4);
                service.search({
                        centre_point: searchLocation,
                        page: page
                    },
                    function (response) {
                        LastSearch.add(searchLocation);
                        q.resolve(response.response);
                    },
                    function (error) {
                        q.reject(error);
                    });
                return q.promise;
            }

        };
    });

