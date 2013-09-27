var SharingApp = angular.module("SharingApp", ["ngResource"]).
    config(function ($routeProvider) {
        $routeProvider.
            when('/', { controller: ListCtrl, templateUrl: 'Views/user.html' }).
            otherwise({ redirectTo: '/' });
    });
SharingApp.factory('UserName', function ($resource) {
    return $resource('https://hyd-miriyals/test1/api/home', { update: { method: 'GET' } });
});
var ListCtrl = function ($scope, $location, UserName) {
    $scope.user = UserName.query();
};