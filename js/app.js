'use strict';

var App = angular.module('app', [
    'ngResource',
    'ui.router',
    'AppControllers',
    'AppServices'
]);

App.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('app', {
            url: '/', // url path that activates this state
            templateUrl: './js/app.html',
            controller: 'AppController as app'
        });

    $urlRouterProvider.otherwise('/');
}]);

var AppControllers = angular.module('AppControllers', [])
    .controller('AppController', ['AppService',
        function (AppService) {
            var self = this;
            self.products=[];
            self.products=AppService;
            console.log(self.products);
        }]);

var AppServices = angular.module('AppServices', [])
    .factory('AppService', ['$resource',
        function ($resource) {
            var resource=$resource('/data/products.json');
            this.products=resource.get();

            resource.get({
                fakeOptionalParameter : '/error'
            }).$promise.then(null, function(value) {
                console.log(value.status);
            });

            return this.products;
        }]);
