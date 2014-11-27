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
    var config1 = { method: 'GET', url: 'https://hyd-miriyals/test1/api/home/GetUserName', headers: { 'Content-Type': 'application/x-www-form-urlencoded, application/xml, application/json', 'accept': "application/json", 'Access-Control-Allow-Origin': '*' } };
    AjaxCall(config1
    , function (data) {
        $scope.user = JSON.parse(data);
    }
    , function () {
        alert('Error');
    }
    , $http);
    
    var config2 = { method: 'GET', url: 'https://hyd-miriyals/test1/api/home/GetImagesDetails', headers: { 'Content-Type': 'application/x-www-form-urlencoded, application/xml, application/json', 'accept': "application/json", 'Access-Control-Allow-Origin': '*' } };
    AjaxCall(config2
    , function (data) {
        $scope.images = data;
        LoadImages();
    }
    , function () {
        alert('Error');
    }
    , $http);
    
    $scope.images = [
        { src: 'http://imaging.nikon.com/lineup/dslr/d800/img/sample01/img_01.png', title: "Image1" },
        { src: 'http://imaging.nikon.com/lineup/dslr/d800/img/sample01/img_02.png', title: "Image2" },
        { src: 'http://imaging.nikon.com/lineup/dslr/d800/img/sample01/img_03.png', title: "Image3" }
    ];

    $scope.imgIndex = 0;

    function LoadImages() {
        $timeout(function advanceSlide() {
            if ($scope.images != undefined) {
                $scope.imgIndex = $scope.imgIndex + 1;
                $scope.source = $scope.images[($scope.imgIndex) % $scope.images.length];
                $timeout(advanceSlide, 10000);
            }
        });
    }
}]);
SharingApp.directive(
    "bnFadeHelper",
    function() {

        // I alter the DOM to add the fader image.

        function compile(element, attributes, transclude) {

            element.prepend("<div class='fader'><img id='imgFader' alt='Image' /><span id='faderTitle'></span></div>");

            return (link);

        }


        // I bind the UI events to the $scope.

        function link($scope, element, attributes) {
            var divFader = element.find("div.fader");
            var divPrimary = element.find("div.image");
            var fader = element.find("img#imgFader");
            var primary = element.find("img#imgPrimary");
            var imgTitle = element.find("span#imgTitle");
            var faderTitle = element.find("span#faderTitle");
            var srcSource = '';
            // Watch for changes in the source of the primary
            // image. Whenever it changes, we want to show it
            // fade into the new source.
            $scope.$watch(
                "source",
                function(newValue, oldValue) {

                    // If the $watch() is initializing, ignore.
                    if (newValue === oldValue) {
                        if (newValue != undefined) {
                            divFader.addClass("show");
                            return;
                        }
                        return;

                    }

                    // If the fader is still fading out, don't
                    // bother changing the source of the fader;
                    // just let the previous image continue to
                    // fade out.
                    if (isFadingIn()) {
                        return;
                    }
                    divFader.removeClass("show");
                    srcSource = newValue;
                    //initFade(oldValue);
                    divPrimary.addClass("fadeIn");
                    setTimeout(hideFadeIn, 2000);
                }
            );
            
            function isFadingIn() {
                return divPrimary.hasClass("fadeIn");
            }

            function hideFadeIn() {
                divPrimary.addClass("hide1");
                divPrimary.removeClass("fadeIn");
                initFade(srcSource);
                setTimeout(removeHide, 5000);
            }
            
            function removeHide() {
                divPrimary.removeClass("hide1");
                startFadeOut();
            }
            
            function showFadeOut() {
                primary.addClass("fadeOut");
            }

            // I prepare the fader to show the previous image
            // while fading out of view.

            function initFade(fadeSource) {

                fader.prop("src", fadeSource.ImageUrl);
                divFader.addClass("show");
                faderTitle.prop("innerText", fadeSource.ImageTitle);
                // Don't actually start the fade until the
                // primary image has loaded the new source.
                //primary.on("load", startFadeOut);
                //fader.on("load", startFadeIn);
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
                divFader.width();

                divFader.addClass("fadeOut");
                
                setTimeout(teardownFade, 2000);

            }


            // I clean up the fader after the fade-out has
            // completed its animation.

            function teardownFade() {

                divFader.removeClass("show fadeOut");
                //primary.addClass("fadeIn");

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