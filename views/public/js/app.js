var app=angular.module('clientdev',['ui.router']);

app.config(function($stateProvider,$urlRouterProvider,$locationProvider)
{
  $urlRouterProvider.otherwise('/mainpage');
  $locationProvider.html5Mode(true);
  $stateProvider
    .state('mainpage',{
      url: '/',
      templateUrl: '/mainpage.html',
      controller: 'mainpageController'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: '/signup.html',
      controller: 'signupController'
    })
    
})

app.controller('mainpageController',function($scope,$rootScope,$state,$http,$window){
  console.log("mainpageController called");
  $scope.navClass="big";
  $scope.headClass="heading";
  $scope.linkClass="li";
  $scope.headClasslink=".company_logo";
  $scope.navClass = 'whiteColor';
  $scope.docHeight=$window.innerHeight;
  angular.element($window).bind(
  "scroll", function() {
         //console.log(window.pageYOffset);
         if(window.pageYOffset >50) 
         {
          if(window.pageYOffset>$scope.docHeight)
          {
            $scope.navClass = 'baseColor';
          $scope.headClass='heading_after_land';
          $scope.linkClass='li_after_land';
          $scope.headClasslink="company_logo_on_scroll";

          }
          else
          {
            $scope.navClass = 'whiteColor';
            $scope.navClass = 'small';
              $scope.headClass='heading_on_scroll';
              $scope.linkClass='li_on_scroll';
              $scope.headClasslink="company_logo_on_scroll";
          }
          
         } 
         else 
         {
           $scope.navClass = 'big';
           $scope.headClass="heading";
           $scope.linkClass="li";
           $scope.headClasslink="company_logo";
         }
         $scope.$apply();
        
         
   });
  
})

app.config('signupController', function($scope,$rootScope,$state,$http,$window){
  // console.log('Hello World');
  console.log($scope);
});