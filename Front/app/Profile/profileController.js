/**
 * Created by jovi on 11/15/2016.
 */
(function()
{
    'use strict';

    angular
        .module('JoandiWebstore')
        .controller('profileController', profileController);

    profileController.$inject = ['profileService', 'authService', '$location','$routeParams'];

    function profileController(profileService, authService, $location, $routeParams)
    {
        var vm = this;
        vm.current = profileService.currentU;
        vm.isLoggedIn = authService.isLoggedIn();
        vm.logOut = logOut;
        console.log(vm.current);

        function logOut () {
            authService.logOut();
            $location.path('/auth');
        };
    };
})();