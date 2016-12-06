/**
 * Created by jovi on 24/10/2016.
 */
(function()
{
    'use strict';

    angular
        .module('JoandiWebstore')
        .factory('billService', billService);

    billService.$inject = ['$http', 'authService','url'];

    function billService($http, authService,url)
    {
        var url = url.dev  + "shop/";
        var token = authService.getToken();
        //var cart
        var bill =
        {

        };


        return bill;
    };
})();