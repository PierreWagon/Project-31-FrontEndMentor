// Toggle theme button
const toggle = document.getElementById('toggle');
let togglePos = 1;
const pageElements = [document.querySelectorAll('.normal'), document.querySelectorAll('.blue'), document.querySelectorAll('.red'), document.querySelectorAll('body'), document.querySelectorAll('.result-wrapper'), document.querySelectorAll('.input-wrapper'), document.querySelectorAll('.header-wrapper'), document.querySelectorAll('.switch-bg')];

toggle.addEventListener('click', e => {
    if (togglePos == 1) {
        toggle.style.transform = "translate(27px, -50%)";
        togglePos = 2;
        console.log(pageElements);
        pageElements.forEach(e => {
            e.forEach(j => {
                j.classList.add('two');
            })
        })
    }
    else if (togglePos == 2) {
        toggle.style.transform = "translate(58px, -50%)";
        togglePos = 3;
        console.log(pageElements);
        pageElements.forEach(e => {
            e.forEach(j => {
                j.classList.add('three');
                j.classList.remove('two');
            })
        })
    }
    else {
        toggle.style.transform = "translate(0px, -50%)";
        togglePos = 1;
        pageElements.forEach(e => {
            e.forEach(j => {
                j.classList.remove('three');
            })
        })
    }
})

//Making the calculator... calculate
const btn = document.querySelectorAll('.btn.normal');
const del = document.getElementById('del');
const reset = document.getElementById('reset');
const equal = document.getElementById('equal');
const inProgressDom = document.getElementById('in-progress');
const resultDom = document.getElementById('result');
let inProgress = "";
let inProgressHidden = "";
let isDot = false;

//collecting inputs
btn.forEach(e => {
    e.addEventListener('click', j => {
        // If user did not click on dot
        if (!e.classList.contains('dot')) {
            // If user clicks on a number |OR| if user clicks on operator but a number has already been entered and last input is a number
            if (!isNaN(parseInt(e.innerHTML,10)) || (inProgress.length > 0 && !isNaN(parseInt(inProgress.slice(-1),10)) && isNaN(parseInt(e.innerHTML)))) {
                inProgress = inProgress + e.innerHTML;
                inProgressDom.innerHTML = inProgress;
                // If user clicks on operator, resets dot using
                if (isNaN(parseInt(e.innerHTML,10))) {
                    isDot = false;
                }
            }
        }
        // If user clicks on dot
        else {
            if ((inProgress.length > 0 && !isNaN(parseInt(inProgress.slice(-1),10)) && !isDot)) {
                inProgress = inProgress + e.innerHTML;
                inProgressDom.innerHTML = inProgress;
                isDot = true; //Once you clicked on dot, you cannot click on it again until you finish to type your number (by clicking an operator)
            }
        }
        
    })
})

//deleting last digit
del.addEventListener('click', e => {
    inProgress = inProgress.slice(0,-1);
    inProgressDom.innerHTML = inProgress;
})

//resetting string
reset.addEventListener('click', e => {
    inProgress = "";
    resultDom.innerHTML = "0";
    inProgressDom.innerHTML = inProgress;
})

//calculating result
equal.addEventListener('click', e => {
    inProgressHidden = inProgress.replace(/x/g, "*");
    console.log(eval(inProgressHidden));
    if (eval(inProgressHidden) > 99999999) {
        resultDom.innerHTML = eval(inProgressHidden).toExponential(2);
    }
    else if (eval(inProgressHidden) < 1 ){
        resultDom.innerHTML = eval(inProgressHidden).toFixed(4);
    }
    else {
        resultDom.innerHTML = eval(inProgressHidden);
    }
})