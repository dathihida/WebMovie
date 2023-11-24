const nameEle = document.getElementById('name');
const addressEle = document.getElementById('address');



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
    let nameValue = nameEle.value;
    let addressValue = addressEle.value;

    let isCheck = true;

    if (nameValue == '') {
        setError(nameEle, 'This data must not be blank');
        isCheck = false;
    } else {
        setSuccess(nameEle);
    }

    if (addressValue == '') {
        setError(addressEle, 'This data must not be blank');
        isCheck = false;
    } else {
        setSuccess(addressEle);
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

