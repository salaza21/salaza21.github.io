/*
these functions will work together to get weather informaton for the current location and populate a web page with the data.
*/
'use strict';
var idHeader = {
    headers: {
     "User-Agent": "Student Learning Project - yourschoolemailaddress@byui.edu"
    }
   };

console.log("java is working");
var locStore = window.localStorage;
var sessStore = window.sessionStorage;
getGeoLocation();





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
      let windSpeed = mpsToMph(data.properties.windSpeed.value);
      window.sessionStorage.setItem("windSpeed", windSpeed);
      window.sessionStorage.setItem("windGust", data.properties.windGust.value);
      window.sessionStorage.setItem("feelsLike", buildWC(windSpeed, currTemp));
      window.sessionStorage.setItem("condition", data.properties.textDescription);
   
      // Call the getForecast function
      getForecast(sessStore.getItem("forecastURL"));
   
      // Call the getHourly function
     getHourly();
    
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

   function getForecast(URL){
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
    let tempHigh = convertCelcius(data.properties.periods[0].temperature);
    window.sessionStorage.setItem("tempHigh", tempHigh);
    let tempLow = convertCelcius(data.properties.periods[1].temperature);
    window.sessionStorage.setItem("tempLow", tempLow);
}) 
.catch(error => console.log('There was a getForecast error: ', error)) 
}

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