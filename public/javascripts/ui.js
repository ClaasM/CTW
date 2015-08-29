/**
 * Created by Claas on 01.08.2015.
 */

//Stupid IE
// Avoid `console` errors in browsers that lack a console.
(function () {
    var method;
    var noop = function () {
    };
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());


var app = angular.module('ctw', ['ngRoute']).run(function ($http, $rootScope, $sce, $location) {


    $rootScope.selectCategory = function (category) {
        if ($rootScope.selectedCategory === category) {
            $rootScope.selectedCategory = "";
        } else {
            $rootScope.selectedCategory = category;
        }
    };

    $rootScope.selectTool = function (tool) {
        for (var i = 0; i < $rootScope.categories.length; i++) {
            for (var j = 0; j < $rootScope.categories[i].tools.length; j++) {
                if ($rootScope.categories[i].tools[j].path === tool) {
                    $rootScope.selectedCategory = $rootScope.categories[i];
                    $rootScope.selectedTool = $rootScope.categories[i].tools[j];
                }
            }
        }
    };


    $rootScope.menuButton = $sce.trustAsHtml('&equiv;');
    $rootScope.navigation_active = false;

    $rootScope.toggleNavigation = function () {
        $rootScope.navigation_active = !$rootScope.navigation_active;
    };
    $rootScope.hideNavigation = function () {
        $rootScope.navigation_active = false;
    };

    $http.get('./../frontend_tools/tools.json')
        .then(function (res) {
            $rootScope.categories = res.data;
        });
});


app.controller('contentController', function ($scope, $routeParams, $rootScope, $sce) {
    $scope.$on('$includeContentError', function (angularEvent, src) {
        $scope.toolUrl = 'html/404.html';
    });
    $scope.$on('$includeContentLoaded', function (event, src) {
        if ($routeParams.tool && $rootScope.categories) {
            $rootScope.selectTool($routeParams.tool);
        }
    });
    if ($routeParams.tool) {
        $scope.toolUrl = '/frontend_tools/html/' + $routeParams.tool + '.html';
    } else {
        $scope.toolUrl = '/html/main.html';
    }
});

//Controlls static content
app.controller('staticController', function ($scope, $rootScope, $sce) {

    $rootScope.selectedCategory = undefined;
    $rootScope.selectedTool = undefined;
});

app.controller('feedbackController', function ($scope, $rootScope, $http, $sce) {
    $rootScope.selectedCategory = 'feedback';
    $rootScope.selectedTool = undefined;

    $scope.sendFeedback = function () {
        $http.post('/sendmail', {
            text: $scope.text,
            sender: $scope.sender
        }).
            then(function (response) {
                $scope.text = undefined;
                $scope.sender = undefined;
            });
    }
});

app.config(function ($routeProvider, $locationProvider, $controllerProvider) {
    app.controllerProvider = $controllerProvider;

    $routeProvider
        .when('/about', {
            templateUrl: 'html/about.html',
            controller: 'staticController'
        })
        .when('/tos', {
            templateUrl: 'html/tos.html',
            controller: 'staticController'
        })
        .when('/feedback', {
            templateUrl: 'html/feedback.html',
            controller: 'feedbackController'
        })
        .when('/:tool?', {
            templateUrl: 'html/tool_wrapper.html',
            controller: 'contentController'
        })
        .otherwise({
            templateUrl: 'html/404.html',
            controller: 'staticController'
        });

    $locationProvider.html5Mode(true);
});

app.filter('safe', function ($sce) {
    return function (val) {
        return $sce.trustAsHtml(val);
    };
});


app.directive('script', function () {
    return {
        restrict: 'E',
        scope: false,
        link: function (scope, elem, attr) {
            if (attr.type === 'text/javascript-lazy') {
                var s = document.createElement("script");
                s.type = "text/javascript";
                var src = elem.attr('src');
                if (src !== undefined) {
                    s.src = src;
                }
                else {
                    var code = elem.text();
                    s.text = code;
                }


                document.head.appendChild(s);
                elem.remove();
            }
        }
    };
});







