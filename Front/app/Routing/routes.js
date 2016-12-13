/**
 * Created by jovi on 11/2/2016.
 */
(function(){

    'use strict';

    angular
        .module("JoandiWebstore")
        .config(routes);

    routes.$inject = ['$routeProvider'];

    function routes($routeProvider)
    {
        $routeProvider.when('/auth',{
            url: '/auth',
            templateUrl: 'app/Authentication/authPage.html',
            controller: 'authController',
            controllerAs : 'vm'
        }).when('/shop', {
            url: '/shop',
            templateUrl: 'app/Shopping/shopOverview.html',
            controller: 'shopController',
            controllerAs : 'vm',
            resolve:
            {
                postPromise: ['shopService', function(shopService)
                {
                    return shopService.getProducts();
                }]
            }
        }).when('/product/:id',{
            templateUrl: 'app/Product/product.html',
            controller: 'productController',
            controllerAs : 'vm',
            resolve:
            {
                postPromise: ['$route', 'productService', function($route,productService)
                {
                    return productService.getProduct($route.current.params.id);
                }]
            }
        }).when('/profile/:id',{
            templateUrl: 'app/Profile/profile.html',
            controller: 'profileController',
            controllerAs : 'vm',
            resolve:
            {
                postPromise: ['$route', 'profileService', function($route,profileService)
                {
                    profileService.check($route.current.params.id);
                    profileService.getUser($route.current.params.id);
                    return
                }]
            }
        }).when('/admin', {
            templateUrl: 'app/admin/adminPanel.html',
            controller: 'adminController',
            controllerAs : 'vm',
            resolve:
            {
                postPromise: ['adminService', function(adminService)
                {
                    adminService.getCategories();
                    return
                }]
            }
        }).otherwise({redirectTo:'/auth'})
    };
})();