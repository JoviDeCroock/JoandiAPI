/**
 * Created by jovi on 11/15/2016.
 */
(function()
{
    'use strict';

    angular
        .module('JoandiWebstore')
        .factory('profileService', profileService);

    profileService.$inject = ['$http', 'authService','url', '$window'];

    function profileService($http, authService,url, $window)
    {
        var url = url.dev + "shop/";
        var token = authService.getToken();
        var profile =
        {
            getUser : getUser,
            updateAmount : updateAmount,
            currentU : "",
            check : check,
            admin: false
        };

        function updateAmount(id, amount)
        {
            var requestBody = {'amount': amount};
            var uId = getUserId();
            return $http.post(url + uId + "/updateAmount/"+id, requestBody, {
                headers: {Authorization: 'Bearer ' + token}
            }).success(function(data)
            {
                console.log(data);
                return data;
            });
        }

        function check(id)
        {
            return $http.get(url.dev + "/admin/" + id + "/isAdmin", {
                headers: {Authorization: 'Bearer ' + token}
            }).success(function(data)
            {
                profile.admin = data.admin;
                return;
            });
        }

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

        function getUserId()
        {
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return payload._id;
        }
        return profile;
    };
})();