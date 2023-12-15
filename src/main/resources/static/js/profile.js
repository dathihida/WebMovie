let host = "http://localhost:8080/api";
const app = angular.module("app", []);
app.controller("profileController", function ($scope, $http) {
    $scope.form = {};
    $scope.customers = [];
    $scope.loadInfoCustomer = function () {
        var url = `${host}/customer/edit`
        $http.get(url)
            .then(function (response) {
                // Gán dữ liệu người dùng vào $scope.form
                $scope.form = response.data;
            })
            .catch(function (error) {
                console.error('Error fetching user info:', error);
            });
    };

    // =====================VALIDATION==============================
    $scope.checkAndcreateCustomer = function () {
        // Xử lý kiểm tra và validation ở đây
        var isValid = checkValidate();

        if (isValid) {
            // Nếu validation thành công, gọi createMovie()
            $scope.createCustomer();
        }
    };
    $scope.checkAndupdateCustomer = function () {
        // Xử lý kiểm tra và validation ở đây
        var isValid = checkValidate();

        if (isValid) {
            // Nếu validation thành công, gọi createMovie()
            $scope.updateCustomer();
        }
    };
    const fullnameEle = document.getElementById('fullname');
    const emailEle = document.getElementById('email');
    const numberphoneEle = document.getElementById('numberphone');
    const passwordEle = document.getElementById('password');

    const btnCustomer1 = document.getElementById('btn1');
    const btnCustomer2 = document.getElementById('btn2');
    const inputEles = document.querySelectorAll('.form-group');
    // Nếu nhảy lỗi console đến đây thì copy 3 nút thêm,sửa, resset qua file html chứa file js này rồi chỉnh hidden
    btnCustomer1.addEventListener('click', function () {
        Array.from(inputEles).map((ele) =>
            ele.classList.remove('success', 'error')
        );
    });
    btnCustomer2.addEventListener('click', function () {
        Array.from(inputEles).map((ele) =>
            ele.classList.remove('success', 'error')
        );
    });

    function checkValidate() {
        let fullnameValue = fullnameEle.value;
        let emailValue = emailEle.value;
        let numberphoneValue = numberphoneEle.value;
        let passwordValue = passwordEle.value;

        let isCheck = true;

        if (fullnameValue == '') {
            setError(fullnameEle, 'This data must not be blank');
            isCheck = false;
        } else {
            setSuccess(fullnameEle);
        }

        if (emailValue == '') {
            setError(emailEle, 'This data must not be blank');
            isCheck = false;
        } else if (!isEmail(emailValue)) {
            setError(emailEle, 'Email is not in the correct format');
            isCheck = false;
        } else {
            setSuccess(emailEle);
        }

        if (numberphoneValue == '') {
            setError(numberphoneEle, 'This data must not be blank');
            isCheck = false;
        } else if (!isPhone(numberphoneValue)) {
            setError(numberphoneEle, 'Phone number is not in the correct format');
            isCheck = false;
        } else {
            setSuccess(numberphoneEle);
        }

        if (passwordValue == '') {
            setError(passwordEle, 'This data must not be blank');
            isCheck = false;
        } else {
            setSuccess(passwordEle);
        }

        return isCheck;
    }

    function setSuccess(ele) {
        ele.parentNode.classList.add('success');
    }

    function setError(ele, message) {
        let parentEle = ele.parentNode;
        parentEle.classList.add('error');
        parentEle.querySelector('small').innerText = message;
    }

    function isEmail(email) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            email
        );
    }

    function isPhone(number) {
        return /(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(number);
    }

    function resetForm(ele) {
        // Xóa lớp error và success
        Array.from(inputEles).forEach(ele => ele.classList.remove('error', 'success'));

        // Thêm lớp normal
        Array.from(inputEles).forEach(ele => ele.classList.add('normal'));
    }

    // Gọi hàm resetForm khi nút reset được nhấn
    document.getElementById('btn3').addEventListener('click', resetForm);

    // =====================END VALIDATION==============================

    $scope.updateCustomer = function () {
        var customer = angular.copy($scope.form);
        var url = `${host}/user/v1/${$scope.form.id}`;
        $http.put(url, customer).then(resp => {
            var index = $scope.customers.findIndex(customer => customer.id == $scope.form.id);
            $scope.customers[index] = resp.data;
            console.log("UpdateCustomer", resp);
        }).catch(error => {
            console.log("Error", error);
        })
    }

    //upload hinh anh
	// $scope.imageChanged = function (files) {
	// 	var data = new FormData();
	// 	data.append('file', files[0]);
	// 	$http.post('http://localhost:8080/rest/upload/images', data, {
	// 		transformRequest: angular.indentity,
	// 		headers: { 'Content-Type': undefined }
	// 	}).then(resp => {
	// 		$scope.form.avatar = resp.data.name;
	// 	}).catch(error => {
	// 		alert("loi updoad hinh")
	// 		console.log(error)
	// 	})
	// }

    // upload image cloudinary
	$scope.uploadImage = function(files) {
        var data = new FormData();
        data.append('image', files[0]);

        $http.post('http://localhost:8080/cloudinary/upload', data, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).then(function(response) {
            $scope.form.avatar = response.data.public_id;
            console.log('Image uploaded successfully:', $scope.form.avatar);
        }).catch(function(error) {
            console.error('Error uploading image:', error);
        });
    };

    $scope.loadIdUserLogin = function () {
		$http.get('http://localhost:8080/api/getUserId').then(function (response) {
			$scope.userId = response.data;
			userIdLogin = $scope.userId;
			console.log('idUserLogin', userIdLogin);
			window.location.href = `http://localhost:8080/historyBooking/` + userIdLogin
		});
	}

    $scope.loadInfoCustomer();
});
