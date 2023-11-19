let host="http://localhost:8080/api/cinema";
const app = angular.module("app",[]);
app.controller("controller", function($scope, $http){
    $scope.form = {};
    $scope.cinemas = [];

    $scope.reset = function(){
        $scope.form = {};
    }

    $scope.loadAllCinemas = function(){
        var url = `${host}/all`;
        $http.get(url).then(resp=>{
            $scope.cinemas = resp.data;
            console.log("AllCinemas", resp);
        }).catch(error=>{
            console.log("Error", error);
        })
    }

    $scope.createCinemas = function(){
        var cinema = angular.copy($scope.form);
        var url = `${host}`;
        $http.post(url, cinema).then(resp=>{
            $scope.cinemas.push(cinema);
            $scope.reset();
            $scope.loadAllCinemas();
            console.log("CinemasNew", resp);
        }).catch(error=>{
            console.log(error);
        })
    }

    $scope.updateCinema = function(){
        var cinema = angular.copy($scope.form);
        var url = `${host}/${$scope.form.id}`;
        $http.put(url, cinema).then(resp=>{
            var index = $scope.cinemas.findIndex(cinema => cinema.id == $scope.form.id);
            $scope.cinemas[index] = resp.data;
            console.log("Updatecinemas", resp);
        }).catch(error=>{
            console.log("Error", error);
        })
    }

    $scope.edit = function(id){
        var url = `${host}/${id}`;
        $http.get(url).then(resp=>{
            $scope.form = resp.data;
            console.log("CinemaEdit", resp);
        }).catch(error=>{
            console.log("Error", error);
        })
    }

    $scope.delete = function(id){
        var url = `${host}/${id}`;
        $http.delete(url).then(reps=>{
            var index = $scope.cinemas.findIndex(cinema => cinema.id == id);
            $scope.cinemas.splice(index,1);
            console.log("cinemasDelete", reps);
        }).catch(error=>{
            console.log("Error", error);
        })
    }

    //phan trang
	$scope.pager = {
		page:0,
		size:10,
		get items(){
			var start = this.page * this.size;
			return  $scope.cinemas.slice(start, start + this.size);
		},
		get count(){
			return Math.ceil(1.0* $scope.cinemas.length/ this.size)
		},
		first(){
			this.page=0;
		},
		prev(){
			this.page--;
		},
		next(){
			this.page++;
		},
		last(){
			this.page = this.count-1;
		}
	}

    $scope.loadAllCinemas();
});