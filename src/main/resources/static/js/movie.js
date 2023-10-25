let host="http://localhost:8080/api/movie";
const app = angular.module("app",[]);
app.controller("controller", function($scope, $http){
    $scope.form = {};
    $scope.movies = [];

    $scope.reset = function(){
        $scope.form = {};
    }

    $scope.loadAllMovies = function(){
        var url = `${host}`;
        $http.get(url).then(resp=>{
            $scope.movies = resp.data;
            resp.data.publish_DATE = new Date(resp.data.publish_DATE);
            console.log("AllMovies", resp);
        }).catch(error=>{
            console.log("Error", error);
        })
    }

    $scope.createMovie = function(){
        var movie = angular.copy($scope.form);
        var url = `${host}`;
        $http.post(url, movie).then(resp=>{
			resp.data.publish_DATE = new Date(resp.data.publish_DATE)
            $scope.movies.push(movie);
            $scope.reset();
            $scope.loadAllMovies();
            console.log("MovieNew", resp);
        }).catch(error=>{
            console.log(error);
        })
    }

    $scope.updateMovie = function(){
        var movie = angular.copy($scope.form);
        var url = `${host}/${$scope.form.id}`;
        $http.put(url, movie).then(resp=>{
            var index = $scope.movies.findIndex(movie => movie.id == $scope.form.id);
            $scope.movies[index] = resp.data;
            console.log("UpdateMovie", resp);
        }).catch(error=>{
            console.log("Error", error);
        })
    }

    $scope.edit = function(id){
        var url = `${host}/${id}`;
        $http.get(url).then(resp=>{
            $scope.form = resp.data;
            resp.data.publish_DATE = new Date(resp.data.publish_DATE);
            window.scrollTo(0, 0);
            console.log("MovieEdit", resp);
        }).catch(error=>{
            console.log("Error", error);
        })
    }
    
    //upload hinh anh
	$scope.imageChanged = function(files){
		var data = new FormData();
		data.append('file',files[0]);
		$http.post('http://localhost:8080/rest/upload/images',data,{
			transformRequest:angular.indentity,
			headers:{'Content-Type':undefined}
		}).then(resp=>{
			$scope.form.image = resp.data.name;
		}).catch(error =>{
			alert("loi updoad hinh")
			console.log(error)
		})
	}
	//reset
	$scope.reset= function(){
		$scope.form = {
			publish_DATE: new Date(),
			image:'cloud-upload.jpg',
			available: true
		}
	}

    $scope.delete = function(id){
        var url = `${host}/${id}`;
        $http.delete(url).then(reps=>{
            var index = $scope.movies.findIndex(movie => movie.id == id);
            $scope.movies.splice(index,1);
            console.log("MovieDelete", reps);
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
			return $scope.movies.slice(start, start + this.size);
		},
		get count(){
			return Math.ceil(1.0*$scope.movies.length/ this.size)
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
	
	$scope.loadAllMovies();
})