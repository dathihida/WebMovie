let host_booking = "http://localhost:8080/api/booking";

const app = angular.module("app", []);

app.controller("controller", function($scope, $http) {

	$scope.userId = [];
	var userIdLogin = '';;
	$scope.loadIdUserLogin = function() {
		$http.get('http://localhost:8080/api/getUserId').then(function(response) {
			$scope.userId = response.data;
			userIdLogin = $scope.userId;
			$scope.getAllBookingByCustomer(userIdLogin);
			console.log('idUserLogin', userIdLogin);
		});
	}
	$scope.loadIdUserLogin();
	
	$scope.BookingByIdCustomer = [];
	$scope.getAllBookingByCustomer = function(userIdLogin){
		var url = `${host_booking}/profile/${userIdLogin}`;
		$http.get(url).then(resp =>{
			$scope.BookingByIdCustomer = resp.data;
			console.log("getAllBookingByCustomer",resp.data);
		})
	}
});