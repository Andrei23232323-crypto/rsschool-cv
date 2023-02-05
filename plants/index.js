console.log('1. При нажатии на кнопки:Gardens,Lawn,Planting происходит смена фокуса на услугах в разделе service +50\n' +
    '2. Accordion в секции prices реализация 3-х выпадающих списков об услугах и ценах +50\n' +
    '3. В разделе contacts реализован select с выбором городов +25\n' +
    'Итого 125 баллов (все пункты выполнены)'
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

function selectService(elem) {
    if (elem.classList.contains('active-button-service')) {
        elem.classList.toggle('active-button-service');
    } else if (document.getElementsByClassName('active-button-service').length < 2) {
        elem.classList.toggle('active-button-service');
    }

    document.querySelector('#garden.active-button-service')
        ? removeClass(document.getElementsByClassName('garden'))
        : addClass(document.getElementsByClassName('garden'));
    document.querySelector('#planting.active-button-service')
        ? removeClass(document.getElementsByClassName('planting'))
        : addClass(document.getElementsByClassName('planting'));
    document.querySelector('#lawn.active-button-service')
        ? removeClass(document.getElementsByClassName('lawn'))
        : addClass(document.getElementsByClassName('lawn'));

    if (!document.querySelector('.active-button-service')) {
        removeClass(document.getElementsByClassName('lawn'));
        removeClass(document.getElementsByClassName('planting'));
        removeClass(document.getElementsByClassName('garden'));
    }
}

function addClass(elements) {
    for (const element of elements) {
        element.classList.add('blur-elem');
    }
}

function removeClass(elements) {
    for (const element of elements) {
        element.classList.remove('blur-elem');
    }
}

window.onload = function() {
    const accordionButtons = document.querySelectorAll(".accordion");

    accordionButtons.forEach((accordion) => {
        accordion.onclick = function () {
            let allOpened = document.getElementsByClassName('is-open');

            for (const element of allOpened) {
                this !== element ? element.classList.remove('is-open') : '';
            }

            this.classList.toggle("is-open");

            let accordionContent = this.nextElementSibling;

            if (accordionContent.style.maxHeight) {
                accordionContent.style.maxHeight = null;
            } else {
                let allAccordionContent = document.getElementsByClassName('accordion-content');

                for (const element of allAccordionContent) {
                    element.style.maxHeight = null;
                }

                accordionContent.style.maxHeight = accordionContent.scrollHeight + 20 + "px";
            }
        };
    });





// Change option selected
    const label = document.querySelector('.dropdown__filter-selected')
    const options = Array.from(document.querySelectorAll('.dropdown__select-option'))

    options.forEach((option) => {
        option.addEventListener('click', () => {
            label.textContent = option.textContent


            for (const element of document.getElementsByClassName('shop-data')) {
                element.style.display = 'none';
            }

            if (option.textContent === 'Canandaigua, NY') {
                document.getElementById('canandaigua').style.display = 'block';
            } else if (option.textContent === 'New York City') {
                document.getElementById('nyc').style.display = 'block';
            } else if (option.textContent === 'Yonkers, NY') {
                document.getElementById('yonkers').style.display = 'block';
            } else if (option.textContent === 'Sherrill, NY') {
                document.getElementById('sherrill').style.display = 'block';
            }
        })
    })

// Close dropdown onclick outside
    document.addEventListener('click', (e) => {
        const toggle = document.querySelector('.dropdown__switch')
        const element = e.target

        if (element === toggle) return;

        const isDropdownChild = element.closest('.dropdown__filter')

        if (!isDropdownChild) {
            toggle.checked = false
        }
    })
};
