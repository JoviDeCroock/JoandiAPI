/**
 * Created by jovi on 12/12/2016.
 */
(function(){
    'use strict';

    angular
        .module('JoandiWebStore')
        .run(authCheck);

    authCheck.$inject = ['$rootScope','$location','authService'];

    function authCheck($rootScope,$location,authService){
        $rootScope.$on('$routeChangeStart',function(event){
            if(!authService.isLoggedIn()){
                $location.path('/auth');
            }
        });
    };
})();
