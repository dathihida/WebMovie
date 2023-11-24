const nameEle = document.getElementById('name');
const descriptionEle = document.getElementById('description');
const actorsEle = document.getElementById('actors');
const diretorsEle = document.getElementById('diretors');
const gerneEle = document.getElementById('gerne');
const trailerEle = document.getElementById('trailer');
const durationEle = document.getElementById('duration');
const dateEle = document.getElementById('date');
const imageEle = document.getElementById('formFile');


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
    let descriptionValue = descriptionEle.value;
    let actorsValue = actorsEle.value;
    let diretorsValue = diretorsEle.value;
    let gerneValue = gerneEle.value;
    let trailerValue = trailerEle.value;
    let durationValue = durationEle.value;
    let dateValue = dateEle.value;
    let imageValue = imageEle.value;

    let isCheck = true;

    if (nameValue == '') {
        setError(nameEle, 'This data must not be blank');
        isCheck = false;
    } else {
        setSuccess(nameEle);
    }

    if (descriptionValue == '') {
        setError(descriptionEle, 'This data must not be blank');
        isCheck = false;
    } else {
        setSuccess(descriptionEle);
    }

    if (actorsValue == '') {
        setError(actorsEle, 'This data must not be blank');
        isCheck = false;
    } else {
        setSuccess(actorsEle);
    }

    if (diretorsValue == '') {
        setError(diretorsEle, 'This data must not be blank');
        isCheck = false;
    } else {
        setSuccess(diretorsEle);
    }

    if (gerneValue == '') {
        setError(gerneEle, 'This data must not be blank');
        isCheck = false;
    } else {
        setSuccess(gerneEle);
    }

    if (trailerValue == '') {
        setError(trailerEle, 'This data must not be blank');
        isCheck = false;
    } else {
        setSuccess(trailerEle);
    }

    if (durationValue == '') {
        setError(durationEle, 'This data must not be blank');
        isCheck = false;
    } else if (!isDuration(durationValue)) {
        setError(durationEle, 'Duration is not in the correct format');
        isCheck = false;
    } else {
        setSuccess(durationEle);
    }

    // if (dateValue == '') {
    //     setError(dateEle, 'This data must not be blank');
    //     isCheck = false;
    // } else if (!isDate(dateValue)) {
    //     setError(dateEle, 'Date is not in the correct format');
    //     isCheck = false;
    // } else {
    //     setSuccess(dateEle);
    // }
    if (dateValue == '') {
        setError(dateEle, 'This data must not be blank');
        isCheck = false;
    } else {
        setSuccess(dateEle);
    }

    if (imageValue == '') {
        setError(imageEle, 'This data must not be blank');
        isCheck = false;
    } else {
        setSuccess(imageEle);
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


function isDuration(number) {
    return /^([1-2]\d|[1-9]\d*)$/.test(number);
}
/**
 * 
 */