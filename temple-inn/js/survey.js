document.addEventListener("DOMContentLoaded", ()=>{
    document.querySelector('#submit').addEventListener("click", processData);
  })
  
  let reservations = [];
  let processData = (event) => {
    // stop the form from submitting
    event.preventDefault();
    let reservation = {
    name: document.querySelector('#name').value,
    email: document.querySelector('#email').value,
    phone: document.querySelector('#phone').value,
    city: document.querySelector('#city').value,
    state: document.querySelector('#state').value,
    guests: document.querySelector('#guests').value,
    resDate: document.querySelector('#resDate').value,
    resDateEnd: document.querySelector('#resDateEnd').value,
    temple: document.querySelector('#temple').value,
    comments: document.querySelector('#comments').value
    }
  // adds reservation to the end of the array of all reservations
  reservations.push(reservation);
  // reset the first, and only, form
  document.forms[0].reset;
  // see results in console
  console.log('newRes', {reservations});
  
  
    // Store to session Storage
    window.sessionStorage.setItem("reservations", JSON.stringify(reservations));
    // Retrieve from session storage
    let resList = JSON.parse(window.sessionStorage.getItem("reservations"));
    console.log(resList);
    
    
  // display the results
  if (document.querySelector('#name').value != null && document.querySelector('#city').value != null &&
  document.querySelector('#email').value != null && document.querySelector('#state').value != null &&
  document.querySelector('#phone').value != null &&
  document.querySelector('#guests').value != null &
  document.querySelector('#resDate').value != null &&
  document.querySelector('#resDateEnd').value != null &&
  document.querySelector('#comments').value != null ){
  document.querySelector("#resResult").classList.remove("hideme");
  document.querySelector("#resResultTitle").classList.remove("hideme");
  document.querySelector("#form").classList.remove("container_form");
  document.querySelector("#form").classList.add("hideme");

  let name = document.querySelector('#nameResult');
  name.innerHTML = 'Name of Patron: ' + resList[0].name;
  let email = document.querySelector('#emailResult');
  email.innerHTML = 'Contact Email: ' + resList[0].email;
  let phone = document.querySelector('#phoneResult');
  phone.innerHTML = 'Contact Phone: ' + resList[0].phone;
  let city = document.querySelector('#cityResult');
  city.innerHTML = 'City: ' + resList[0].city;
  let state = document.querySelector('#stateResult');
  state.innerHTML = 'State: ' + resList[0].state;
  let guests = document.querySelector('#guestsResult');
  guests.innerHTML = 'Number of guests: ' + resList[0].guests;
  let resDate = document.querySelector('#resDateResult');
  resDate.innerHTML = 'Arrival Date: ' + resList[0].resDate;
  let resDateEnd = document.querySelector('#resDateEndResult');
  resDateEnd.innerHTML = 'Departure Date: ' + resList[0].resDateEnd;
  let temple = document.querySelector('#resTempleResult');
  temple.innerHTML = 'Temple Location: ' + resList[0].temple;
  let comments = document.querySelector('#commentsResult');
  comments.innerHTML = 'Comments: ' + resList[0].comments;
  }
  }