let host = "http://localhost:8080/api/seat";
let host_room = "http://localhost:8080/api/room";

const app = angular.module("app", []);
app.controller("controller", function ($scope, $http) {
    $scope.seat = [];
    $scope.rooms = [];
    $scope.form = {};

    $scope.loadAllSeat = function () {
        var url = `${host}/all`;
        $http
            .get(url)
            .then((resp) => {
                $scope.seat = resp.data;
                console.log("AllSeat", resp);
            })
            .catch((error) => {
                console.log("Error", error);
            });
    };

    $scope.loadAllRooms = function () {
        var url = `${host_room}/all`;
        $http.get(url).then(resp => {
            $scope.rooms = resp.data;
            console.log("AllRoom", resp);
        }).catch(error => {
            console.log("Error", error);
        })
    }

    $scope.seats = [];
    $scope.errorMessage = "";

    $scope.demoViewSeat = function () {
        $scope.seats = [];
        $scope.errorMessage = "";

        if ($scope.totalSeats == $scope.numRows * $scope.numColumns) {
            $scope.errorMessage = null;
        } else {
            $scope.errorMessage = "Not enough seats!";
            return;
        }

        var totalSeatsCreated = 0;
        for (var i = 1; i <= $scope.numRows; i++) {
            var row = [];
            for (var j = 1; j <= $scope.numColumns; j++) {
                if (totalSeatsCreated < $scope.totalSeats) {
                    var seatLabel = String.fromCharCode(64 + i);
                    row.push({
                        row: seatLabel,
                        column: j,
                    });
                    totalSeatsCreated++;
                }
            }
            $scope.seats.push(row);
        }
    };

    $scope.createSeats = function() {
        var movie_scheduled = angular.copy($scope.form);
        var seats = [];
        for (var i = 1; i <= $scope.numRows; i++) {
            for (var j = 1; j <= $scope.numColumns; j++) {
                seats.push({ 
                    seat_ROW: String.fromCharCode(64 + i), 
                    seat_NUMBER: j, 
                    id_ROOM: {
                        id: movie_scheduled.id,
                    }
                });
            }
        }

        console.log(seats);

        $http.post('http://localhost:8080/api/seat/create', seats, { headers: { 'Content-Type': 'application/json' } })
            .then(function(response) {
                console.log(response.data);
            }
        );
    };

    $scope.loadAllSeat();
    $scope.loadAllRooms();
});
