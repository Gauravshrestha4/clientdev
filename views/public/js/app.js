var app=angular.module('clientdev',['ui.router']);

app.config(function($stateProvider,$urlRouterProvider,$locationProvider)
{
	$urlRouterProvider.otherwise('/mainpage');
	$locationProvider.html5Mode(true);
	$stateProvider
		.state('mainpage',{
			url: '/mainpage',
			templateUrl: '/mainpage.html',
			controller: 'mainpageController'
		})
})

app.controller('mainpageController',function($scope,$rootScope,$state,$http,$window){
	console.log("mainpageController called");
	$scope.navClass="big";
	$scope.headClass="heading";
	$scope.linkClass="li";
	angular.element($window).bind(
	"scroll", function() {
         console.log(window.pageYOffset);
         if(window.pageYOffset >0) {
           $scope.navClass = 'small';
           $scope.headClass='heading_on_scroll';
           $scope.linkClass='li_on_scroll';
         } else {
           $scope.navClass = 'big';
           $scope.headClass="heading";
           $scope.linkClass="li";
         }
         $scope.$apply();
   });
	
})