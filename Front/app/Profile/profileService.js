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
            currentU : [],
            check : check,
            admin: "",
            remove: remove
        };

        function remove(id)
        {
            return $http.post(url + getUserId() + "/removeFromCart/"+id, {
                headers: {Authorization: 'Bearer ' + token}
            }).success(function(data)
            {
                angular.copy(data.products, profile.currentU);
                console.log(profile.currentU);
            });
        }

        function updateAmount(id, amount)
        {
            var requestBody = {'amount': amount};
            var uId = getUserId();
            return $http.post(url + uId + "/updateAmount/"+id, requestBody, {
                headers: {Authorization: 'Bearer ' + token}
            }).success(function(data)
            {
                angular.copy(data.products, profile.currentU);
                console.log(profile.currentU);
            });
        }

        function check(id)
        {
            console.log("http://188.166.173.147:3000/admin/" + id + "/isAdmin");
            return $http.get("http://188.166.173.147:3000/admin/" + id + "/isAdmin", {
                headers: {Authorization: 'Bearer ' + token}
            }).success(function(data)
            {
                profile.admin = data.admin;
                console.log(profile.admin);
            });
        }

        function getUser(id)
        {
            return $http.get(url + "getUser/" +id, {
                headers: {Authorization: 'Bearer ' + token}
            }).success(function(data)
            {
                angular.copy(data.products, profile.currentU);
                console.log(profile.currentU);
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