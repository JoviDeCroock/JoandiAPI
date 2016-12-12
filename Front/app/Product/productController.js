/**
 * Created by jovi on 11/15/2016.
 */
(function()
{
    'use strict';

    angular
        .module('JoandiWebstore')
        .controller('productController', productController);

    productController.$inject = ['productService', 'authService', '$location','$routeParams'];

    function productController(productService, authService, $location, $routeParams)
    {
        var vm = this;
        vm.product = productService.selectedProduct;
        vm.isLoggedIn = authService.isLoggedIn();
        vm.currentUser = authService.currentUsername();
        vm.user =  authService.currentUser();
        vm.logOut = logOut;
        vm.profile = profile;

        function logOut () {
            authService.logOut();
            $location.path('/auth');
        };

        function profile(id)
        {
            $location.path('/profile/' + id);
        }
    };
})();