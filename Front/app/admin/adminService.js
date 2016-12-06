/**
 * Created by jovi on 24/10/2016.
 */
(function()
{
    'use strict';

    angular
        .module('JoandiWebstore')
        .factory('adminService', adminService);

    adminService.$inject = ['$http', 'authService','url'];

    function adminService($http, authService,url)
    {
        var url = url.dev  + "admin/";
        var token = authService.getToken();
        //var cart
        var admin =
        {

        };

        return admin;
    };
})();