
'use strict';
var idHeader = {
    headers: {
     "User-Agent": "Student Learning Project - yourschoolemailaddress@byui.edu"
    }
};

var pageNav = document.querySelector('#page-nav');
var statusContainer = document.querySelector('#status');
var contentContainer = document.querySelector('#main-content');
var locStore = window.localStorage;
var sessStore = window.sessionStorage;
let weatherURL = "/weather/locations/js/idahoweather.json";

let title = document.querySelector('#page-title');
let path = title.dataset.title; 
document.addEventListener("DOMContentLoaded", function(){
    if (path == "Home") {
        getGeoLocation();
    }
    else {
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
    }

})


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
        case"windy":
        x.className += 'clouds';
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
      let windy = document.querySelector('#wind');
      windy.innerHTML = sessStore.getItem('windspeed');

      let windGust = p.properties.relativeLocation.properties.windGust;
      console.log(`gust is: ${windGust}`);
      sessStore.setItem("windGust", windGust);
      let gust= document.querySelector('#gusts');
      gust.innerHTML = sessStore.getItem('windGust');

      console.log("this is windSpeed: " + windSpeed);
      console.log("this is temperature: " + temperature);

      buildWC(windSpeed, temperature);
  
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

   // The latitude and longitude should match what was stored in session storage.
   // **********  Set the Time Indicators  **********
    let thisDate = new Date();
    var currentHour = thisDate.getHours();
    let indicatorHour;
    // If hour is greater than 12, subtract 12
    if (currentHour > 12) {
        indicatorHour = currentHour - 12;
    } else {
        indicatorHour = currentHour;
    };
    console.log(`Current hour in time indicator is: ${currentHour}`);
    // Set the time indicator
    //timeIndicator(indicatorHour);
    // ********** Hourly Temperature Component  **********
    // Get the hourly data from storage as an array
    let currentData = [];
    let tempHour = currentHour;
    // Adjust counter based on current time
    for (let i = 0, x = 12; i < x; i++) {
    if (tempHour <= 23) {
        currentData[i] = sessStore.getItem('hour' + tempHour).split(",");
        tempHour++;
    } else {
    tempHour = tempHour - 12;
    currentData[i] = sessStore.getItem('hour' + tempHour).split(",");
    console.log(`CurrentData[i][0] is: ${currentData[i][0]}`);
    tempHour = 1;
    }
    }
    console.log(currentData);

// Loop through array inserting data
// Start with the outer container that matchs the current time
tempHour = currentHour;
for (let i = 0, x = 12; i < x; i++) {
 if (tempHour >= 13) {
  tempHour = tempHour - 12;
 }
 console.log(`Start container is: #temps to.${tempHour}`);
 $('#temps .to' + tempHour).innerHTML = currentData[i][0];
 tempHour++;
}
// ********** Hourly Wind Component  **********
// Get the hourly data from storage
let windArray = [];
let windHour = currentHour;
// Adjust counter based on current time
for (let i = 0, x = 12; i < x; i++) {
 if (windHour <= 23) {
  windArray[i] = currentData[i][1].split(" ");
  console.log(`windArray[i] is: ${windArray[i]}`);
  windHour++;
 } else {
  windHour = windHour - 12;
  windArray[i] = currentData[i][1].split(" ");
  windHour = 1;
 }
}
console.log(windArray);

// Insert Wind data
// Start with the outer container that matchs the time indicator
windHour = currentHour;
for (let i = 0, x = 12; i < x; i++) {
 if (windHour >= 13) {
  windHour = windHour - 12;
 }
 $('#winds .o' + windHour).innerHTML = windArray[i][0];
 windHour++;
}let conditionHour = currentHour;
// Adjust counter based on current time
for (let i = 0, x = 12; i < x; i++) {
 if (conditionHour >= 13) {
  conditionHour = conditionHour - 12;
 }
 console.log('CurrentData: ' + currentData[i][2] )
 $('#conditions .co' + conditionHour).innerHTML = '<img src="' + currentData[i][2] + '" alt="hourly weather condition image">';
 conditionHour++;
}
//contentContainer.setAttribute('class', ''); // removes the hide class from main
//statusContainer.setAttribute('class', 'hide'); // hides the status container
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
    else if (shortForecast.includes("cloud") || shortForecast.includes("windy")){
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
// Gets longitude and latitude of current location
function getGeoLocation() {
    console.log("getGeo is working");
    const status = document.getElementById('status');
    status.innerHTML = 'Getting Location...';
    if (navigator.geolocation) {
        console.log(navigator.geolocation);
        navigator.geolocation.getCurrentPosition(function (position) {
         const lat = position.coords.latitude;
         const long = position.coords.longitude;
      
         // Combine the values for use later
         const locale = lat + "," + long;
         console.log(`Locale values are: ${locale}.`);
         
         getLocation(locale);
         // Store the values to session storage
         window.sessionStorage.setItem("locale", locale);
         window.sessionStorage.setItem("latitude", lat);
         window.sessionStorage.setItem("longitude", long);
         let coord = document.querySelector('#latLon');
         coord.innerHTML = sessStore.getItem('locale');
      
        })
       } else {
        status.innerHTML = "Your browser doesn't support Geolocation or it is not enabled!";
       } // end else
} //end getGeoLocation

// Gets location information from the NWS API
function getLocation(locale) {
    const URL = "https://api.weather.gov/points/" + locale; 
    console.log("Url of locale: " + URL);
    window.sessionStorage.setItem("localeURL", URL);
    // NWS User-Agent header (built above) is the second parameter 
    fetch(URL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('Json object from getLocation function:'); 
      console.log(data);
      // Store data to sessionStorage 
      window.sessionStorage.setItem("locName", data.properties.relativeLocation.properties.city); 
      window.sessionStorage.setItem("locState", data.properties.relativeLocation.properties.state);
      let fullName = data.properties.relativeLocation.properties.city + ", " + data.properties.relativeLocation.properties.state;
      window.sessionStorage.setItem("fullName", fullName); 
      
      // Store three URL's for stationId's, forecast and hourly forecast
      // The URL's are in the returned location data object
      window.sessionStorage.setItem("hourlyURL", data.properties.forecastHourly);
      window.sessionStorage.setItem("forecastURL", data.properties.forecast);
      let stationsURL = data.properties.observationStations;
      window.sessionStorage.setItem("stationsURL", stationsURL); 
   
      // Call the function to get the list of weather stations
      // using the URL for the weather station list
      getStationId(stationsURL); 
     }) 
    .catch(error => console.log('There was a getLocation error: ', error)) 
   } // end getLocation function

   // Gets weather station list and the nearest weather station ID from the NWS API
function getStationId(stationsURL) { 
    // NWS User-Agent header (built above) will be the second parameter 
    fetch(stationsURL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('From getStationId function:'); 
      console.log(data);
    
      // Store station ID and elevation (in meters - will need to be converted to feet) 
      let stationId = data.features[0].properties.stationIdentifier; 
      let stationElevation = data.features[0].properties.elevation.value; 
      console.log('Station and Elevation are: ' + stationId, stationElevation); 
      // You may want to convert the elevation to feet before storing the value
      // Store data to sessionStorage 
      window.sessionStorage.setItem("stationId", stationId); 
      window.sessionStorage.setItem("stationElevation", stationElevation); 
   
      // Request the Current Weather for this station 
      getWeather(stationId);
     }) 
    .catch(error => console.log('There was a getStationId error: ', error)) 
   } // end getStationId function

   // Gets current weather information for a specific weather station from the NWS API
function getWeather(stationId) { 
    // This is the URL for current observation data 
    const URL = 'https://api.weather.gov/stations/' + stationId + '/observations/latest';
    console.log("URL is: " + URL);
    fetch(URL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('From getWeather function:'); 
      console.log(data);
    
      // Store current weather information to sessionStorage 
      let currTemp = convertCelcius(data.properties.temperature.value);
      window.sessionStorage.setItem("temperature", currTemp);
      let tempCurr = document.querySelector('#current');
      tempCurr.innerHTML = Math.floor(sessStore.getItem('temperature'));
      let windSpeed = mpsToMph(data.properties.windSpeed.value);
      window.sessionStorage.setItem("windSpeed", windSpeed);
      window.sessionStorage.setItem("feelsLike", buildWC(windSpeed, currTemp));
      window.sessionStorage.setItem("condition", data.properties.textDescription);
   
      // Call the getForecast function
      getForecastHome(sessStore.getItem("forecastURL"));
   
      // Call the getHourly function
     getHourlyHome(sessStore.getItem("hourlyURL"));
    
     }) 
    .catch(error => console.log('There was a getWeather error: ', error)) 
   } // end getWeather function

   function convertCelcius(celsius) {
    var faren = (celsius * 9/5) + 32;
    return faren;
   }
   
   function mpsToMph(mps) {
    var mph = mps * 2.237;
    return mph;
   }

   function buildWC(speed, temp) {
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    return wc;
   }

   function getForecastHome(URL){
    fetch(URL, idHeader) 
    .then(function(response){
      if(response.ok){ 
       return response.json(); 
      } 
      throw new ERROR('Response not OK.');
    })
    .then(function (data) { 
      // Let's see what we got back
      console.log('From getWeather function:'); 
      console.log(data);
    let wSpeedCurr = document.querySelector('#wind');
    wSpeedCurr.innerHTML = Math.floor(sessStore.getItem('windSpeed'));
    window.sessionStorage.setItem("windGust", data.properties.periods[0].windSpeed);
    let wGustCurr = document.querySelector('#gusts');
    wGustCurr.innerHTML = sessStore.getItem('windGust');
    let tempHigh = data.properties.periods[0].temperature;
    window.sessionStorage.setItem("tempHigh", tempHigh);
    let highCurr = document.querySelector('#high');
    highCurr.innerHTML = sessStore.getItem('tempHigh');
    let tempLow = data.properties.periods[1].temperature;
    window.sessionStorage.setItem("tempLow", tempLow);
    let lowCurr = document.querySelector('#low');
    lowCurr.innerHTML = sessStore.getItem('tempLow');
}) 
.catch(error => console.log('There was a getForecast error: ', error)) 
}

  function getHourlyHome(URL) {
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
      timeBall(nowHour);
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
// Calculate the Windchill
function buildWC(speed, temp) {
    let feelTemp = document.getElementById('feelTemp');
    console.log("this is the speed passed in buildWC " + speed );
    console.log("this is the temp passed in buildWC " + temp );
    // Compute the windchill
    let wc = 35.74 + 0.6215 * temp - 35.75 * Math.pow(speed, 0.16) + 0.4275 * temp * Math.pow(speed, 0.16);
    console.log(wc);
    wc = Math.floor(wc);
    // Display the windchill
    console.log(wc);
    wc = 'Feels like ' + wc + '&deg;F';
    feelTemp.innerHTML = wc;
    return wc;
}

    /*// Change the status of the containers
    contentContainer.setAttribute('class', ''); // removes the hide class from main
    statusContainer.setAttribute('class', 'hide'); // hides the status container
*/
footerDate();
