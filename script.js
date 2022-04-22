let leftInput = document.querySelector('.left-input')
let rightInput = document.querySelector('.right-input')
let leftBtns = document.querySelectorAll('.left-btns li button')
let rightBtns = document.querySelectorAll('.right-btns li button')
let curr1 = "RUB"
let curr2 = "USD"
let ratesValue
leftBtns.forEach((item, index) => {
    item.addEventListener("click", (e) => {
        console.log(e.target.id);
        curr1 = e.target.id
        let r = e.target.parentElement.parentElement.children
        for (let i = 0; i < r.length; i++) {
            r[i].children[0].classList.remove('active');
        }
        e.target.classList.add('active');
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

    })
})

fetch(`https://api.exchangerate.host/latest?base=${curr1}&symbols=${curr2}`)
    .then(res => res.json()).then(data => console.log(data))


leftInput.addEventListener('keyup', () => {
    fetch(`https://api.exchangerate.host/latest?base=${curr1}&symbols=${curr2}`)
        .then(res => res.json()).then(data => {
            ratesValue = Object.values(data.rates)
        })
    rightInput.value = leftInput.value * ratesValue;
    console.log(rightInput.value);
})