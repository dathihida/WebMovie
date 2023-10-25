let host="http://localhost:8080/api/room";

let host_cinemas="http://localhost:8080/api/cinema";
const app = angular.module("app",[]);
app.controller("controller", function($scope, $http){
    $scope.form = {};
    $scope.rooms = [];
    $scope.cinemas = [];

    $scope.reset = function(){
        $scope.form = {};
    }

    $scope.loadAllCinemas = function(){
        var url = `${host_cinemas}/all`;
        $http.get(url).then(resp=>{
            $scope.cinemas = resp.data;
            console.log("AllCinemas", resp);
        }).catch(error=>{
            console.log("Error", error);
        })
    }
    
     $scope.loadAllRooms = function(){
        var url = `${host}/all`;
        $http.get(url).then(resp=>{
            $scope.rooms = resp.data;
            console.log("AllRoom", resp);
        }).catch(error=>{
            console.log("Error", error);
        })
    }

    $scope.createCinemas = function(){
        var room = angular.copy($scope.form);
        var url = `${host}`;
        $http.post(url, room).then(resp=>{
            $scope.rooms.push(room);
            $scope.reset();
            $scope.loadAllRooms();
            console.log("RoomNew", resp);
        }).catch(error=>{
            console.log(error);
        })
    }

    $scope.updateCinema = function(){
        var room = angular.copy($scope.form);
        var url = `${host}/${$scope.form.id}`;
        $http.put(url, room).then(resp=>{
            var index = $scope.rooms.findIndex(room => room.id == $scope.form.id);
            $scope.rooms[index] = resp.data;
            console.log("Updateroom", resp);
        }).catch(error=>{
            console.log("Error", error);
        })
    }

    $scope.edit = function(id){
        var url = `${host}/${id}`;
        $http.get(url).then(resp=>{
            $scope.form = resp.data;
            console.log("RoomEdit", resp);
        }).catch(error=>{
            console.log("Error", error);
        })
    }

    $scope.delete = function(id){
        var url = `${host}/${id}`;
        $http.delete(url).then(reps=>{
            var index = $scope.rooms.findIndex(room => room.id == id);
            $scope.rooms.splice(index,1);
            console.log("RoomDelete", reps);
        }).catch(error=>{
            console.log("Error", error);
        })
    }
    $scope.loadAllRooms();
    $scope.loadAllCinemas();
});