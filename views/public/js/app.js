var app=angular.module('clientdev',['ui.router']);

app.config(function($stateProvider,$urlRouterProvider,$locationProvider)
{
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
  $stateProvider
    .state('mainpage',{
      url: '/',
      templateUrl: 'mainpage.html',
      controller: 'mainpageController'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'signup.html',
      controller: 'signupController'
    })
    
})

app.controller('mainpageController',function($scope,$rootScope,$state,$http,$window){
  $scope.navClass="big";
  $scope.headClass="heading";
  $scope.linkClass="li";
  $scope.headClasslink=".company_logo";
  $scope.navClass = 'whiteColor';
  $scope.docHeight=$window.innerHeight;
  angular.element($window).bind(
  "scroll", function() 
  {
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
        console.log("mainpageController called"); 
   });
    $scope.signup=function(){
            $state.go('signup');
          }
  });

app.controller('signupController', function($scope,$rootScope,$state,$http,$window){
  $scope.click=1;
  $scope.step=1;
  $scope.style={'border':'2px solid #bdbdbd','color':'white'};
  $scope.style1=$scope.style;

    $scope.home=function(){
      $state.go('mainpage');
    }

    $scope.client_submit=function(){
     console.log($scope.company_name);
     $http({
      url:'',
      method:'POST',
      data:{
       comapanyName:$scope.company_name,
       emailId:$scope.email,
       phone:$scope.phone,
       address:$scope.address,
       companyType:$scope.company_type,
      }
     }).then((res)=>{

     })
  }
    $scope.continue=function(){
      $scope.step=2;
    }

    $scope.dev_submit=function(){
     // console.log($scope.dev_name);
      $http({
        method:"POST",
        url:'http://localhost:8000/dev/signup',
        data:{
          name:$scope.dev_name,
          emailId:$scope.dev_email,
        }
      }).then((res)=>{
        console.log("data has been saved");
      })

    }
});