/**
 * Created by jovi on 11/15/2016.
 */
(function()
{
    'use strict';

    angular
        .module('JoandiWebstore')
        .controller('billController', billController);

    billController.$inject = ['billService', 'authService', '$location','$routeParams'];

    function billController(billService, authService, $location, $routeParams)
    {
        var vm = this;
        vm.isLoggedIn = authService.isLoggedIn();
        vm.currentUser = authService.currentUsername();
        vm.logOut = logOut;

        function logOut () {
            authService.logOut();
            $location.path('/auth');
        };
    };
})();