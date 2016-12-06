/**
 * Created by jovi on 10/6/2016.
 */
(function(){

  'use strict';

  angular
    .module('JoandiWebstore')
    .controller('authController', authController);

  authController.$inject = ['authService', '$location'];

  function authController(authService, $location)
  {
      var vm = this;
      vm.register = register;
      vm.logIn = logIn;
      vm.logOut = logOut;
      vm.isLoggedIn = authService.isLoggedIn();

      //functions
      function register()
      {
          authService.register(vm.registerUser).error(function(error)
          {
              vm.error = error;
              console.log(error);
          }).success(function()
          {
              $location.path('/shop');
          });
      };

      function logIn()
      {
          authService.logIn(vm.loginUser).error(function(error)
          {
              vm.error = error;
              console.log(error);
          }).success(function()
          {
              $location.path('/shop');
          })
      };

      function logOut()
      {
          auth.logOut(vm.logOut).error(function(error)
          {
              console.log(error);
          }).success(function()
          {
              $location.path('/auth');
          });
      };
  };
})();
