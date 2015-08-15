/**
 * Created by Claas on 01.08.2015.
 */
var app = angular.module('ctw', ['ngRoute']).run(function ($http, $rootScope, $sce, $location) {

    $rootScope.select = function (category) {
        if ($rootScope.selected === category) {
            $rootScope.selected = "";
        } else {
            $rootScope.selected = category;
        }
    };
    $rootScope.menuButton = $sce.trustAsHtml('&equiv;');
    $rootScope.navigation_active = false; //Provisorisch TODO andere Lösung finden

    $rootScope.toggleNavigation = function () {
            $rootScope.navigation_active = !$rootScope.navigation_active;
    };
    $rootScope.hideNavigation = function () {
        $rootScope.navigation_active = false;
    };

    $rootScope.go = function ( path ) {
        $location.path( path );
    };

    $http.get('./../frontend_tools/tools.json')
        .then(function (res) {
            $rootScope.categories = res.data;
        });
});


app.controller('contentController', function ($scope, $routeParams) {

    $scope.$on('$includeContentError', function (angularEvent, src) {
        console.log("error");
        $scope.toolUrl = '/html/404.html';
    });

    $scope.$on('$includeContentRequested', function (angularEvent, src) {
        console.log("request");
    });

    $scope.$on('$includeContentLoaded', function (event, failedTemplate) {
        console.log("success");
    });
    $scope.toolUrl = '/frontend_tools/html/' + $routeParams.tool + '.html';

});

app.controller('mainController', function ($scope, $routeParams) {

});


app.config(function ($routeProvider, $locationProvider, $controllerProvider) {
    app.controllerProvider = $controllerProvider;

    $routeProvider
        .when('/', {
            templateUrl: 'html/main.html',
            controller: 'mainController'
        })
        .when('/about', {
            templateUrl: 'html/imprint.html',
            controller: 'mainController'
        })
        .when('/:tool', {
            templateUrl: 'html/tool_wrapper.html',
            controller: 'contentController'
        })
        .otherwise({
            templateUrl: 'html/404.html',
            controller: 'mainController'
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
                new Function(elem.text())();
            }
        }
    };
});




