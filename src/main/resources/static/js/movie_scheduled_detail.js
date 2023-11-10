let host="http://localhost:8080/api/movie_scheduled";
let host_movie="http://localhost:8080/api/movie";
let host_room="http://localhost:8080/api/room";
let host_cinemas="http://localhost:8080/api/cinema";
let host_booking = "http://localhost:8080/api/booking/update";
const app = angular.module("app",[]);
app.controller("controller", function($scope, $http){
    $scope.form = {};
    
    $scope.movie_scheduleds = [];
	$scope.movies = [];
	$scope.rooms = [];
	$scope.cinemas = [];
	
	
	
	$scope.movie_scheduledsbyId = [];
	
    $scope.reset = function(){
        $scope.form = {};
    }
    
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
	
    $scope.loadAllMovie_Scheduleds = function(){
        var url = `${host}/all`;
        $http.get(url).then(resp=>{
            $scope.movie_scheduleds = resp.data;
            console.log("Allmovie_scheduleds", resp);
            
            var getAllMovieScheduled = $scope.movie_scheduleds;
            
            var findMovie = getAllMovieScheduled.find(function(movie){
				var dayTimeMovie = new Date(movie.date +' ' + movie.time_END);
				var datTimeToday = new Date($scope.currentDate + ' ' + $scope.currentTime);
				
				return (
					dayTimeMovie < datTimeToday
				);
			})
			
			if(findMovie){
				$scope.updateStatusBooking();
			}else{
				
			}
            
        }).catch(error=>{
            console.log("Error", error);
        })
    }
    
	$scope.inputValue = document.getElementById("movieId").value;
	$scope.selectedValue = "";
	$scope.selectedDate = "";
	
	//loadListMovieScheduledByID
	$scope.loadMovie_ScheduledsById = function(id){
		//filter date json
	    var displayedDates = [];

        var url = `${host}/detail/${id}`;
        $http.get(url).then(resp=>{
            $scope.movie_scheduledsbyId = resp.data;
            var myDateObj = resp.data;
        console.log("myDateObj",resp.data)
        for(var i=0; i< myDateObj.length; i++){
			var date = myDateObj[i].date;
			if(displayedDates.indexOf(date) === -1){
				displayedDates.push(date);
				$scope.displayedDates = displayedDates;
			}
		}   
        console.log("loadMovie_ScheduledsById", resp.data); 
        }).catch(error=>{
            console.log("Error", error);
        })
    }

    //Filter date
    $scope.filterDate = function(id){
		var date = id;
		$scope.filterMovieDate = $scope.movie_scheduledsbyId.filter(function(movie) {
			var dayTimeToDay = new Date($scope.currentTime);
			var dayTimeMovie = new Date(movie.time_END);

	    	return movie.date === date;
	    	
	    	
	  	});
	  	console.log("filterMovieDate", $scope.filterMovieDate);
	  	
	  	
	}
    
    //select cinemas
    $scope.filterCinemas = function(id){
		var target_cinema_name = id;
            
	    $scope.filteredMovies = $scope.movie_scheduledsbyId.filter(function(movie) {
	    	return movie.id_ROOM.id_CINEMAS.name === target_cinema_name;
	  	});
	}

  	// Hàm kiểm tra xem một mục có nên hiển thị hay không
  	$scope.isFutureEvent = function(movieOfCinemas) {
	  	var endTime = new Date(movieOfCinemas.date + ' ' + movieOfCinemas.time_END);
	  	var currentDateTime = new Date($scope.currentDate + ' ' + $scope.currentTime);
	  		// Kiểm tra xem có dữ liệu hay không
			if (endTime < currentDateTime) {
	        // Nếu không có dữ liệu, hiển thị thông báo
	        	$scope.noDataMessage = "Đã hết thời gian lên phim";
	   		 } else {
	        // Nếu có dữ liệu, đặt thông báo về null
	       		$scope.noDataMessage = null;
	    	}
	  	return endTime > currentDateTime;
	};

	$scope.loadAllMovies = function(){
        var url = `${host_movie}/all`;
        $http.get(url).then(resp=>{
            $scope.movies = resp.data;
            console.log("AllMovies", resp);
        }).catch(error=>{
            console.log("Error", error);
        })
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
    
    $scope.editCinemas = function(id){
        var url = `${host_cinemas}/${id}`;
        $http.get(url).then(resp=>{
            $scope.form = resp.data;
            console.log("CinemaEdit", resp);
        }).catch(error=>{
            console.log("Error", error);
        })
    }
    
    $scope.editCinemasAndRoom = function(IdRoom, IdCinemas){
        var url = `${host_room}/${IdRoom}/${IdCinemas}`;
        $http.get(url).then(resp=>{
            $scope.form = resp.data;
            console.log("editCinemasAndRoom", resp);
        }).catch(error=>{
            console.log("Error", error);
        })
    }
    
     $scope.loadAllRooms = function(){
        var url = `${host_room}/all`;
        $http.get(url).then(resp=>{
            $scope.rooms = resp.data;
            console.log("AllRoom", resp);
        }).catch(error=>{
            console.log("Error", error);
        })
    }

    $scope.createmovie_scheduled = function(){
        var movie_scheduled = angular.copy($scope.form);
        var url = `${host}`;
        $http.post(url, movie_scheduled).then(resp=>{
            $scope.movie_scheduleds.push(movie_scheduled);
            $scope.reset();
            $scope.loadAllMovie_Scheduleds();
            console.log("MovieNew", resp);
        }).catch(error=>{
            console.log(error);
        })
    }

    $scope.updatemovie_scheduled = function(){
        var movie_scheduled = angular.copy($scope.form);
        var url = `${host}/${$scope.form.id}`;
        $http.put(url, movie_scheduled).then(resp=>{
            var index = $scope.movie_scheduleds.findIndex(movie_scheduled => movie_scheduled.id == $scope.form.id);
            $scope.movie_scheduleds[index] = resp.data;
            console.log("Updatemovie_scheduled", resp);
        }).catch(error=>{
            console.log("Error", error);
        })
    }

    $scope.edit = function(id){
        var url = `${host}/${id}`;
        $http.get(url).then(resp=>{
            $scope.form = resp.data;
            console.log("movie_scheduledEdit", resp);
        }).catch(error=>{
            console.log("Error", error);
        })
    }

    $scope.delete = function(id){
        var url = `${host}/${id}`;
        $http.delete(url).then(reps=>{
            var index = $scope.movie_scheduleds.findIndex(movie_scheduled => movie_scheduled.id == id);
            $scope.movie_scheduleds.splice(index,1);
            console.log("movie_scheduledsDelete", reps);
        }).catch(error=>{
            console.log("Error", error);
        })
    }
    
    $scope.updateStatusBooking = function(){
        var url = `${host_booking}`;
        $http.get(url).then(resp=>{
            console.log("updateStatusBooking", resp);
        }).catch(error=>{
            console.log("Error", error);
        })
    }
    
    $scope.loadAllMovie_Scheduleds();
    $scope.loadAllMovies();
    $scope.loadAllCinemas();
    $scope.loadAllRooms();
    
});