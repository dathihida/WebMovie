let host="http://localhost:8080/api/voucher";
const app = angular.module("app",[]);
app.controller("controller", function($scope, $http,  $filter){
    $scope.form = {};
    $scope.vouchers = [];

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

    $scope.loadAllVoucher = function(){
        var url = `${host}/all`;
        $http.get(url).then(resp=>{
            $scope.vouchers = resp.data;
            console.log("VoucherAll", resp);
        }).catch(error=>{
            console.log("Error", error);
        })
    }

    $scope.createVoucher = function(){
        var voucher = angular.copy($scope.form);
        var url = `${host}`;
        $http.post(url, voucher).then(resp=>{
            $scope.vouchers.push(voucher);
            $scope.reset();
            $scope.loadAllVoucher();
            console.log("VoucherNew", resp);
        }).catch(error=>{
            console.log(error);
        })
    }

    $scope.updateVoucher = function(){
        var voucher = angular.copy($scope.form);
        var url = `${host}/${$scope.form.id}`;
        $http.put(url, voucher).then(resp=>{
            var index = $scope.vouchers.findIndex(voucher => voucher.id == $scope.form.id);
            $scope.vouchers[index] = resp.data;
            $scope.updateStatusVoucher();
            console.log("Updatevoucher", resp);

        }).catch(error=>{
            console.log("Error", error);
        })
    }

    $scope.edit = function(id){
        var url = `${host}/${id}`;
        $http.get(url).then(resp=>{
            $scope.form = resp.data;
            console.log("MovieEdit", resp);
        }).catch(error=>{
            console.log("Error", error);
        })
    }

	//reset
	$scope.reset= function(){
		$scope.form = {}
	}

    $scope.updateStatusVoucher = function(){
        var url = `${host}/updateStatusVoucher`;
        $http.get(url).then(resp =>{

        })
    }
    
    //phan trang
	$scope.pager = {
		page:0,
		size:10,
		get items(){
			var start = this.page * this.size;
			return $scope.vouchers.slice(start, start + this.size);
		},
		get count(){
			return Math.ceil(1.0*$scope.vouchers.length/ this.size)
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
    $scope.loadAllVoucher();
    $scope.updateStatusVoucher();
})