function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
  }

if (!getCookie('logged_in')) {
    window.location.href = 'index.html';
}
var ratingtext = document.getElementById('rating');
var coinstext = document.getElementById('coins');

//get username and make a get request to go through all the keys and get the rating and coins they have
var username = getCookie('username');
fetch('http://127.0.0.1:5000/get', {mode:'cors'})
.then(response => response.text())
      .then(data => {
        var responsedata = JSON.parse(data);
        //go through responsedata and get the rating and coins of the username
        for (const key in responsedata) {
            if (responsedata.hasOwnProperty(key)) {
              const coins = responsedata[key].coins;
              console.log(coins);
              const startRating = responsedata[key].startrating;
              ratingtext.innerHTML = "Rating: " + startRating;
              coinstext.innerHTML = "Coins: " + coins;
            }
          }
      })


//rating update
function updateRating() {
    fetch('http://127.0.0.1:5000/get', {mode: 'cors',})
   .then(response => response.text())
   .then(data => { 
        var responsedata = JSON.parse(data);
        console.log(responsedata)
        //go through responsedata and get the rating and coins of the username
        for (const key in responsedata) {
            if (key==getCookie('username')) {
              const startRating = Math.round(responsedata[key].startrating);
              ratingtext.innerHTML = "Rating: " + startRating;
   }}});
}




  
//update the player info (pace,shooting,passing, etc...)
var pace = document.getElementById('pace');
var shooting = document.getElementById('shooting');
var passing = document.getElementById('passing');
var dribbling = document.getElementById('dribbling');
var defending = document.getElementById('defending');
var physical = document.getElementById('physical');

fetch('http://127.0.0.1:5000/get')
.then(response => response.text())
     .then(data => {
        var responsedata = JSON.parse(data);
        pace.innerHTML = "Pace: " + responsedata[username].pace;
        setCookie('pace', responsedata[username].pace, 0)
        shooting.innerHTML = "Shooting: " + responsedata[username].shooting;
        setCookie('shooting', responsedata[username].shooting, 0)
        passing.innerHTML = "Passing: " + responsedata[username].passing
        setCookie('passing', responsedata[username].passing, 0)
        dribbling.innerHTML = "Dribbling: " + responsedata[username].dribbling;
        setCookie('dribbling', responsedata[username].dribbling, 0)
        defending.innerHTML = "Defending: " + responsedata[username].defending;
        setCookie('defending', responsedata[username].defending, 0)
        physical.innerHTML = "Physical: " + responsedata[username].physical;
        setCookie('physical', responsedata[username].physical, 0)

     })



  
var pacebutton = document.getElementById("pacebutton");
var shootingbutton = document.getElementById("shootbutton");
var passbutton = document.getElementById("passbutton");
var dribblingbutton = document.getElementById("dribblebutton");
var defbutton = document.getElementById("defendbutton");
var physicalbutton = document.getElementById("physicalbutton");
var button = document.getElementsByClassName('addbutton');

function updateStat(stat) {
  fetch('http://127.0.0.1:5000/updatestat', {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({
      username: getCookie('username'),
      value: stat
    })
  })
  .then(response => response.text())
  .then(data => {
      var responsedata = JSON.parse(data);

      if (responsedata > 99) {
        alert('99 is the highest a stat can be.');
      } else {
        if (stat === 'pace') {
          pace.innerHTML = "Pace: " + responsedata;
        } else if (stat === 'shooting') {
          shooting.innerHTML = "Shooting: " + responsedata;
        } else if (stat === 'passing') {
          passing.innerHTML = "Passing: " + responsedata;
        } else if (stat === 'dribbling') {
          dribbling.innerHTML = "Dribbling: " + responsedata;
        } else if (stat === 'defending') {
          defending.innerHTML = "Defending: " + responsedata;
        } else if (stat === 'physical') {
          physical.innerHTML = "Physical: " + responsedata;
        }
        updateRating();
      }
  })
}

pacebutton.addEventListener("click", function() {
  updateStat('pace');
})
shootingbutton.addEventListener("click", function() {
  updateStat('shooting');
})
passbutton.addEventListener("click", function() {
  updateStat('passing');
})
dribblingbutton.addEventListener("click", function() {
  updateStat('dribbling');
})
defbutton.addEventListener("click", function() {
  updateStat('defending');
})
physicalbutton.addEventListener("click", function() {
  updateStat('physical');
})
  