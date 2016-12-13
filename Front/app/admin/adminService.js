/**
 * Created by jovi on 24/10/2016.
 */
(function()
{
    'use strict';

    angular
        .module('JoandiWebstore')
        .factory('adminService', adminService);

    adminService.$inject = ['$http', 'authService','url', 'Upload'];

    function adminService($http, authService,url, Upload)
    {
        var url = url.dev  + "admin/";
        var token = authService.getToken();
        //var cart
        var admin =
        {
            categories: [],
            getCategories : getCategories,
            addProduct : addProduct,
            addCategorie : addCategorie
        };

        function getCategories()
        {
            return $http.get(url + "allCategories", {
                headers: {Authorization: 'Bearer ' + token}
            }).success(function(data)
            {
                angular.copy(data, admin.categories);
            });
        };

        function addCategorie(cat)
        {
            return $http.post(url + "addCategorie", cat, {
                headers: {Authorization: 'Bearer ' + token}
            }).success(function(data)
            {
                console.log(data);
            });
        }

        function addProduct(image, product)
        {
            return Upload.upload({
                url: url+ 'addProduct',
                headers: { Authorization: 'Bearer ' + token },
                method: 'POST',
                data: {
                    name: product.name,
                    categorie: product.categorie,
                    price: product.price,
                    description: product.description
                },
                file: [image]
            }).success(function(data) {
                console.log("yey");
            });
        };

        return admin;
    };
})();