console.log('1. Вёрстка соответствует макету. Ширина экрана 768px +24\n' +
    '2. Вёрстка соответствует макету. Ширина экрана 380px +24\n' +
    '3. Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки +15\n' +
    '4. На ширине экрана 380рх и меньше реализовано адаптивное меню +22\n' +
    'Итого 85 баллов (все пункты выполнены)'
)


window.addEventListener("load", (event) => {
    let menuBtn = document.querySelector('.menu-btn');
    let menu = document.querySelector('.menu');

    menuBtn.addEventListener('click', function(){
        menuBtn.classList.toggle('active');
        menu.classList.toggle('active');
    })
});

function closeBurger() {
    let menuBtn = document.querySelector('.menu-btn');
    let menu = document.querySelector('.menu');

    menuBtn.classList.toggle('active');
    menu.classList.toggle('active');
}


