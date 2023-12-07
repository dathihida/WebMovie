let host = "http://localhost:8080/api/room";

let host_cinemas = "http://localhost:8080/api/cinema";
const app = angular.module("app", []);
app.controller("controller", function ($scope, $http) {
    $scope.form = {};
    $scope.rooms = [];
    $scope.cinemas = [];

    $scope.reset = function () {
        $scope.form = {};
    }

    $scope.loadAllCinemas = function () {
        var url = `${host_cinemas}/all`;
        $http.get(url).then(resp => {
            $scope.cinemas = resp.data;
            console.log("AllCinemas", resp);
        }).catch(error => {
            console.log("Error", error);
        })
    }

    $scope.loadAllRooms = function () {
        var url = `${host}/all`;
        $http.get(url).then(resp => {
            $scope.rooms = resp.data;
            console.log("AllRoom", resp);
        }).catch(error => {
            console.log("Error", error);
        })
    }



    // =====================VALIDATION==============================
    $scope.checkAndcreateRoom = function () {
        // Xử lý kiểm tra và validation ở đây
        var isValid = checkValidate();

        if (isValid) {
            // Nếu validation thành công, gọi createRoom()
            $scope.createCinemas();
        }
    };
    $scope.checkAndupdateRoom = function () {
        // Xử lý kiểm tra và validation ở đây
        var isValid = checkValidate();

        if (isValid) {
            // Nếu validation thành công, gọi updateRoom()
            $scope.updateCinema();
        }
    };

    const nameEle = document.getElementById('name');
    const floatingSelectEle = document.getElementById('h1');
    

    const btnRoom1 = document.getElementById('btn1');
    const btnRoom2 = document.getElementById('btn2');
    const inputEles = document.querySelectorAll('.form-group');

    	// Nếu nhảy lỗi console đến đây thì copy 3 nút thêm,sửa, resset qua file html chứa file js này rồi chỉnh hidden
    btnRoom1.addEventListener('click', function () {
        Array.from(inputEles).map((ele) =>
            ele.classList.remove('success', 'error')
        );
    });
    btnRoom2.addEventListener('click', function () {
        Array.from(inputEles).map((ele) =>
            ele.classList.remove('success', 'error')
        );
    });


    function checkValidate() {
        let nameValue = nameEle.value;
        let floatingSelectValue = floatingSelectEle.value;

        let isCheck = true;

        if (nameValue == '') {
            setError(nameEle, 'This data must not be blank');
            isCheck = false;
        } else {
            setSuccess(nameEle);
        }

        if (floatingSelectValue === '') {
            setError(floatingSelectEle, 'You have not selected Cinema information');
            isCheck = false;
        } else {
            setSuccess(floatingSelectEle);
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


    function resetForm(ele) {
        // Xóa lớp error và success
        Array.from(inputEles).forEach(ele => ele.classList.remove('error', 'success'));
    
        // Thêm lớp normal
        Array.from(inputEles).forEach(ele => ele.classList.add('normal'));
    }
    
    // Gọi hàm resetForm khi nút reset được nhấn
    document.getElementById('btn3').addEventListener('click', resetForm);

    
    // =====================END VALIDATION==============================




    $scope.createCinemas = function () {
        var room = angular.copy($scope.form);
        var url = `${host}`;
        $http.post(url, room).then(resp => {
            $scope.rooms.push(room);
            $scope.reset();
            $scope.loadAllRooms();
            console.log("RoomNew", resp);
        }).catch(error => {
            console.log(error);
        })
    }

    $scope.updateCinema = function () {
        var room = angular.copy($scope.form);
        var url = `${host}/${$scope.form.id}`;
        $http.put(url, room).then(resp => {
            var index = $scope.rooms.findIndex(room => room.id == $scope.form.id);
            $scope.rooms[index] = resp.data;
            console.log("Updateroom", resp);
        }).catch(error => {
            console.log("Error", error);
        })
    }

    $scope.edit = function (id) {
        var url = `${host}/${id}`;
        $http.get(url).then(resp => {
            $scope.form = resp.data;
            console.log("RoomEdit", resp);
        }).catch(error => {
            console.log("Error", error);
        })
    }

    $scope.delete = function (id) {
        var url = `${host}/${id}`;
        $http.delete(url).then(reps => {
            var index = $scope.rooms.findIndex(room => room.id == id);
            $scope.rooms.splice(index, 1);
            console.log("RoomDelete", reps);
        }).catch(error => {
            console.log("Error", error);
        })
    }

    //phan trang
    $scope.pager = {
        page: 0,
        size: 10,
        get items() {
            var start = this.page * this.size;
            return $scope.rooms.slice(start, start + this.size);
        },
        get count() {
            return Math.ceil(1.0 * $scope.rooms.length / this.size)
        },
        first() {
            this.page = 0;
        },
        prev() {
            this.page--;
        },
        next() {
            this.page++;
        },
        last() {
            this.page = this.count - 1;
        }
    }

    $scope.loadAllRooms();
    $scope.loadAllCinemas();
});