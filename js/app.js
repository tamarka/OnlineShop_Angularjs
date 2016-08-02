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
            self.instruction=[];
            self.loading=true;

            this.getProducts=function() {
                var result=AppService('/data/products.json').get().$promise;
                result.then(function onSuccess(response){
                    self.products=result.$$state.value.products;
                },
                function onFail(response) {
                    console.log(response.status);
                });
            };

            var instruction=AppService('/data/instructions.json').get().$promise;
            instruction.then(function onSuccess(response){
                    self.instruction=instruction.$$state.value.instructions;
                },
                function onFail(response) {
                    console.log(response.status);
                });

        }]);

var AppServices = angular.module('AppServices', [])
    .factory('AppService', ['$resource',
        function ($resource) {
            return function(urlParam){
                return $resource(urlParam);
            }

        }]);
