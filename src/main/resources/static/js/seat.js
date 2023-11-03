let host="http://localhost:8080/api/seat";

const app = angular.module("app",[]);
app.controller("controller", function($scope, $http){
    $scope.seat = [];
    
    $scope.loadAllSeat = function(){
        var url = `${host}/all`;
        $http.get(url).then(resp=>{
            $scope.seat = resp.data;
            console.log("AllSeat", resp);
        }).catch(error=>{
            console.log("Error", error);
        })
    }
    
    $scope.loadAllSeat();
});