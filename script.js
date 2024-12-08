document.getElementById('date').innerHTML = Date();
const apiKey = 'aa454c8816fddea166c0736bb42f67af';

let a;

function printvalue(a) {
    if (a > 95 && a <= 100) {
        document.getElementById("myImg").src = "img/rain95-100.png";
        
        Cloud.innerHTML = "Heavy Rain";
    } else if (a > 85 && a <= 95) {
        document.getElementById("myImg").src = "img/rain85-95.png";
        
        Cloud.innerHTML = "Mostly Rain";
    } else if (a > 70 && a <= 85) {
        document.getElementById("myImg").src = "img/rain70-85.png";
        Cloud.innerHTML = "Rain";
    } else if (a > 50 && a <= 70) {
        document.getElementById("myImg").src = "img/rain50-70.png";
        Cloud.innerHTML = "Slow Rain";
    } else if (a > 30 && a <= 50) {
        document.getElementById("myImg").src = "img/rain30-50.png";
        Cloud.innerHTML = "Mostly Cloud";
    } else if (a > 15 && a <= 30) {
        document.getElementById("myImg").src = "img/rain15-30.png";
        Cloud.innerHTML = "Cloud";
    } else if (a > 5 && a <= 15) {
        document.getElementById("myImg").src = "img/rain5-15.png";
        Cloud.innerHTML = "Mostly Sunny";
    } else {
        document.getElementById("myImg").src = "img/rain0-5.png";
        Cloud.innerHTML = "Sunny";
    }
}

const weatherGet = (city1) => {
    cityName.innerHTML = city1;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city1}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(response => {
            const cl = response.clouds.all;
            printvalue(cl);
            cloud_pct.innerHTML = cl;  // Cloud percentage
            temp.innerHTML = response.main.temp;  // Current temperature in Celsius
            feels_like.innerHTML = response.main.feels_like;  // Feels-like temperature
            humidity.innerHTML = response.main.humidity;  // Humidity percentage
            min_temp.innerHTML = response.main.temp_min;  // Min temperature in Celsius
            max_temp.innerHTML = response.main.temp_max;  // Max temperature in Celsius
            wind_speed.innerHTML = response.wind.speed;  // Wind speed in m/s
            sunrise.innerHTML = convertUnixTimestampToTime(response.sys.sunrise);  // Sunrise time
            sunset.innerHTML = convertUnixTimestampToTime(response.sys.sunset);  // Sunset time
        })
        .catch(err => console.error(err));
};

// Time converter: convert Unix timestamp to readable time
function convertUnixTimestampToTime(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}

// Default city
weatherGet("Lucknow");

// On-click weather update
submit.addEventListener("click", (event) => {
    event.preventDefault();
    weatherGet(city.value);
    
    // Store city name in local storage
    if (localStorage.count) {
        localStorage.count = Number(localStorage.count) + 1;
        localStorage.setItem(localStorage.count, city.value);
        console.log(localStorage.count);
        getWeather(localStorage.getItem(localStorage.count));
    } else {
        localStorage.count = 1;
    }
});

// For table weather data
const getWeather = (city) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            const table = document.getElementById('weatherTable').getElementsByTagName('tbody')[0];
            const row = table.insertRow();
            
            // Array for table data
            const cells = [
                city,
                response.clouds.all,
                response.main.temp,
                response.main.feels_like,
                response.main.humidity,
                response.main.temp_min,
                response.main.temp_max,
                response.wind.speed,
                convertUnixTimestampToTime(response.sys.sunrise),
                convertUnixTimestampToTime(response.sys.sunset)
            ];
            
            // Filling table with data
            for (let i = 0; i < cells.length; i++) {
                const cell = row.insertCell(i);
                cell.textContent = cells[i];
            }
        })
        .catch(err => console.error(err));
};

// Populate table with stored cities
if (localStorage.count) {
    let counter = localStorage.count;
    let loopno = counter > 5 ? 5 : counter;
    for (let i = 0; i < loopno; i++) {
        getWeather(localStorage.getItem(counter));
        counter--;
    }
}

// Change dropdown
if (localStorage.count) {
    const dropdownMenu = document.getElementById('cityDropdown');
    let counter = localStorage.count;
    let loopno = counter > 5 ? 5 : counter;

    for (let i = 0; i < loopno; i++) {
        const cityName = localStorage.getItem(counter);
        if (cityName) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<a class="dropdown-item" href="#">${cityName}</a>`;
            dropdownMenu.appendChild(listItem);
            counter--;
        }
    }
}
