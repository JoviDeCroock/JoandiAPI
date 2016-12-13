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
        vm.logOut = logOut;
        vm.updateAmount = updateAmount;
        vm.adminPanel = admin;
        vm.current = profileService.currentU;
        vm.currentUser = authService.currentUsername();
        vm.isLoggedIn = authService.isLoggedIn();
        vm.admin = profileService.admin;
        console.log(vm.admin);

        function updateAmount(id)
        {
            profileService.updateAmount(id, vm.amount).error(function(error)
            {
                console.log(error);
            }).success(function(msg)
            {
                console.log("succes");
            });
        };

        function admin()
        {
            $location.path('/admin');
        };

        function logOut () {
            authService.logOut();
            $location.path('/auth');
        };
    };
})();