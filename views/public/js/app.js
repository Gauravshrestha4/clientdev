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
    return $http.get('http://localhost:8000/authenticate/client')
    .then(function(data) {
      if(data.status !== 200){
        console.log(data);
        return false;
      }
      else{
        console.log(data);
        return true;
      }
    })
    .catch(function(err) {
      throw err;
    })
  }
}]);

app.controller('mainpageController',function($scope,$rootScope,$state,$http,$window,authenticate){

  authenticate.client()
  .then((data)=>{
    if(data)
    {
      $state.go('clientDashboard.jobPost');
    }
  })
  .catch((err)=>{
    console.log("Session has not been created for this user");
  })

  $scope.navClass="big";
  $scope.headClass="heading";
  $scope.linkClass="li";
  $scope.headClasslink=".company_logo";
  $scope.navClass = 'whiteColor';
  $scope.docHeight=$window.innerHeight;
  angular.element($window).bind("scroll", function() {
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

app.controller('signupController', function($scope,$rootScope,$state,$http,$window,authenticate){
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
       state:$scope.state,
       city:$scope.city,
       zipCode:$scope.zip,
      }
     }).then((res)=>{
        $scope.company_name=null;
        $scope.email=null;
        $scope.phone=null;
        $scope.address=null;
        $scope.company_type=null;
        $scope.password=null;
        $scope.confirmPassword=null;
        $scope.state=null;
        $scope.city=null;
        $scope.zip=null;
       console.log(res.status);
       Materialize.toast(res.data,5000,'deep-orange darken-3');
       $state.go('signin');
     })
     .catch((err)=>{
      console.log(err);
      $scope.show=1;
      $scope.err=err.data;

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
      .catch((err)=>{
        console.log(err);
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
    .then((res,err)=>{
      if(res.status!=200)
      {
        $scope.err=err;
        $scope.clientUsername=null;
        $scope.clientPassword=null;
      }
      else
      {
        $state.go('clientDashboard.jobPost');
      }
      
    })
    .catch((err)=>{
      $scope.clientUsername=null;
      $scope.clientPassword=null;
      $scope.error=1;
      console.log(err.data);
      $scope.err=err.data;
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
    url:'http://localhost:8000/client/details',
    method:'GET',
  }).then((res)=>{
      $scope.clientData=res.data;
      $rootScope.companyemail=$scope.clientData.emailId;
      /***********************code for client picture left***********************/
  })
  $scope.signout=function(){
    $http({
      url:'http://localhost:8000/client/signout',
      method:'GET'
    }).then((res)=>{
      $state.go('mainpage');
    })
  }

});

app.controller('jobPostController',function($state,$http,$rootScope,$scope, authenticate){
  
  console.log('jobPostController called');
  authenticate.client()
  .then(function(check) {
    if(check){
      console.log('Restoring session'+check);
    }
  })
  .catch(function(err) {
    $state.go('signin');
  });

  $scope.postJob=function(){
    $http({
      url:'http://localhost:8000/client/postjob',
      method:'POST',
      data:{
        name:$scope.jobName,
        profileRequired:$scope.profile,
        category:$scope.technology,
        description:$scope.description,
        timePeriod:$scope.timePeriod,
        experience:$scope.experienceLevel,
        /*attachments:to be given */
        perks:$scope.perks,
        skills:$scope.selectedSkills,
      }
    })
    .then((response)=>{
      $scope.selectedSkills=[];
      $scope.jobName=null;
      $scope.profile=null;
      $scope.technology=null;
      $scope.description=null;
      $scope.timePeriod=null;
      $scope.experienceLevel=null;
      $scope.perks=null;
       Materialize.toast('Project has been posted successfully',3000,'deep-orange darken-3');
    })
  }
  $scope.checkFields=function(){
    if($scope.jobName==null || $scope.profile==null || $scope.technology==null ||  $scope.description==null || $scope.timePeriod==null ||  $scope.experienceLevel==null || $scope.perks==null)
    {
      return true;
    }
    else
      return false;
  }
  console.log("counttttt");
  $scope.giveSubcategory=function(technology){
  console.log(technology);
    $scope.select=1;
    if(technology=="Web Development")
    {
      $scope.skills=['HTML','CSS','Javascript','Bootstrap','AngularJS','ExpressJS','Php','MySQL','MongoDB','Materialize Css','Saas','Software Engineering'];
      console.log($scope.skills);
    }
  }

  /*$scope.add=function(skill){

    $scope.selectedSkills.push(skill);
    console.log($scope.selectedSkills);
  }*/
});


app.controller('statController',function($state,$rootScope,$http,$scope,authenticate){
  console.log('statController called');
  
  authenticate.client()
  .then(function(check) {
    if(check){
      console.log('Restoring session'+check);
    }
  })
  .catch(function(err) {
    $state.go('signin');
  });

  $scope.statoption=1;
  $scope.projcompdiv=function(){
    $scope.statoption=2;
  }

  $scope.backToStat=function()
  {
    $scope.statoption=1;
  }

  $scope.projrundiv=function(){
    $scope.statoption=3;
  }

  $scope.invoicesdiv=function()
  {
    $scope.statoption=4;
  }

  $scope.getProjCompData=function(){
    $http({
      url: 'http://localhost:8000/client/get-completed-project',
      method: 'GET'
    }).then(function(res){
      if(res.status!=200)
        console.log("bad");
      else
      {
        $scope.data=res.data;
        $rootScope.count=$scope.data.length;
      } 
    });
  }

  $scope.getProjRunData=function()
  {
    $http({
      url: 'http://localhost:8000/client/get-running-project',
      method: 'GET'
    }).then(function(res){
      if(res.status!=200)
        console.log("bad");
      else
      {
        $scope.dataprojrun=res.data;
        $rootScope.count1=$scope.dataprojrun.length;
      } 
    });
  }

  $scope.arrayToString=function(string)
  {
    return string.join(", ");
  }
});

app.controller('clientProfileController',function($state,$rootScope,$scope,$http,authenticate){
  console.log("clientProfileController called");
  authenticate.client()
  .then(function(check) {
    if(check){
      $http({
        url:'http://localhost:8000/client/details',
        method:'GET',
      })
      .then((res)=>{
        $scope.clientProfile=res.data;
        $scope.company=$scope.clientProfile.companyName;
       
        $scope.username=$scope.clientProfile.emailId;
        $scope.companyPhone=$scope.clientProfile.phone;
        $scope.type=$scope.clientProfile.companyType;
        $scope.desc=$scope.clientProfile.description;
        $scope.addr=$scope.clientProfile.address;
        $scope.state=$scope.clientProfile.state;
        $scope.city=$scope.clientProfile.city;
        $scope.zip=$scope.clientProfile.zipCode;
         //console.log($scope.username); 
      }) 
      .catch((err)=>{

      })

    }
  })
  .catch(function(err) {
    $state.go('signin');
  });

  $scope.updateAccountDetails=function(){
    $http({
      url:'http://localhost:8000/client/update-accountDetails',
      method:'POST',
      data:{
        companyName:$scope.company,
      }
    })
    .then((response)=>{
      Materialize.toast('Account details successfully updated',3000,'deep-orange darken-3');
      /*$http({
        url:'http://localhost:8000/client/clientDetails',
        method:'GET',
      })
      .then((response)=>{
        $scope.company=response.data.companyName;
      })*/
    })
    .catch((err)=>{
      console.log("Details cant be updated");
    })
  }

  $scope.updateCompanyDetails=function(){
    console.log("hrrllo");
    $http({
      url:'http://localhost:8000/client/update-companyDetails',
      method:'POST',
      data:{
        phone:$scope.companyPhone,
        companyType:$scope.type,
        description:$scope.desc,
        address:$scope.addr,
        state:$scope.state,
        city:$scope.city,
        zipCode:$scope.zip,
      }
    })
    .then((response)=>{
      Materialize.toast('Company details successfully updated',3000,'deep-orange darken-3');
    })
  }

});
