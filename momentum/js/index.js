setBackground();
startTime();
getDate();
getMessage();

const phrasisOfDay = [
    {
        "text": "Пишите код так, как будто сопровождать его будет склонный к насилию психопат, который знает, где вы живете",
        "author": "Стив Макконнелл"
    },
    {
        "text": "Сложность программы растет до тех пор, пока не превысит способности программиста",
        "author": "Артур Блох. Законы Мэрфи"
    },
    {
        "text": "Ходить по воде и разрабатывать программы, следуя ТЗ, очень просто… если они заморожены",
        "author": "И. Берард"
    }
];


const input = document.getElementsByClassName("name")[0];
input.addEventListener("keyup", logKey);
const city = document.getElementsByClassName("city")[0];
city.addEventListener("keyup", weather);
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const playBtn = document.querySelector(".play");

const audio = new Audio();
playBtn.addEventListener('click', playAudio);

function playAudio() {
    audio.src = 'https://7oom.ru/audio/naturesounds/07%20Birds%20(7oom.ru).mp3';
    audio.currentTime = 0;
    audio.play();
    playBtn.classList.toggle('pause');

    if (playBtn.classList.contains('pause')) {
        document.querySelector(".pause").addEventListener('click', pauseAudio);
    }
}

function pauseAudio() {
    if (!playBtn.classList.contains('pause')) {
        audio.pause();
    }
}

if (localStorage.getItem('name')) {
    input.value = localStorage.getItem('name');
}

if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
} else {
    city.value = 'Minsk';
}

getWeather();




async function getQuotes() {
    let num = Math.round(Math.random() * 2);
    document.querySelector(".quote").innerHTML = phrasisOfDay[num]["text"];
    document.querySelector(".author").innerHTML = phrasisOfDay[num]["author"];
}
getQuotes();








async function getWeather() {
    const apiKey = '08f2a575dda978b9c539199e54df03b0';
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city.value + "&lang=ru&appid=" + apiKey + "&units=metric";
    const res = await fetch(url);
    const data = await res.json();
    if (data.cod === "404") {
        document.querySelector(".weather-error").innerHTML = data.message;
        temperature.textContent = '';
        weatherDescription.textContent = '';
        wind.textContent = '';
        humidity.textContent = '';
        document.querySelector(".weather-icon").style.display = "none";
    } else {
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        weatherDescription.textContent = data.weather[0].description;
        document.querySelector(".weather-error").innerHTML = '';
        document.querySelector(".weather-icon").style.display = "block";
        wind.innerHTML = `Скорость ветра: ${Math.round(data.wind.speed)} м/с`;
        humidity.innerHTML = `Влажность: ${Math.round(data.main.humidity)} %`;
        console.log(data);
    }





}

















function slide(elem, to) {
    let currentNumber = +localStorage.getItem('image_number');

    if (currentNumber == 20 && to == 'next') {
        currentNumber = '1';
    } else if (to == 'next') {
        currentNumber++;
    } else if (currentNumber == 1 && to == 'prev') {
        currentNumber = '20';
    } else {
        currentNumber--;
    }

    localStorage.setItem('image_number', currentNumber);
    setBackground(checkTime(currentNumber))
}

function getDate() {
    const date = new Date();
    let month = date.toLocaleString('default', { month: 'long' });
    let dayName = date.toLocaleDateString('default', { weekday: 'long' })
    let day = date.getDate();
    document.getElementsByClassName('date')[0].innerHTML
        = dayName[0].toUpperCase() + dayName.slice(1) + ', ' + month[0].toUpperCase() + month.slice(1) + ' ' + day;
}

function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementsByClassName('time')[0].innerHTML = h + ":" + m + ":" + s;
    setTimeout(startTime, 1000);
}

function getMessage() {
    let welcomeMessages = {
        'morning': {
            'en': 'Good morning',
            'ru': 'Доброе утро',
            'by': 'Добрай раніцы',

        },
        'afternoon': {
            'en': 'Good afternoon',
            'ru': 'Добрый день',
            'by': 'Добры дзень',
        },
        'evening': {
            'en': 'Good evening',
            'ru': 'Добрый вечер',
            'by': 'Добры вечар',
        },
        'night': {
            'en': 'Good night',
            'ru': 'Доброй ночи',
            'by': 'Дабранач',
        }
    }
    let language = navigator.languages[0];
    let timeDay = getCurrentTimeDay();

    document.getElementsByClassName('greeting')[0].innerHTML = welcomeMessages[timeDay][language];
}

function getCurrentTimeDay() {
    const date = new Date();
    let h, index;

    h = date.getHours();

    if (h >= 6 && h < 12) {
        index = 'morning';
    } else if (h >= 12 && h < 18) {
        index = 'afternoon';
    } else if (h >= 18 && h < 24) {
        index = 'evening';
    } else {
        index = 'night';
    }

    return index;
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i
    }

    return i;
}

function logKey() {
    console.log(input.value)
    localStorage.setItem('name', input.value);
}

function weather() {
    console.log(city.value)
    localStorage.setItem('city', city.value);
    getWeather();
}

function setBackground(number = null) {
    const baseUrlImage = 'url(https://raw.githubusercontent.com/Andrei23232323-crypto/stage1-tasks/assets/images/';

    if (!number) {
        number = getRandomArbitrary(1, 20);
    }

    document.body.style.backgroundImage = baseUrlImage + getCurrentTimeDay() + '/' + number + '.jpg)';
}

function getRandomArbitrary(min, max) {
    let imageNumber = checkTime(Math.round(Math.random() * (max - min) + min));
    localStorage.setItem('image_number', imageNumber);

    return imageNumber;
}


