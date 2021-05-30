const API_KEY = '04e290851c41ee3b77a03e6119a422c0';

const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

searchBtn.addEventListener('click', setQuery);

function setQuery() {
    const searchValue = searchInput.value;
    getData(searchValue);
}

function getData(query) { // preuzimanje podataka sa servera i pretvaranje u JSON format
    // prikaz podataka preko funkcije displayResults()
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

function dateBuilder(d) { // formatiranje datuma po odredjenom formatu
    // konkretno u ovom slucaju u formatu  "4.11.2021" tipa (povratne vrednost su brojevi iz svih
    //dole koriscenih metoda za uzimanje podataka i baratanje sa datumima)
    let months = ["January", "February", "March", "April", "May", "June", "July", "August",
     "September",  "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    let day = days[d.getDay()]; // vraca BROJ, odnosno INDEX dana
    let date = d.getDate();    // vraca BROJ, odnosno dan, tj datum tipa 23.( koji je dan u mesecu)
    let month = months[d.getMonth()]; // vraca BROJ od 1-12(12 meseci u godini)
    let year = d.getFullYear(); // vraca trenutnu godinu(2021/2022 itd)
    
    return `${day}, ${date}, ${month}, ${year}`;
}