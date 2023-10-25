document.getElementById('date').innerHTML=Date();
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '6d4c702e3amsh4ac7e191e51c090p1954c0jsnb0fec7c5a1f7',
        'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
    }
};
let a;
function printvalue(a){
   
    if (a>95 && a<=100 ) {
        
        document.getElementById("myImg").src = "img/rain95-100.png"; 
        Cloud.innerHTML = "Heavy Rain";
    } else if (a>85 && a<=95 ) {
        
        document.getElementById("myImg").src = "img/rain85-95.png";
        Cloud.innerHTML = "Mostly Rain"
    } else if (a>70 && a<=85 ) {
        
        document.getElementById("myImg").src = "img/rain70-85.png";
        Cloud.innerHTML = "Rain"
    } else if (a>50 && a<=70 ) {
        
        document.getElementById("myImg").src = "img/rain50-70.png";
        Cloud.innerHTML = "Slow Rain"
    } else if (a>30 && a<=50 ) {
        
        document.getElementById("myImg").src = "img/rain30-50.png";
        Cloud.innerHTML = "Mostly Cloud"
    } else if (a>15 && a<=30 ) {
        
        document.getElementById("myImg").src = "img/rain15-30.png";
        Cloud.innerHTML = "Cloud"
    } else if (a>5 && a<=15 ) {
        
        document.getElementById("myImg").src = "img/rain5-15.png";
        Cloud.innerHTML = "Mostly Sunny"
    } else {
        
        document.getElementById("myImg").src = "img/rain0-5.png";
        Cloud.innerHTML = "Sunny"
        
    } 

}
const weatherGet = (city1)=>{
    
    cityName.innerHTML = city1
    fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city1, options)
    .then(response => response.json())
    .then(response => {
        const cl = response.cloud_pct;
         printvalue(cl)
        cloud_pct.innerHTML = response.cloud_pct
        temp.innerHTML = response.temp
        feels_like.innerHTML = response.feels_like
        humidity.innerHTML = response.humidity
        min_temp.innerHTML = response.min_temp
        max_temp.innerHTML = response.max_temp
        wind_speed.innerHTML = response.wind_speed
        // wind_degrees.innerHTML = response.wind_degrees
        // convert time to timestamp
        sunrise.innerHTML = convertUnixTimestampToTime(response.sunrise)
        sunset.innerHTML = convertUnixTimestampToTime(response.sunset)

    })
    .catch(err => console.error(err));  
}

// time converter // convert time to timestamp
function convertUnixTimestampToTime(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
}
// default city 
weatherGet("Lucknow");
// onclick wether 
submit.addEventListener("click" , ()=>{
    event.preventDefault()
    
    weatherGet(city.value);
    //store city name in local storage//
    if (localStorage.count) {
        localStorage.count = Number(localStorage.count)+1;
        localStorage.setItem(localStorage.count,city.value)
        console.log(localStorage.count)
        getWeather(localStorage.getItem(localStorage.count))
    } else {
        localStorage.count = 1;
    }
    ///////////////////////////////////////////////
})

// for table weather data 
const getWeather = (city) => {
    fetch('https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=' + city, options)
        .then(response1 => response1.json())
        .then(response1 => {
            const table = document.getElementById('weatherTable').getElementsByTagName('tbody')[0];
            const row = table.insertRow();
            // array for table data 
            const cells = [
                city,
                response1.cloud_pct,
                response1.temp,
                response1.feels_like,
                response1.humidity,
                response1.min_temp,
                response1.max_temp,
                response1.wind_speed,
                convertUnixTimestampToTime(response1.sunrise),
                convertUnixTimestampToTime(response1.sunset)
            ];
            // filling table by array data and city name 
            for (let i = 0; i < cells.length; i++) {
                const cell = row.insertCell(i);
                cell.textContent = cells[i];
            }
        })
        .catch(err => console.error(err));
};
// get weather and filling table according to city name 
// store city names in local storage 
if (localStorage.count) {
    var counter = localStorage.count;
    let loopno = counter > 5 ? 5 : counter;
    for(let i = 0; i < loopno; i++){
        getWeather(localStorage.getItem(counter)) // returns 5 city names 
        counter--;
    }
   
}

// change dropdown 
if (localStorage.count) {
    const dropdownMenu = document.getElementById('cityDropdown');
    let counter = localStorage.count;

    // Determine the loop count based on the condition
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





