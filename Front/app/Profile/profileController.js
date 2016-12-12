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
        vm.currentUser = authService.currentUsername();
        vm.updateAmount = updateAmount;
        vm.admin = true;
        vm.adminPanel = admin;
        console.log(vm.current);

        function updateAmount(id)
        {
            profileService.updateAmount(id, vm.amount).error(function(error)
            {
                console.log(error);
            }).success(function(msg)
            {
                console.log("succes");
            });
            console.log(vm.amount);
            console.log(id);
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