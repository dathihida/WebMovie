let host="http://localhost:8080/api/movie_scheduled";
let host_movie="http://localhost:8080/api/movie";
let host_room="http://localhost:8080/api/room";
let host_cinemas="http://localhost:8080/api/cinema";
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
    
    $scope.loadAllMovie_Scheduleds = function(){
        var url = `${host}/all`;
        $http.get(url).then(resp=>{
            $scope.movie_scheduleds = resp.data;
            console.log("Allmovie_scheduleds", resp);
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
        console.log(resp.data)
        for(var i=0; i< myDateObj.length; i++){
			var date = myDateObj[i].date_END;
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
	    	return movie.date_END === date;
	  	});
	}
    
    //select cinemas
    $scope.filterCinemas = function(id){
		var target_cinema_name = id;
            
	    $scope.filteredMovies = $scope.movie_scheduledsbyId.filter(function(movie) {
	    	return movie.id_ROOM.id_CINEMAS.name === target_cinema_name;
	  	});
	}


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
    $scope.loadAllMovie_Scheduleds();
    $scope.loadAllMovies();
    $scope.loadAllCinemas();
    $scope.loadAllRooms();
});