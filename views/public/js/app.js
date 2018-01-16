const app=angular.module('clientdev',['ui.router','ngCookies']);

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
      url:'',
      templateUrl:'templates/clientDashboard.html',
      controller:'clientDashboardController'
    })
    .state('clientDashboard.jobPost',{
      url:'/post-job',
      templateUrl:'templates/jobPost.html',
      controller:'jobPostController'
    })
    .state('clientDashboard.stat',{
      url:'/stats',
      templateUrl:'templates/previousStat.html',
      controller:'statController'
    })
    .state('clientDashboard.updateProfile',{
      url:'/update-profile',
      templateUrl:'templates/clientProfile.html',
      controller:'clientProfileController'
    })
})

app.service('authenticate', ["$http", function($http) {
  this.client = function(){
    return $http.get('/authenticate/client')
    .then(function(data) {
      if(data.status !== 200){
        return false;
      }
      else{
        return true;
      }
    })
    .catch(function(err) {
      throw err;
    })
  }
}]);

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
  $scope.style={'border':'2px solid #f26234','color':'white'};
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
        $scope.company_name=null;
        $scope.email=null;
        $scope.phone=null;
        $scope.address=null;
        $scope.company_type=null;
        $scope.password=null;
        $scope.confirmPassword=null;
       console.log(res.status);
       Materialize.toast(res.data,5000,'deep-orange darken-3');
       $state.go('signin');
     })
  }
    $scope.continue=function(){
      console.log($scope.dev_email);
      $http({
        url:'http://localhost:8000/dev/checkEmail',
        method:'POST',
        data:{
          emailId:$scope.dev_email,
        }
      })
      .then((res)=>{
        console.log(res.data);
        $scope.status=res.status;
        console.log($scope.status);
        if(res.status === 200)
        {
          $scope.step=2; 
        }
        else if(res.status === 409)
        {
          console.log(res);
          $scope.errMsg=res.data;
        }
        
      }) 
    }

    $scope.dev_submit=function(){
    console.log($scope.dev_name);
    console.log($scope.dev_email);
      $http({
        url:'http://localhost:8000/dev/signup',
        method:'POST',
        data:{
          name:$scope.dev_name,
          emailId:$scope.dev_email,
        }
      }).then((res)=>{
        console.log("data has been saved: ",res.status);
      })
      .catch((err) => {
        console.log('Err: ', err);
      })

    }
    $scope.check_fields=function(){
      
      if(($scope.company_name==null)|| ($scope.email==null) ||($scope.phone==null)||($scope.address==null)||($scope.company_type==null)||($scope.password==null)||($scope.confirmPassword==null))
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

    $scope.check_password=function(){
      if($scope.password!==$scope.confirmPassword)
      {
         $scope.show=1;
         $scope.err="Password and confirm Password fields doesn't match";
         return true;  
      }
      else
      {

        return false;
      }
    }
    
})

app.controller('signinController',function($scope,$rootScope,$http,$state, authenticate)
{
  console.log("signinController called");
  $scope.click=1;
  $scope.style={'border':'2px solid #f26234','color':'white'};
  $scope.style1=$scope.style;

  authenticate.client()
  .then(function(data){
    if(data){
      $state.go('clientDashboard.jobPost');
    }
  })
  .catch(function(err){
    // console.log(err);
  })

  $scope.home=function(){
      $state.go('mainpage');
  }

  $scope.client_signin=function(){

    $http({
      url:'http://localhost:8000/client/signin',
      method:'POST',
      data:{
        emailId:$scope.clientUsername,
        password:$scope.clientPassword,
      }
      
    })
    .then((res)=>{
      //console.log(res.data.emailId);
     // $localStorage.companyId=res.data.emailId;
      $state.go('clientDashboard.jobPost');
      //$rootScope.companyname=res.data.companyName;
      //console.log($rootScope.dcompanyId);
      //console.log( $rootScope.dcompanyname);
    })
  }

  $scope.dev_signin=function(){
    $http({
      url:'http://localhost:8000/dev/signin',
      method:'POST',
      data:{
        emailId:$scope.dev_username,
        password:$scope.dev_password,
      }
    }).then((res)=>{
      console.log(res);
    })
  }

  $scope.checkClientFields=function(){
    if(($scope.clientUsername==null) || ($scope.clientPassword==null))
    {
      return true;
    }
    else
    {
      return false;
    }
  }
  $scope.checkDevFields=function(){
    if(($scope.dev_username==null)||(dev_password==null))
    {
      return true;
    }
    else
    {
      return false;
    }
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
  $http({
    url:'http://localhost:8000/client/clientCredentials',
    method:'GET',
  }).then((res)=>{
      $scope.clientData=res.data;
      $scope.companyname=$scope.clientData.companyName;
      $scope.companyemail=$scope.clientData.emailId;
      /***********************code for client picture left***********************/
  })
});

app.controller('jobPostController',function($state,$http,$rootScope,$scope, authenticate){
  
  authenticate.client()
  .then(function(check) {
    if(check){
      console.log('Restoring session');
    }
  })
  .catch(function(err) {
    $state.go('signin');
  });

  console.log('jobPostController called');

  $scope.giveSubcategory=function(technology){
    console.log(technology);
 
      /******code for displaying checkboxes on dropdown select******/
  }
});


app.controller('statController',function($state,$rootScope,$http){
  console.log('statController called');
});

app.controller('clientProfileController',function($state,$rootScope,$scope,$http){
  console.log("clientProfileController called");
});