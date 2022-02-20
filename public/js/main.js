const cityName= document.getElementById('cityName');
const submitBtn= document.getElementById('submitBtn');

const city = document.getElementById('city');

const temp_status = document.getElementById('temp_status');
const temp_val = document.getElementById('temp_val');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const wind = document.getElementById('wind');

const datahidem = document.querySelector('.middle_layer');   // Data Hide/show before/after search
const datahideb = document.querySelector('.bottom_layer');

const getInfo = async(event) =>{
    event.preventDefault();
    // let url = api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={11e0d04a2273cf8ecd25eeef0422572f}
    let cityVal = cityName.value;
    if(cityVal === ""){
        city.innerText = `Please Enter city name before search`;
        datahidem.classList.add('data_hide');   // Default hidden
        datahideb.classList.add('data_hide'); 
    }else{
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=11e0d04a2273cf8ecd25eeef0422572f`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            
            city.innerText = `${arrData[0].name} , ${arrData[0].sys.country}`;
            temp_val.innerText = arrData[0].main.temp;
            pressure.innerText = arrData[0].main.pressure;
            humidity.innerText = arrData[0].main.humidity;
            wind.innerText = arrData[0].wind.speed;
            console.log(temp);
            const  tempMood = arrData[0].weather[0].main;
            console.log(tempMood);


            // fafa weather icon
            if(tempMood === "Clear"){
                temp_status.innerHTML = 
                "<i class='fas fa-sun' arial-hidden='true' style='color:yellow ;'></i>";
            }else if(tempMood === "Clouds"){
                temp_status.innerHTML = 
                "<i class='fas fa-cloud' arial-hidden='true' style='color:#4ec1e3 ;'></i>";
            }else if(tempMood === "Rain"){
                temp_status.innerHTML = 
                "<i class='fas fa-rain' arial-hidden='true' style='color:#4ec1e3 ;'></i>";
            }else{
                 temp_status.innerHTML = 
                "<i class='fas fa-cloud' arial-hidden='true' style='color:#4ec1e3 ;'></i>";
            }
            
            datahidem.classList.remove('data_hide'); //Remove class
            datahideb.classList.remove('data_hide');
        }catch{
           city.innerText = `Please Enter city name properly`;
           datahidem.classList.add('data_hide');
           datahideb.classList.add('data_hide');
        }

    }
}

submitBtn.addEventListener('click',getInfo);

// day
const day = document.getElementById('day');

const getCurrentDay = () =>{
    let weekday = new Array(7);
    weekday[0] = "Sunday";
    weekday[1] = "Monday";
    weekday[2] = "Tuesday";
    weekday[3] = "Wednesday";
    weekday[4] = "Thursday";
    weekday[5] = "Friday";
    weekday[6] = "Saturday";
    
    let tday = new Date();
    let days = weekday[tday.getDay()];
    
    day.innerText = days;
}

//date
const date = document.getElementById('date');

const getCurrentDate = () =>{
    let months = ["Jan","Feb","Mar","April","May","June","June","July","Aug","Sep","Oct","Nov","Dec"];
    
    let tdate = new Date();
    let dates = tdate.getDate();
    let month = months[tdate.getMonth()];
    let year = [tdate.getFullYear()];
    // console.log(date);
    // console.log(month);

    date.innerText = `${dates} ${month} ${year}`;



}