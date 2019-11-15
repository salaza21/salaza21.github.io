var pageNav = document.querySelector('#page-nav');
var statusContainer = document.querySelector('#status');
var contentContainer = document.querySelector('#main-content');
var locStore = window.localStorage;
var sessStore = window.sessionStorage;
let weatherURL = "/weather/locations/js/idahoweather.json";

let title = document.querySelector('#page-title');
document.addEventListener("DOMContentLoaded", function(){
    //buildModDate();
    // Variables for Wind Chill function
    let temp = 31;
    let speed = 12;
    buildWC(speed,temp);
    // The time indictor function
    var today = new Date();
    var time = today.getHours();
    let hour= time;
    if (hour > 12) {
        hour -= 12;
    } 
    console.log(hour);
    timeBall(hour);
    // Three DOM structures
    fetchWeatherData(weatherURL);



})

// Calculate the Windchill
function buildWC(speed, temp) {
    let feelTemp = document.getElementById('feelTemp');
    let highTemp = document.getElementById('high');
    let lowTemp = document.getElementById('low');
    let currentTemp = document.getElementById('current');
    let windSpeed = document.getElementById('wind');
    let windGusts = document.getElementById('gusts');
    let high = temp + 15;
    let low = temp - 12;
    highTemp.innerHTML = high + '&#176;';
    lowTemp.innerHTML = low + '&#176;';
    currentTemp.innerHTML = temp + '&#176;' + 'F';
    windSpeed.innerHTML =  speed + ' mph      ';
    windGusts.innerHTML = 'Gusts: ' + (speed + 2) + ' mph';
    // Compute the windchill
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc);
    wc = Math.floor(wc);
    // Display the windchill
    console.log(wc);
    wc = 'Feels like ' + wc + '&deg;F';
    feelTemp.innerHTML = wc;
}
function toggleMenu(){
    document.getElementById("primaryNav").classList.toggle("hide");
}

function footerDate() {
    var date = new Date();
    var realDate = date.getDate();
    var day = new Date();
    var numDay = day.getDay();
    var monthy = new Date();
    var mm = monthy.getMonth();
    var yyyy = new Date();
    var year = yyyy.getFullYear();

    var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var nameWeek = week[numDay];

    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var nameMonth = month[mm];

    var fullDate = nameWeek + "," + " " + realDate + " " + nameMonth + " " + year;

    document.getElementById("today").innerHTML = fullDate;

}
function timeBall(hour){
    // Find all "ball" classes and remove them
    let x = document.querySelectorAll(".ball");
    for (let item of x){
        console.log(item);
        item.classList.remove("ball");
    }

    // Find all hours that match the parameter and add the "ball" class
    let hr = document.querySelectorAll(".i"+hour);
    for (let item of hr){
        item.classList.add("ball");
    }

}
// Changes the background image
function changeSummaryImage(weather){
    // gets the section Id

    let x = document.getElementById('containers'); 
    // this changes everything entered into lowercase
     weather = weather.toLowerCase();

     // adds the class name to change the backgorund image
    console.log(weather);
     switch(weather){
        case"fog":
        x.className += 'fog';
        break;
         case "rain":
            x.className += 'rain';
         break;
         
         case"snow":
            x.className += 'snow';
         break;
         case"clouds":
         x.className += 'clouds';
         break;
         case "clear":
            x.className += 'clear';
         break;
     }       
    }
    /* *************************************
    *  Fetch Weather Data
    ************************************* */
    function fetchWeatherData(weatherURL){
    let cityName = title.dataset.title; // The data we want from the weather.json file
    fetch(weatherURL)
    .then(function(response) {
    if(response.ok){
    return response.json();
    }
    throw new ERROR('Network response was not OK.');
    })
    .then(function(data){
      // Check the data object that was retrieved
      console.log(data);
      // data is the full JavaScript object, but we only want the preston part
      // shorten the variable and focus only on the data we want to reduce typing
      let p = data[cityName];
  
      // **********  Get the location information  **********
      let locName = p.properties.relativeLocation.properties.city;
      let locState = p.properties.relativeLocation.properties.state;
      // Put them together
      let fullName = locName+', '+locState;
      // See if it worked, using ticks around the content in the log
      sessStore.setItem("fullName", fullName);
      console.log(`fullName is: ${fullName}`);
      // Get the longitude and latitude and combine them to
      // a comma separated single string
      let locLatitude = p.properties.relativeLocation.geometry.coordinates[0];
      let locLongitude = p.properties.relativeLocation.geometry.coordinates[1];
      let coordinates = locLatitude+', '+locLongitude;
      sessStore.setItem("coordinates", coordinates);
      console.log(`Coordinates are: ${coordinates}`);
      // Create a JSON object containing the full name, latitude and longitude
      // and store it into local storage.
      const prestonData = JSON.stringify({fullName, coordinates});
      locStore.setItem("Preston,ID", prestonData);
      // **********  Get the current conditions information  **********
      // As the data is extracted from the JSON, store it into session storage
      // Get the temperature data
      let temperature = p.properties.relativeLocation.properties.temperature;
      console.log(`temperature is: ${temperature}`);
      sessStore.setItem("temperature", temperature);
      let temp = document.querySelector('#current');
      temp.innerHTML = sessStore.getItem('temperature');
      
      let highTemp = p.properties.relativeLocation.properties.highTemp;
      console.log(`High temperature is: ${highTemp}`);
      sessStore.setItem("highTemp", highTemp);
      let highTemperature = document.querySelector('#high');
      highTemperature.innerHTML = sessStore.getItem('highTemp');

      let lowTemp = p.properties.relativeLocation.properties.lowTemp;
      console.log(`Low temperature is: ${lowTemp}`);
      sessStore.setItem("lowTemp", lowTemp);
      let lowTemperature = document.querySelector('#low');
      lowTemperature.innerHTML = sessStore.getItem('lowTemp');

      // Get the wind data 
      let windSpeed = p.properties.relativeLocation.properties.windSpeed;
      console.log(`windspeed is: ${windSpeed}`);
      sessStore.setItem("windspeed", windSpeed);
      windy = document.querySelector('#wind');
      windy.innerHTML = sessStore.getItem('windspeed');

      let windGust = p.properties.relativeLocation.properties.windGust;
      console.log(`gust is: ${windGust}`);
      sessStore.setItem("windGust", windGust);
      let gust= document.querySelector('#gusts');
      gust.innerHTML = sessStore.getItem('windGust');
  
      // Get the hourly data using another function - should include the forecast temp, condition icons and wind speeds. The data will be stored into session storage.
      getHourly(p.properties.forecastHourly);
    })
    .catch(function(error){
    console.log('There was a fetch problem: ', error.message);
    statusContainer.innerHTML = 'Sorry, the data could not be processed.';
    })
  }

  /* *************************************
*  Get Hourly Forecast data
************************************* */
function getHourly(URL) {
    fetch(URL)
     .then(function (response) {
      if (response.ok) {
       return response.json();
      }
      throw new ERROR('Response not OK.');
     })
     .then(function (data) {
      console.log('Data from getHourly function:');
      console.log(data); // Let's see what we got back
   
      // Store 12 hours of data to session storage  
      var hourData = [];
      let todayDate = new Date();
      var nowHour = todayDate.getHours();
      console.log(`nowHour is ${nowHour}`);
      for (let i = 0, x = 11; i <= x; i++) {
       if (nowHour < 24) {
        hourData[nowHour] = data.properties.periods[i].temperature + "," + data.properties.periods[i].windSpeed + "," + data.properties.periods[i].icon;
        sessStore.setItem(`hour${nowHour}`, hourData[nowHour]);
        nowHour++;
       } else {
        nowHour = nowHour - 12;
        hourData[nowHour] = data.properties.periods[i].temperature + "," + data.properties.periods[i].windSpeed + "," + data.properties.periods[i].icon;
        sessStore.setItem(`hour${nowHour}`, hourData[nowHour]);
        nowHour = 1;
       }
      }
   
      // Get the shortForecast value from the first hour (the current hour)
      // This will be the condition keyword for setting the background image
      sessStore.setItem("shortForecast", data.properties.periods[0].shortForecast);
      
      console.log(`shortForecast: ` + sessStore.getItem("shortForecast"));
      // Set bACKGROUND ACCORDING TO json
      var backImageBig = sessStore.getItem("shortForecast");
      var backImage = backImageBig.toLowerCase();
      var weather = setBackground(backImage);

      changeSummaryImage(weather);
   
      // Call the buildPage function
      buildPage();
     })
     .catch(error => console.log('There was a getHourly error: ', error))
   }

   /* ************************************
*  Build the Weather page
************************************* */
function buildPage() {
    // Set the title with the location name at the first
 // Gets the title element so it can be worked with
 let pageTitle = document.querySelector('#page-title');
 // Create a text node containing the full name 
 let fullNameNode = document.createTextNode(sessStore.getItem('fullName'));
 // inserts the fullName value before any other content that might exist
 pageTitle.insertBefore(fullNameNode, pageTitle.childNodes[0]);
 // When this is done the title should look something like this:
 // Preston, Idaho | The Weather Site 
  // Get the h1 to display the city location
  let contentHeading = document.querySelector('#contentHeading');
  contentHeading.innerHTML = sessStore.getItem('fullName');
  // The h1 in the main element should now say "Preston, Idaho"
   // Get the coordinates container for the location
   let latLon = document.querySelector('#latLon');
   latLon.innerHTML = sessStore.getItem('coordinates');
   // The latitude and longitude should match what was stored in session storage.
}
 /* ************************************
*  SETS THE BACKGROUND VALUE
************************************* */
function setBackground(shortForecast){
    console.log('Short Forecast in setBackground', shortForecast)
    var keyword = "";
    if (shortForecast.includes("sun") || shortForecast.includes("clear")){
       keyword = "clear";
    }
    else if (shortForecast.includes("cloud")){
       keyword = "clouds";
    }
    else if (shortForecast.includes("rain")){
        keyword = "rain";
    }
    else if (shortForecast.includes("snow")){
        keyword = "snow";
    }
    else if (shortForecast.includes("fog")){
        keyword = "fog";
    }
    console.log('Keyword is: ', keyword)
    return keyword;
}
footerDate();
