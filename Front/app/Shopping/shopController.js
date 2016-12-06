/**
 * Created by jovi on 24/10/2016.
 */
(function()
{
    'use strict';

    angular
        .module('JoandiWebstore')
        .controller('shopController', shopController);

    shopController.$inject = ['shopService', 'authService', '$location', '$routeParams'];

    function shopController(shopService, authService, $location, $routeparams)
    {
        var vm = this;
        vm.products = shopService.products;
        vm.user =  authService.currentUser();
        vm.addToCart = addToCart;
        vm.isLoggedIn = authService.isLoggedIn();
        vm.currentUser = authService.currentUsername();
        vm.selectedProduct=[];
        vm.chooseProduct = choose;
        vm.profile = profile;
        vm.logOut = logOut;

        function logOut () {
            authService.logOut();
            $location.path('/auth');
        };

        function addToCart(product)
        {
            shopService.addToCart(product, vm.user).error(function(error)
            {
                console.log(error);
            }).success(function()
            {
                $location.path('/shop');
            });
        };

        function choose(product)
        {
            $location.path('/product/' + product._id);
        }

        function profile(id)
        {
            $location.path('/profile/' + id);
        }
    };
})();