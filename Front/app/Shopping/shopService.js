/**
 * Created by jovi on 24/10/2016.
 */
(function()
{
    'use strict';

    angular
        .module('JoandiWebstore')
        .factory('shopService', shopService);

    shopService.$inject = ['$http', 'authService','url'];

    function shopService($http, authService,url)
    {
        var url = url.dev  + "shop/";
        var token = authService.getToken();
        //var cart
        var shop =
        {
            products : [],
            getProducts : getProducts,
            addToCart : addToCart
        };

        function getProducts()
        {
            return $http.get(url + "getAllProducts").success(function(data)
            {
                angular.copy(data, shop.products);
            });
        };

        function addToCart(product, user)
        {
            console.log(token);
            return $http.post(url + user + '/addToCart/' + product, {
                headers: {Authorization: 'Bearer ' + token}
            }).success(function (data)
            {
                console.log(data);
            });
        };
        return shop;
    };
})();