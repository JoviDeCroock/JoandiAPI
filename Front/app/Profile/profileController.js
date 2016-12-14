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
        vm.remove = remove;
        vm.amount = [];

        function remove(id)
        {
            profileService.remove(id).error(function(error)
            {
                console.log(error);
            }).success(function(msg)
            {
                vm.current = profileService.currentU;
            });
        }

        function updateAmount(id)
        {
            var x = 0;
            vm.amount.forEach(function(entry)
            {
               if(entry > x)
               {
                   console.log(entry);
                   x = entry;
               }
            });
            console.log(x);
            profileService.updateAmount(id, x).error(function(error)
            {
                console.log(error);
            }).success(function(msg)
            {
                vm.current = profileService.currentU;
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