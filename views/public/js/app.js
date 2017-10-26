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

app.controller('mainpageController',function($scope,$rootScope,$state,$http){
	console.log("mainpageController called");
})