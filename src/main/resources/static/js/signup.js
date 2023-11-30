let host="http://localhost:8080/add/userNoExist";
const app = angular.module("app",[]);
app.controller("controller", function($scope, $http){
    $scope.form = {};
    $scope.customers = [];

    $scope.reset = function(){
        $scope.form = {};
    }

    $scope.createCustomer = function(){
        var customer = angular.copy($scope.form);
        var url = `${host}`;
        $http.post(url, customer).then(resp=>{
            $scope.customers.push(customer);
            $scope.reset();
            console.log("CustomerNew", resp);
            window.location.href = `http://localhost:8080/login`;
        }).catch(error=>{
            console.log(error);
        })
    }
});