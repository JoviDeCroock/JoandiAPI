/**
 * Created by jovi on 12/13/2016.
 */
(function(){
    'use strict';

    angular
        .module('JoandiWebStore')
        .directive('clickDirective', clickDirective);

    function clickDirective() {
        return {
            restrict: 'A',
            link: link
        };

        function link(scope, ele, attrs) {
            scope.x ="x";
            alert("click");
        };
    }


})();
