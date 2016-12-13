/**
 * Created by jovi on 7/10/2016.
 */
 (function(){
   'use strict';

   angular
     .module('JoandiWebstore')
     .factory('authService', authService);

   authService.$inject = ['$http', '$window','url'];

   function authService($http, $window,url){
       var url = url.dev;
       var auth =
       {
           register: register,
           logIn : logIn,
           getToken : getToken,
           isLoggedIn : isLoggedIn,
           currentUser : currentUser,
           saveToken : saveToken,
           currentUsername : currentUsername,
           logOut : logOut
       };

       /*MAIN FUNCTIONS*/
       function register(user)
       {
           return $http.post(url+'register', user).success(function (data)
           {
               auth.saveToken(data.token);
           });
       };

       function logIn(user)
       {
           return $http.post(url+'login', user).success(function(data)
           {
               auth.saveToken(data.token);
           });
       };

        function logOut()
       {
           $window.localStorage.removeItem('JoandiToken');
       };

       function getToken()
       {
           return $window.localStorage['JoandiToken'];
       };

       function isLoggedIn(){
           var token  = auth.getToken();
           if(token){
               var payload = JSON.parse($window.atob(token.split('.')[1]));
               return payload.exp > Date.now()/1000;
           }
           else{
               return false;
           }
       };

       function currentUser()
       {
           if(auth.isLoggedIn())
           {
               var token = auth.getToken();
               var payload = JSON.parse($window.atob(token.split('.')[1]));
               return payload._id;
           }
       };

       function currentUsername()
       {
           if(auth.isLoggedIn())
           {
               var token = auth.getToken();
               var payload = JSON.parse($window.atob(token.split('.')[1]));
               return payload.username;
           }
       };

       function saveToken(token)
       {
           $window.localStorage['JoandiToken'] = token;
       };

       return auth;
   };
 })();
