/**
 * Created by jovi on 11/15/2016.
 */
(function()
{
    'use strict';

    angular
        .module('JoandiWebstore')
        .factory('profileService', profileService);

    profileService.$inject = ['$http', 'authService','url'];

    function profileService($http, authService,url)
    {
        var url = url.dev + "shop/";
        var token = authService.getToken();
        var profile =
        {
            getUser : getUser,
            currentU : ""
        };

        function getUser(id)
        {
            return $http.get(url + "getUser/" +id, {
                headers: {Authorization: 'Bearer ' + token}
            }).success(function(data)
            {
                profile.currentU = data;
                return;
            });
        };
        return profile;
    };
})();