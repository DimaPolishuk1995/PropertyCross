'use strict';

propertyCrossApp
    .controller('ResultsListing', function ($scope, Properties) {

        function updateHeader() {
            $scope.title = Properties.count() + ' of ' + Properties.total() + ' matches';
        }

        $scope.loadMore = function () {
            Properties.loadMore().then(function (properties) {
                $scope.properties = properties;
                updateHeader();
            });
        };
        $scope.properties = Properties.currentValue();
        updateHeader();
    });