var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);

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

footerDate();

