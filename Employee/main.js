var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider, $locationProvider){
    $routeProvider
    .when('/home', {
        templateUrl: 'home.html',
    })
    .when('/listofemployee', {
        resolve: {
            "check": function($location, $rootScope) {
                if(!$rootScope.loggedIn) {
                    $location.path('/home');
                }
            }
        },
        templateUrl: 'listofemployee.html',
        controller: 'listctrl'
    })
    .when('/addemployee', {
                    templateUrl: 'addemployee.html'

    })
    .otherwise({
        redirectTo: '/home'
    });
});

myApp.controller('listctrl', function(dataservice, $scope, $location, $rootScope){

    if(! dataservice.data){
    dataservice.retrieveData().then(function(response){
        dataservice.data = response.data.records;
        $scope.mydata = dataservice.data;
    });
}
else{
    $scope.mydata = dataservice.data;
}

    $scope.editemp = function(index){
        dataservice.serviceindex=index;
        dataservice.objdata = dataservice.data[index];
        console.log('edit vado data'+dataservice.objdata);
        $location.path('/addemployee');


    }


    $scope.deleteemp = function(index){
        $scope.mydata.splice(index, 1);
        //$scope.user[index] = $scope.mydata[index];
        //console.log('delete',$scope.user[index]);
        //$scope.user[item].remove(item);
    }

    $scope.submit = function(){
        if($scope.username == 'admin' && $scope.password == 'admin'){
            $rootScope.loggedIn = true;
            console.log('clicked');
            $location.path('/listofemployee');
        }
        else{
            alert('Wrong Stuff');
        }
    }

});

myApp.controller('addempctrl', function(dataservice, $scope, $location){
        console.log('data with index'+dataservice.serviceindex);

        if(dataservice.serviceindex){
        $scope.user = [];
        $scope.user = angular.copy(dataservice.objdata);
            console.log('arrray'+$scope.user);

        $scope.addemp = function(){
            console.log('data with index'+dataservice.serviceindex);
            //console.log('dataservice data'+);
        dataservice.data.splice(dataservice.serviceindex, 1, $scope.user);
        console.log("USer"+$scope.user);
        console.log(dataservice.objdata);
        console.log('clicked');

        $location.path('/listofemployee');

        console.log($scope.user+'if n ander thi awe che')

            console.log("empty");
            dataservice.serviceindex=0;
        }

        }
        else  {
console.log("hi");
            $scope.addemp = function(){
            dataservice.data.push($scope.user);
            console.log(dataservice.data);
            //console.log($scope.user);
            $location.path('/listofemployee');
                $scope.user="";



        }
}
    });

myApp.service('dataservice', function($http){
    this.retrieveData = function(){
        return $http.get('Employee_Data.JSON')
    }
    this.data;
    this.objdata;
    this.serviceindex;
});

/*myApp.factory('dataservice', function($http){
    return {
        retrieveData : function(){
        return $http
        .get('Employee_Data.JSON');
    }
    }
    });*/  //this way you can make factory and used in controller

/*myApp.controller('addempctrl', function($scope, $rootScope){
    $scope.addemp = function(){
        $rootScope.id = $scope.empid;
        $rootScope.fn = $scope.fname;
        $rootScope.ln = $scope.lname;
        $rootScope.gender = $scope.gender;
        $rootScope.city = $scope.city;
        $rootScope.email = $scope.email;
        $rootScope.age = $scope.age;
        console.log('adCtrl' + $rootScope.id);
    }
});*/


