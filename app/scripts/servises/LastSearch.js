'use strict';

propertyCrossApp
    .service('LastSearch', function ($q, $rootScope, $localStorage) {

        if (typeof $localStorage.searches == 'undefined') {
            var searches = [];
        } else {
            var searches = $localStorage.searches;
        }

        function save() {
            $localStorage.searches = searches;
        }

        return {

            get: function () {
                return $localStorage.searches;
            },

            add: function (search) {
                var index = searches.indexOf(search);
                if (index != -1) {
                    searches.splice(index, 1);
                }
                searches.unshift(search);
                if (searches.length > 5) {
                    searches.length = 5;
                }
                save();
                return searches;
            }
        };
    });