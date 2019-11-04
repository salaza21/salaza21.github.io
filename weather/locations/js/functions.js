document.addEventListener("DOMContentLoaded", function(){
    //buildModDate();
    // Variables for Wind Chill function
    let temp = 31;
    let speed = 12;
    buildWC(speed,temp);
    // The time indictor function
    let hour="6";
    console.log(hour);
    timeBall(hour);
    // Changes the backgorund image
    let weather = "clear";
    changeSummaryImage(weather);
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
         case "clear":
            x.className += 'clear';
         break;
         case "rain":
            x.className += 'rain';
         break;
         case"fog":
            x.className += 'fog';
         break;
         case"snow":
            x.className += 'snow';
         break;
         case"clouds":
         x.className += 'clouds';
         break;
     }       
    
}
footerDate();
