const app=angular.module('clientdev',['ui.router']);

app.config(function($stateProvider,$urlRouterProvider,$locationProvider)
{
  $urlRouterProvider.otherwise('/');
  $locationProvider.html5Mode(true);
  $stateProvider
    .state('mainpage',{
      url: '/',
      templateUrl: '/templates/mainpage.html',
      controller: 'mainpageController'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: '/templates/signup.html',
      controller: 'signupController'
    })
    .state('signin',{
      url:'/signin',
      templateUrl:'/templates/signin.html',
      controller:'signinController'
    })
    .state('howItWorks',{
      url:'/how-it-works',
      templateUrl:'templates/how_it_works.html',
      controller:'howItWorksController'
    })
    .state('clientDashboard',{
      url:'/client',
      templateUrl:'templates/clientDashboard.html',
      controller:'clientDashboardController'
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
      url:'http://localhost:8000/client/signup',
      method:'POST',
      data:{
       companyName:$scope.company_name,
       emailId:$scope.email,
       phone:$scope.phone,
       address:$scope.address,
       companyType:$scope.company_type,
       password:$scope.password,
       confirmPassword:$scope.confirmPassword,
      }
     }).then((res)=>{
        console.log(res);
     })
  }
    $scope.continue=function(){
      $scope.step=2;
    }

    $scope.dev_submit=function(){
     // console.log($scope.dev_name);
      $http({
        url:'http://localhost:8000/dev/signup',
        method:'POST',

        data:{
          name:$scope.dev_name,
          emailId:$scope.dev_email,
        }
      }).then((res)=>{

        console.log("data has been saved");
      })

    }
    $scope.check_fields=function(){
      
      if(($scope.company_name==null)|| ($scope.email==null) ||($scope.phone==null)||($scope.address==null)||($scope.company_type==null)||($scope.password=null)||($scope.confirmPassword==null))
      {
        return true;
      }
      else
      {
        return false;
      }
    }
    $scope.check_dev_fields=function(){
      if(($scope.dev_name==null)||($scope.dev_email==null))
      {
        return true;
      }
      else
      {
        return false;
      }
    }
    
})

app.controller('signinController',function($scope,$rootScope,$http,$state)
{
  console.log("signinController called");
  $scope.click=1;
  $scope.style={'border':'2px solid #bdbdbd','color':'white'};
  $scope.style1=$scope.style;
  $scope.dev_signin=function(){
    $http({
      url:'http://localhost:8000/dev/signin',
      method:'POST',
      data:{
        name:$scope.dev_username,
        password:dev_password
      }
    }).then((res)=>{
      console.log(res);
    })
  }
})
app.controller('howItWorksController',function($scope,$rootScope,$state,$http,$window){
  $scope.set=1;
  $scope.style={'backgroundColor':'#f26234','color':'white'};
  $scope.style1=$scope.style;
  console.log("howItWorks");
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
})

app.controller('clientDashboardController',function($state,$scope,$rootScope,$http){
  console.log("Welcome Client");
})