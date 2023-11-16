let host_seatScheduled = "http://localhost:8080/api/seat_scheduled";
let host_booking = "http://localhost:8080/api/booking";
let host_pay = "http://localhost:8080/api/pay";
const app = angular.module("appBooking", []);

app.controller("controllerBooking", function($scope, $http, $interval, $timeout) {
	var url = window.location.href;
	var parts = url.split('/'); // Tách URL bằng dấu '/'
	var idBooking = parts[parts.length - 1];

	$scope.idBooking = idBooking;
	console.log("idBooking", idBooking);

	$scope.seat_scheduled = [];
	$scope.booking = [];

	$scope.stopClock = function() {
		if (intervalPromise) {
			$interval.cancel(intervalPromise);
		}
	}

	$scope.getBookingId = function(idBooking) {
		var url = `${host_booking}/v1/${idBooking}`;
		$http.get(url).then(resp => {
			
			if (resp.data && resp.data.startTime) {
				$scope.booking.push(resp.data);
				console.log("booking", resp.data);

				// Chuyển đổi chuỗi startTime thành đối tượng Date
				$scope.invoiceTime = new Date(resp.data.startTime);

				if(resp.data.status === "success"){
					$scope.elapsedTime = "Đã thanh toán";
				}else if(resp.data.status === "failed"){
					$scope.elapsedTime = "Thanh toán thất bại";
				}else{
					intervalPromise = $interval(function() {
						$scope.currentTime = new Date();
						
						// Kiểm tra xem currentTime và invoiceTime có phải là đối tượng Date hợp lệ hay không
						if (!isNaN($scope.currentTime) && !isNaN($scope.invoiceTime)) {
							// Tính thời gian đã trôi qua từ thời điểm tạo hóa đơn
							var elapsedTimeMilliseconds = $scope.currentTime - $scope.invoiceTime;
							$scope.elapsedTime = formatElapsedTime(elapsedTimeMilliseconds);
							
							// Kiểm tra nếu thời gian đã trôi qua lớn hơn 15 phút
							if (elapsedTimeMilliseconds > 15 * 60 * 1000) {
								// Hiển thị cảnh báo và dừng cập nhật thời gian
								$scope.elapsedTime = "Hết giờ";
								$interval.cancel(intervalPromise);
								$timeout(function() {
									//update status booking
									$http.get(`${host_booking}/updateFailed/${idBooking}`).then(resp => {
										console.log("updateFailed", resp.data);
										location.reload();
									})
								});
							}
						}
					}, 1000);
				}
					// Cập nhật thời gian hiện tại mỗi giây
					
				console.log(resp.data.status);
			}
		});
	}
	// Hàm chuyển đổi thời gian thành chuỗi dạng "giờ:phút:giây"
	function formatElapsedTime(milliseconds) {
		var seconds = Math.floor(milliseconds / 1000);
		var minutes = Math.floor(seconds / 60);

		return minutes % 60 + ':' + seconds % 60;
	}

	$scope.seatArray = [];

	$scope.getSeat_Scheduled = function(idBooking) {
		var url = `${host_seatScheduled}/v1/${idBooking}`;
		$http.get(url).then(resp => {
			$scope.seat_scheduled = resp.data;
			console.log("seat_scheduled", resp.data);
			$scope.seatArray = resp.data.map(function(booking) {
				return booking.id_SEAT;
			});
		})
	}

	//thanh toan
	$scope.thanhtoan = function(price) {
		var data = {
			price: price,
			intent: "Buy",
			method: "Online",
			currency: "VND",
			description: "Thanh toan tien ve xem phim",
			id_BOOKING: {
				id: idBooking
			}
		};
		console.log("data", data);
		
		// create pay
		$http.post(`${host_pay}`, data).then(resp => {
			console.log("pay", resp.data);
			//update status booking
			$http.get(`${host_booking}/update/${idBooking}`).then(resp => {
				console.log("update", resp.data);
				// id customer
				var url = `${host_booking}/v1/${idBooking}`;
				$http.get(url).then(resp => {
					console.log(resp.data)
					window.location.href = `http://localhost:8080/historyBooking/` + resp.data.id_CUSTOMER.id;
				})
			})
			$scope.stopClock();
		}).catch(error => {
			console.log("Error", error);
		})
	}
	$scope.getBookingId(idBooking);
	$scope.getSeat_Scheduled(idBooking);
});