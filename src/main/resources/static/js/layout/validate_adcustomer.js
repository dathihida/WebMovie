const fullnameEle = document.getElementById('fullname');
const emailEle = document.getElementById('email');
const numberphoneEle = document.getElementById('numberphone');
const passwordEle = document.getElementById('password');



const btnRegister = document.getElementById('btn1');
const inputEles = document.querySelectorAll('.form-group');

btnRegister.addEventListener('click', function () {
    Array.from(inputEles).map((ele) =>
        ele.classList.remove('success', 'error')
    );
    let isValid = checkValidate();

    if (isValid) {
        // this.querySelector('#btn1').setAttribute('ng-click', 'createMovie(movieTitle)');
    }
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
/**
 * 
 */