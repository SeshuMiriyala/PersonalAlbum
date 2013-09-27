var SharingApp = angular.module("SharingApp", ["ngResource"]).
    config(function ($routeProvider) {
        $routeProvider.
            when('/', { controller: 'ListCtrl', templateUrl: 'Views/user.html' }).
            otherwise({ redirectTo: '/' });
    });
SharingApp.factory('UserName', function ($resource) {
    return $resource('https://localhost/test1/api/home', { update: { method: 'GET' } });
});
SharingApp.controller('ListCtrl', ['$scope', '$http', '$location', '$timeout', function ($scope, $http, $location, $timeout) {
    //$scope.user = UserName.query();
    var config = { method: 'GET', url: 'https://hyd-miriyals/test1/api/home', headers: { 'Content-Type': 'application/x-www-form-urlencoded, application/xml, application/json', 'accept': "application/json", 'Access-Control-Allow-Origin': '*' } };
    AjaxCall(config
    , function (data) {
        $scope.user = JSON.parse(data);
    }
    , function () {
        alert('Error');
    }
    , $http);
    
    $scope.images = [
        { src: 'http://imaging.nikon.com/lineup/dslr/d800/img/sample01/img_01.png' },
        { src: 'http://imaging.nikon.com/lineup/dslr/d800/img/sample01/img_02.png' },
        { src: 'http://imaging.nikon.com/lineup/dslr/d800/img/sample01/img_03.png' }
    ];

    $scope.imgIndex = 0;
    $timeout(function advanceSlide() {
        $scope.imgIndex = $scope.imgIndex + 1;
        $scope.source = $scope.images[($scope.imgIndex + 1) % $scope.images.length].src;
        $timeout(advanceSlide, 10000);
    });
}]);
SharingApp.directive(
    "bnFadeHelper",
    function() {

        // I alter the DOM to add the fader image.

        function compile(element, attributes, transclude) {

            element.prepend("<img class='fader' />");

            return (link);

        }


        // I bind the UI events to the $scope.

        function link($scope, element, attributes) {

            var fader = element.find("img.fader");
            var primary = element.find("img.image");

            // Watch for changes in the source of the primary
            // image. Whenever it changes, we want to show it
            // fade into the new source.
            $scope.$watch(
                "source",
                function(newValue, oldValue) {

                    // If the $watch() is initializing, ignore.
                    if (newValue === oldValue) {
                        
                        return;

                    }

                    // If the fader is still fading out, don't
                    // bother changing the source of the fader;
                    // just let the previous image continue to
                    // fade out.
                    //if (isFading()) {

                    //    return;

                    //}

                    //initFade(oldValue);
                    primary.removeClass("fadeOut");
                    primary.addClass("fadeIn");
                    setTimeout(hideFadeIn, 2000);
                }
            );

            function hideFadeIn() {
                primary.removeClass("fadeIn");
                setTimeout(showFadeOut, 5000);
            }
            
            function showFadeOut() {
                primary.addClass("fadeOut");
            }

            // I prepare the fader to show the previous image
            // while fading out of view.

            function initFade(fadeSource) {

                fader
                    .prop("src", fadeSource)
                    .addClass("show");

                // Don't actually start the fade until the
                // primary image has loaded the new source.
                primary.on("load", startFadeOut);
                fader.on("load", startFadeIn);
                //primary.bind("load", startFade);
                //startFade();

            }


            // I determine if the fader is currently fading
            // out of view (that is currently animated).

            function isFading() {

                return (
                    fader.hasClass("show") ||
                        fader.hasClass("fadeOut")
                );

            }


            // I start the fade-out process.
            function startFadeIn() {

                // The .width() call is here to ensure that
                // the browser repaints before applying the
                // fade-out class (so as to make sure the
                // opacity doesn't kick in immediately).
                primary.width();

                primary.removeClass("fadeIn");

                setTimeout(teardownFade, 5000);

            }

            function startFadeOut() {

                // The .width() call is here to ensure that
                // the browser repaints before applying the
                // fade-out class (so as to make sure the
                // opacity doesn't kick in immediately).
                fader.width();

                fader.addClass("fadeOut");
                
                setTimeout(teardownFade, 5000);

            }


            // I clean up the fader after the fade-out has
            // completed its animation.

            function teardownFade() {

                fader.removeClass("show fadeOut");
                primary.addClass("fadeIn");

            }

            ;
        }


        // Return the directive configuration.
        return ({
            compile: compile,
            restrict: "A"
        });

    }
);

function AjaxCall(config, successCallback, errorCallback, $http) {
    $http(config).success(successCallback).error(errorCallback);
}