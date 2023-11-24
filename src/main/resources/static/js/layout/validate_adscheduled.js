const floatingSelectEle = document.getElementById('floatingSelect');
const dateEle = document.getElementById('date');
const timestartEle = document.getElementById('timestart');
const timeendEle = document.getElementById('timeend');



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
    let floatingSelectValue = floatingSelectEle.value;
    let dateValue = dateEle.value;
    let timestartValue = timestartEle.value;
    let timeendValue = timeendEle.value;

    let isCheck = true;

    if (floatingSelectValue == '') {
        setError(floatingSelectEle, 'This data must not be blank');
        isCheck = false;
    } else {
        setSuccess(floatingSelectEle);
    }

    if (dateValue == '') {
        setError(date, 'This data must not be blank');
        isCheck = false;
    } else {
        setSuccess(date);
    }

    if (timestartValue == '') {
        setError(timestartEle, 'This data must not be blank');
        isCheck = false;
    } else {
        setSuccess(timestartEle);
    }

    if (timeendValue == '') {
        setError(timeendEle, 'This data must not be blank');
        isCheck = false;
    } else {
        setSuccess(timeendEle);
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


/**
 * 
 */