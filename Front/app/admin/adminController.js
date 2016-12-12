/**
 * Created by jovi on 11/15/2016.
 */
(function()
{
    'use strict';

    angular
        .module('JoandiWebstore')
        .controller('adminController', adminController);

    adminController.$inject = ['adminService', 'authService', '$location','$routeParams'];

    function adminController(adminService, authService, $location, $routeParams)
    {
        var vm = this;
        vm.isLoggedIn = authService.isLoggedIn();
        vm.currentUser = authService.currentUsername();
        vm.logOut = logOut;
        vm.categories  = adminService.categories;

        function logOut () {
            authService.logOut();
            $location.path('/auth');
        };
    };
})();