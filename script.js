let leftInput = document.querySelector('.left-input')
let rightInput = document.querySelector('.right-input')
let leftBtns = document.querySelectorAll('.left-btns li button')
let rightBtns = document.querySelectorAll('.right-btns li button')
let curr1 = "RUB"
let curr2 = "USD"
let currency1 = document.querySelector(".currency1")
let currency2 = document.querySelector(".currency2")
let ratesValue
let navbar = document.querySelector(".navbar_btn")
let menu = document.querySelector(".menu")


navbar.addEventListener('click', () => {
    if (menu.classList.contains("responsive_class")) {
        menu.classList.remove("responsive_class")
    } else {
        menu.classList.add("responsive_class")
    }

})

function currencyFunc() {
    fetch(`https://api.exchangerate.host/latest?base=${curr1}&symbols=${curr2}`)
        .then(res => res.json()).then(data => {
            ratesValue = Object.values(data.rates)
            currency1.innerHTML = `
        1 ${curr1}=${ratesValue} ${curr2}
        `
            currency2.innerHTML = `
        1 ${curr2}=${1/ratesValue} ${curr1}
        `
        })


}
currencyFunc()

leftBtns.forEach((item, index) => {
    item.addEventListener("click", (e) => {
        console.log(e.target.id);
        curr1 = e.target.id
        let r = e.target.parentElement.parentElement.children
        for (let i = 0; i < r.length; i++) {
            r[i].children[0].classList.remove('active');
        }
        e.target.classList.add('active');
        currencyFunc()
    })
})
rightBtns.forEach((item, index) => {
    item.addEventListener('click', (e) => {
        console.log(e.target.id);
        curr2 = e.target.id
        let r = e.target.parentElement.parentElement.children
        for (let i = 0; i < r.length; i++) {
            r[i].children[0].classList.remove('active');
        }
        e.target.classList.add('active');
        currencyFunc()
    })
})

leftInput.addEventListener('keyup', () => {
    fetch(`https://api.exchangerate.host/latest?base=${curr1}&symbols=${curr2}`)
        .then(res => res.json()).then(data => {
            ratesValue = Object.values(data.rates)
            // console.log(ratesValue);

        })
    rightInput.value = leftInput.value * ratesValue;
    // console.log(rightInput.value);

})