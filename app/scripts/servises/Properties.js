'use strict';

propertyCrossApp
    .factory('Properties', function ($q, Nestoria, Geolocation) {

        var lastSearch = '',
            lastSearchPage = 1,
            lastResponse,
            properties = [];

        var toProperties = function (listings) {

            return listings.map(function (listing) {
                return {
                    id: listing.id,
                    title: listing.title,
                    price: listing.price_formatted,
                    url: listing.thumb_url,
                    imageURL: listing.img_url,
                    summary: listing.summary,
                    rooms: listing.bedroom_number + ' bed, ' + listing.bathroom_number + ' bathroom'
                };
            });
        };

        var search = function (page, placeName) {
            var q = $q.defer();
            Nestoria.search(placeName, page).then(
                function (response) {
                    var responseProperties = toProperties(response.listings);
                    for (var i = 0, len = responseProperties.length; i < len; i++) {
                        responseProperties[i].id = i;
                    }
                    if (!responseProperties.length) {
                        q.reject('There were no properties found for ' + placeName);
                    }
                    if (placeName != lastSearch) {
                        properties = responseProperties;
                    }
                    else {
                        properties = properties.concat(responseProperties);
                    }
                    lastSearch = placeName;
                    lastSearchPage = page;
                    lastResponse = response;
                    q.resolve(properties);
                },
                function (error) {
                    q.reject(error);
                }
            );
            return q.promise;
        };

        var searchByCurrentLocation =  function (page, coordinates) {
            var q = $q.defer();
            var doSearchByCoordinates = function (coords) {
                Nestoria.searchByCoordinates(coords.latitude, coords.longitude, page).then(
                    function (response) {
                        var responseProperties = toProperties(response.listings);
                        if (!responseProperties.length) {
                            q.reject('There were no properties found for ' + coords.latitude.toFixed(2) + ',' + coords.longitude.toFixed(2));
                        }
                        if (coords != lastSearch) {
                            properties = responseProperties;
                        }
                        else {
                            properties = properties.concat(responseProperties);
                        }
                        lastSearch = coords;
                        lastSearchPage = page;
                        lastResponse = response;
                        q.resolve(properties);
                    },
                    function (error) {
                        q.reject(error);
                    }
                );
            };

            if (!coordinates) {
                Geolocation.getCurrentPosition().then(
                    function (result) {
                        var coords = {
                            latitude: result.coords.latitude,
                            longitude: result.coords.longitude
                        };
                        doSearchByCoordinates(coords);
                    },
                    function (error) {
                        q.reject(error);
                    }
                );
            }
            else {
                doSearchByCoordinates(coordinates);
            }

            return q.promise;
        };

        return {
            currentValue: function () {
                return properties;
            },

            count: function () {
                return properties.length;
            },

            total: function () {
                return Number(lastResponse.total_results);
            },

            location: function () {
                return lastSearch;
            },

            search: function (placeName) {
                lastResponse = null;
                properties = [];
                return search(1, placeName);
            },

            searchByCurrentLocation: function () {
                lastResponse = null;
                properties = [];
                return searchByCurrentLocation(1);
            },

            loadMore: function () {
                if (typeof lastSearch === 'string') {
                    return search(lastSearchPage + 1, lastSearch);
                }
                else {
                    return searchByCurrentLocation(lastSearchPage + 1, lastSearch);
                }
            },

            get: function (id) {
                for (var i = 0, len = properties.length; i < len; i++) {
                    if (properties[i].id == id) {
                        return properties[i];
                    }
                }
                return null;
            }
        };
    });