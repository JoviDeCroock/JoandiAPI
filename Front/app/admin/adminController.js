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
        vm.categories  = adminService.categories;
        vm.add = addProduct;
        vm.addCat = addCategorie;
        vm.logOut = logOut;

        function addProduct(image, product)
        {
            console.log(product);
            adminService.addProduct(image, product).error(function(error)
            {
                console.log(error);
            }).success(function()
            {
                alert("succesvol toegevoegd!");
            });
        }

        function addCategorie(cat)
        {
            console.log(cat);
            adminService.addCategorie(cat).error(function(error)
            {
                console.log(error);
            }).success(function()
            {
                alert("succesvol toegevoegd!");
            });
        };

        function logOut () {
            authService.logOut();
            $location.path('/auth');
        };
    };
})();