let host = "http://localhost:8080/api/seat";
let host_seatScheduled = "http://localhost:8080/api/seat_scheduled";
let host_booking = "http://localhost:8080/api/booking";
let host_customer = "http://localhost:8080/api";
let host_movie_scheduled = "http://localhost:8080/api/movie_scheduled";
const app = angular.module("app", []);

app.controller("controller", function($scope, $http) {
	$scope.seats = [];
	$scope.seatsScheduled = [];
	$scope.booking = [];

	var url = window.location.href;
	var parts = url.split('/'); // Tách URL bằng dấu '/'
	var idRoom = parts[parts.length - 4]; // Lấy phần tử trước cuối (2)
	var day = parts[parts.length - 3];
	var timeStart = parts[parts.length - 2];
	var idMovieScheduled = parts[parts.length - 1];

	$scope.idRoom = idRoom;
	$scope.idMovieScheduled = idMovieScheduled;
	$scope.day = day;
	$scope.timeStart = timeStart;
	
	console.log(idRoom)
	console.log(day)
	console.log(timeStart)
	
	var url1 = "http://localhost:8080/pay/success?paymentId=PAYID-MVGZLIQ4RU36492C5915754R&token=EC-9JE66047438291340&PayerID=34VC8HZ42WVBA";
	var parts1 = url1.split('/'); // Tách URL bằng dấu '/'
	var statusPay = parts1[parts1.length - 1];
	console.log("statusPay",statusPay)

	//lay thoi gian hien tai hh:mm:ss
	function getCurrentTime() {
		const now = new Date();
		const hours = now.getHours().toString().padStart(2, '0');
		const minutes = now.getMinutes().toString().padStart(2, '0');
		const seconds = now.getSeconds().toString().padStart(2, '0');

		return hours + ':' + minutes + ':' + seconds;
	}

	// Gọi hàm và lấy giờ hiện tại định dạng "hh:mm:ss"
	$scope.currentTime = getCurrentTime();

	console.log($scope.currentTime);

	function getCurrentDate() {
		const now = new Date();
		const year = now.getFullYear();
		const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Tháng tính từ 0
		const day = now.getDate().toString().padStart(2, '0');

		return year + '-' + month + '-' + day;
	}

	// Gọi hàm và lấy ngày hiện tại định dạng "yyyy-MM-DD"
	$scope.currentDate = getCurrentDate();

	console.log($scope.currentDate);

	$scope.loadSeatByIdRoomAndLoadSeat_ScheduledByIdRoom = function(idRoom) {
		//loadSeatByIdRoom
		var url = `${host}/${idRoom}`;
		$http.get(url).then(resp => {
			$scope.seats = resp.data;
			var seats = resp.data;

			// Sắp xếp dữ liệu ghế theo "seat_row"
			seats.sort(function(a, b) {
				return a.seat_ROW.localeCompare(b.seat_ROW);
			});
			//in seat
			console.log("getLoadSeatById", seats);

			//loadSeatScheduledByIdRoom
			var url1 = `${host_seatScheduled}/${idRoom}/${day}/${timeStart}/${idMovieScheduled}`;
			$http.get(url1).then(resp => {
				$scope.seatsScheduled = resp.data;
				var getAllSeat_scheduledByIdRoom = resp.data;

				//in getAllSeat_scheduledByIdRoom
				console.log("getAllSeat_scheduledByIdRoom", getAllSeat_scheduledByIdRoom);

				//loadBookingByIdRoom
				var url2 = `${host_booking}/${idRoom}`;
				$http.get(url2).then(resp => {
					$scope.booking = resp.data;
					var getBookingByIdRoom = resp.data;

					console.log(getBookingByIdRoom);

					// Tạo mảng chứa hàng và cột tương ứng
					var seatRows = [];
					var currentRow = null;

					seats.forEach(function(seat) {
						if (currentRow !== seat.seat_ROW) {
							currentRow = seat.seat_ROW;
							seatRows.push({
								row: currentRow,
								seats: []
							});
						}
						seatRows[seatRows.length - 1].seats.push(seat);
					});

					$scope.seatRows = seatRows;

					// Mảng lưu trạng thái ghế đã chọn
					$scope.selectedSeats = [];

					// Tổng tiền
					$scope.totalAmount = 0;

					// Xử lý sự kiện khi checkbox thay đổi trạng thái
					$scope.onSeatChange = function(seat) {
						if (seat.isSelected) {
							$scope.selectedSeats.push(seat);
							if (seat.seat_TYPE === "ECO") {
								$scope.totalAmount += 10;
							} else if (seat.seat_TYPE === "VIP") {
								$scope.totalAmount += 20;
							}
						} else {
							var index = $scope.selectedSeats.indexOf(seat);
							if (index !== -1) {
								$scope.selectedSeats.splice(index, 1);
								if (seat.seat_TYPE === "ECO") {
									$scope.totalAmount -= 10;
								} else if (seat.seat_TYPE === "VIP") {
									$scope.totalAmount -= 20;
								}
							}
						}
						console.log('selectedSeats', $scope.selectedSeats);
						createFormObject();
						$scope.getIdSeat();
					};

					// Duyệt qua danh sách ghế và kiểm tra điều kiện
					angular.forEach($scope.seats, function(seat) {

						var matchingSeat = getAllSeat_scheduledByIdRoom.find(function(scheduledSeat) {

							var dayAndTimeSeatScheduled =
								new Date(scheduledSeat.id_BOOKING.id_MOVIE_SCHEDULED.date + ' ' + scheduledSeat.id_BOOKING.id_MOVIE_SCHEDULED.time_END);

							var dayAndTimeToday =
								new Date($scope.currentDate + ' ' + $scope.currentTime);
							return (
								scheduledSeat.id_SEAT.seat_NUMBER === seat.seat_NUMBER &&
								scheduledSeat.id_SEAT.seat_ROW === seat.seat_ROW &&
								scheduledSeat.id_SEAT.seat_TYPE === seat.seat_TYPE
								&& dayAndTimeSeatScheduled >= dayAndTimeToday
							);
						});
						if (matchingSeat) {
							// Ghế thỏa mãn điều kiện, đánh dấu và không vô hiệu hóa
							seat.isSelected = true;
							seat.isDisabled = true;
						} else {
							// Ghế không thỏa mãn điều kiện, không đánh dấu và vô hiệu hóa
							seat.isSelected = false;
							seat.isDisabled = false;
						}
					});
				});
			});
		}).catch(error => {
			console.log("Error", error);
		})
	}

	
	$scope.loadSeatByIdRoomAndLoadSeat_ScheduledByIdRoom(idRoom);

	$scope.userId = [];
	var userIdLogin = '';;
	$scope.loadIdUserLogin = function() {
		$http.get('http://localhost:8080/api/getUserId').then(function(response) {
			$scope.userId = response.data;
			userIdLogin = $scope.userId;
			console.log('idUserLogin', userIdLogin);
			createFormObject();
		});
	}

	function createFormObject() {
		$scope.form = {
			id_CUSTOMER: {
				id: userIdLogin
			},
			date: new Date(),
			id_MOVIE_SCHEDULED: {
				id: idMovieScheduled
			},
			status: true,
			price: $scope.totalAmount,
		}

	}


	$scope.loadIdUserLogin();



	$scope.customers = [];
	$scope.movie_Scheudled = [];
	$scope.booking_create = [];

	$scope.loadAllCustomers = function() {
		var url = `${host_customer}/user`;
		$http.get(url).then(resp => {
			$scope.customers = resp.data;
			console.log("AllCustomers", resp);
		}).catch(error => {
			console.log("Error", error);
		})
	}

	$scope.loadAllMovie_Scheduleds = function() {
		var url = `${host_movie_scheduled}/all`;
		$http.get(url).then(resp => {
			$scope.movie_scheduleds = resp.data;
			console.log("Allmovie_scheduleds", resp);
		}).catch(error => {
			console.log("Error", error);
		})
	}

	$scope.loadAllBooking = function() {
		var url = `${host_booking}/all`;
		$http.get(url).then(resp => {
			$scope.booking_create = resp.data;
			console.log("bookingsAll", resp);
		}).catch(error => {
			console.log("Error", error);
		})
	}

	$scope.ids = []; // Đặt biến ids ở cấp độ phạm vi của $scope

	$scope.getIdSeat = function() {
		$scope.ids = []; // Xóa danh sách IDs hiện có và thay thế bằng danh sách mới
		$scope.anotherArray = [...$scope.selectedSeats];
		for (var i = 0; i < $scope.anotherArray.length; i++) {
			$scope.ids.push($scope.anotherArray[i].id);
		}
		console.log("ids", $scope.ids);
		console.log("muarray", $scope.anotherArray);
	};

	var globalNewSeatId;

	$scope.insertSeats = function() {
		var url1 = `${host_seatScheduled}/${idRoom}/${day}/${timeStart}/${idMovieScheduled}`;
		$http.get(url1).then(resp => {
			$scope.seatsScheduled = resp.data;

			console.log("idsSeat", $scope.seatsScheduled);

			for (var i = 0; i < $scope.ids.length; i++) {
				if ($scope.ids[i] === $scope.idsSeat) {
					alert("Co ve cho ngoi ban chon da co nguoi nhanh tay hon");
					return;
				}


				for (var i = 0; i < $scope.ids.length; i++) {
					var seat = $scope.ids[i];
					var data = {
						id_SEAT: {
							id: seat
						},
						id_BOOKING: {
							id: globalNewSeatId
						}
					};
					$http.post('http://localhost:8080/api/seat_scheduled', data).then(function(response) {
						console.log('Seat inserted successfully:', response.data);
					}, function(error) {
						console.error('Error inserting seat:', error);
					});
				}
			}
		})
	};

	$scope.createBooking = function() {
		var booking = angular.copy($scope.form);
		var url = `${host_booking}`;
		$http.post(url, booking).then(resp => {
			$scope.booking_create.push(booking);
			$scope.loadAllBooking();
			// Lấy ID ghế vừa được thêm vào cơ sở dữ liệu
			var newSeatId = resp.data.id;
			globalNewSeatId = newSeatId;
			console.log("Bookingnew", resp);
			console.log('New seat ID:', newSeatId);

			// Gọi hàm insertSeats sau khi đã có globalNewSeatId
			$scope.insertSeats();
		}).catch(error => {
			console.log(error);
		});
	};
	$scope.movie_ScheduledById = [];
	$scope.getMovieScheduledById = function(){
		var url = `${host_movie_scheduled}/${idMovieScheduled}`;
		$http.get(url).then(resp =>{
			 $scope.movie_ScheduledById.push(resp.data);
        	 console.log("movie_ScheduledById", resp.data);
		})
		
	}

	$scope.loadAllCustomers();
	$scope.loadAllBooking();
	$scope.loadAllMovie_Scheduleds();
	$scope.getMovieScheduledById();
});