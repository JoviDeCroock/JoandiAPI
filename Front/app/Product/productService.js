/**
 * Created by jovi on 11/15/2016.
 */
(function()
{
    'use strict';

    angular
        .module('JoandiWebstore')
        .factory('productService', productService);

    productService.$inject = ['$http', 'authService','url'];

    function productService($http, authService,url)
    {
        var url = url.dev + "shop/";
        var product =
        {
            selectedProduct : "",
            getProduct : getProduct
        };

        function getProduct(id)
        {
            return $http.get(url + "getProduct/" + id).success(function(data)
            {
                product.selectedProduct = data;
                return;
            });
        };
        return product;
    };
})();