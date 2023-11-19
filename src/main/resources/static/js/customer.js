let host="http://localhost:8080/api";
const app = angular.module("app",[]);
app.controller("controller", function($scope, $http){
    $scope.form = {};
    $scope.customers = [];

    $scope.reset = function(){
        $scope.form = {};
    }

    $scope.loadAllCustomers = function(){
        var url = `${host}/user`;
        $http.get(url).then(resp=>{
            $scope.customers = resp.data;
            console.log("AllCustomers", resp);
        }).catch(error=>{
            console.log("Error", error);
        })
    }

    $scope.createCustomer = function(){
        var customer = angular.copy($scope.form);
        var url = `${host}/user`;
        $http.post(url, customer).then(resp=>{
            $scope.customers.push(customer);
            $scope.reset();
            $scope.loadAllCustomers();
            console.log("CustomerNew", resp);
        }).catch(error=>{
            console.log(error);
        })
    }
    
    $scope.createCustomerNoExist = function(){
        var customer = angular.copy($scope.form);
        var url = `http://localhost:8080/add/userNoExist`;
        $http.post(url, customer).then(resp=>{
            $scope.customers.push(customer);
            $scope.reset();
            $scope.loadAllCustomers();
            console.log("CustomerNew", resp);
        }).catch(error=>{
            console.log(error);
        })
    }

    $scope.updateCustomer = function(){
        var customer = angular.copy($scope.form);
        var url = `${host}/user/v1/${$scope.form.id}`;
        $http.put(url, customer).then(resp=>{
            var index = $scope.customers.findIndex(customer => customer.id == $scope.form.id);
            $scope.customers[index] = resp.data;
            console.log("UpdateCustomer", resp);
        }).catch(error=>{
            console.log("Error", error);
        })
    }

    $scope.edit = function(name){
        var url = `${host}/find/${name}`;
        $http.get(url).then(resp=>{
            $scope.form = resp.data;
            console.log("CustomerEdit", resp);
        }).catch(error=>{
            console.log("Error", error);
        })
    }

    $scope.delete = function(id){
        var url = `${host}/${id}`;
        $http.delete(url).then(reps=>{
            var index = $scope.customers.findIndex(customer => customer.id == id);
            $scope.customers.splice(index,1);
            console.log("CustomerDelete", reps);
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
			return $scope.customers.slice(start, start + this.size);
		},
		get count(){
			return Math.ceil(1.0*$scope.customers.length/ this.size)
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
    
    
    $scope.loadAllCustomers();
});