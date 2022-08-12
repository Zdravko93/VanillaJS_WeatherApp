const API_KEY = '04e290851c41ee3b77a03e6119a422c0';

const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', setQuery);

function setQuery() {
    const searchValue = searchInput.value;
    getData(searchValue);
}

function getData(query) { 
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${API_KEY}`)
        .then(weather => {
            return weather.json();
        })
        .then(displayResults);

}

function displayResults(weather) {
    console.log(weather);
    let city = document.querySelector('.location');
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    // console.log(city); povratna informacija se ispisuje u vidu DIV elementa sa ispisom grada i drzave

    let date = document.querySelector('.date');
    let now = new Date();
    date.innerText = dateBuilder(now);
    date.style.color = 'white';
    date.style.fontSize = '20px';

    let temp = document.querySelector('.temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}°C`;
    temp.style.fontSize = '50px';
    temp.style.fontWeight = '900';
    temp.style.color = 'rgba(9, 56, 123, 1)';

    let weather_el = document.querySelector('.weather');
    weather_el.innerText = weather.weather[0].main;

    let hilow = document.querySelector('.min-max');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
    hilow.style.fontSize = '30px';
    hilow.style.color = 'rgba(9, 56, 123, 0.9)';
    hilow.style.fontWeight = 'bold';
}

function dateBuilder(d) { 
    let months = ["January", "February", "March", "April", "May", "June", "July", "August",
     "September",  "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    let day = days[d.getDay()]; 
    let date = d.getDate();   
    let month = months[d.getMonth()]; 
    let year = d.getFullYear(); 
    
    return `${day}, ${date}, ${month}, ${year}`;
}
