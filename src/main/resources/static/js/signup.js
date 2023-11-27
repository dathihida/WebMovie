let host = "http://localhost:8080/add/userNoExist";
const app = angular.module("app", []);
app.controller("controller", function ($scope, $http) {
    $scope.form = {};
    $scope.customers = [];

    $scope.reset = function () {
        $scope.form = {};
    }


    $scope.createCustomer = function () {
        var customer = angular.copy($scope.form);
        var url = `${host}`;
        $http.post(url, customer).then(resp => {
            $scope.customers.push(customer);
            $scope.reset();
            console.log("CustomerNew", resp);
        }).catch(error => {
            console.log(error);
        })
    }


    // =====================VALIDATION==============================
    $scope.checkAndcreateCustomer = function () {
        // Xử lý kiểm tra và validation ở đây
        var isValid = checkValidateSignup();

        if (isValid) {
            // Nếu validation thành công, gọi createMovie()
            $scope.createCustomer();
        }
    };

    const fullnameEle = document.getElementById('name_signup');
    const emailEle = document.getElementById('email_signup');
    const numberphoneEle = document.getElementById('phonenumber_signup');
    const password_signupEle = document.getElementById('password_signup');
    const usernameEle = document.getElementById('username');
    const passwordEle = document.getElementById('password');

    const btnSignin = document.getElementById('btn1');
    const btnSignup = document.getElementById('btn2');
    const inputEles = document.querySelectorAll('.form-group');

    btnSignin.addEventListener('click', function () {
        Array.from(inputEles).map((ele) =>
            ele.classList.remove('success', 'error')
        );

    });

    btnSignup.addEventListener('click', function () {
        Array.from(inputEles).map((ele) =>
            ele.classList.remove('success', 'error')
        );
    });


    //--------------------- Sign in------------
    function checkValidateSignin() {
        let usernameValue = usernameEle.value;
        let passwordValue = passwordEle.value;


        let isCheck = true;

        if (usernameValue == '') {
            setError(usernameEle, '***');
            isCheck = false;
        } else if (!isEmail(usernameValue)) {
            setError(usernameEle, '*Email format xyz@gmail.com');
            isCheck = false;
        } else {
            setSuccess(usernameEle);
        }

        if (passwordValue == '') {
            setError(passwordEle, '***');
            isCheck = false;
        } else {
            setSuccess(passwordEle);
        }

        return isCheck;
    }


    // --------------Sign up---------------------
    function checkValidateSignup() {
        let fullnameValue = fullnameEle.value;
        let emailValue = emailEle.value;
        let numberphoneValue = numberphoneEle.value;
        let password_signupValue = password_signupEle.value;


        let isCheck = true;

        if (fullnameValue == '') {
            setError(fullnameEle, '***');
            isCheck = false;
        } else {
            setSuccess(fullnameEle);
        }

        if (emailValue == '') {
            setError(emailEle, '***');
            isCheck = false;
        } else if (!isEmail(emailValue)) {
            setError(emailEle, '*xyz@gmail.com');
            isCheck = false;
        } else {
            setSuccess(emailEle);
        }

        if (numberphoneValue == '') {
            setError(numberphoneEle, '***');
            isCheck = false;
        } else if (!isPhone(numberphoneValue)) {
            setError(numberphoneEle, '*+84xxxxxxxxx');
            isCheck = false;
        } else {
            setSuccess(numberphoneEle);
        }

        if (password_signupValue == '') {
            setError(password_signupEle, '***');
            isCheck = false;
        } else {
            setSuccess(password_signupEle);
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
    // =====================END VALIDATION==============================





});