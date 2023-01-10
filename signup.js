var username = document.getElementById('username-input');
var password = document.getElementById('password-input');
var email = document.getElementById('email-input');
//cookies
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


function submit() {
    var usernamevalue = document.getElementById('username-input').value;
    var passwordvalue = document.getElementById('password-input').value;
    var emailvalue = document.getElementById('email-input').value;
    var startrating = 50;
    var pace = 50;
    var passing = 50;
    var shooting = 50;
    var dribbling = 50;
    var defending = 50;
    var physical = 50;
    var coins = 0;
    const dateJoined = new Date().toLocaleDateString();
    if (usernamevalue === '' || passwordvalue === '' || emailvalue === '') {
        alert('Please enter username and password');
        return false;
    }
    if (usernamevalue.length > 14) {
        alert('Username must be less than 14 characters');
        return false;
    }
    fetch('http://127.0.0.1:5000/verifyemail', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(emailvalue)
  })
  .then(response => {
    return response.text()
  })
  .then(result => {
      console.log('Success:', result);
      console.log(result);
      if (JSON.parse(result) == "true") {
      const key1 = usernamevalue
      const key2 = passwordvalue

      fetch('http://127.0.0.1:5000/get')
      .then(response => response.text())
      .then(data => {
      let responsedata = JSON.parse(data);
      console.log(responsedata);
      console.log(Object.keys(responsedata))
      if(Object.keys(responsedata).includes(usernamevalue)) {
          alert('username taken')
          return false;
      }
      const emailValues = Object.values(responsedata).map(user => user.emailvalue);
      if(emailValues.includes(emailvalue)) {
        alert('That email has already been used to make an account. Please choose a different email')
        return false;
      }
      else {
          fetch('http://127.0.0.1:5000/post', {
              method: 'POST',
              headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              'date-joined': dateJoined
              },
              body: JSON.stringify({
              [key1]: {usernamevalue, passwordvalue, coins, startrating, pace, passing, shooting, dribbling, defending, physical, dateJoined, emailvalue}
              })
          })
          setCookie('username', usernamevalue, 0);
          setCookie('password', passwordvalue, 0);
          setCookie('email', emailvalue, 0);
          setCookie('logged_in', true, 0);
          window.location.href = "index.html";
      }
      })
      .catch((error) => console.error(error));
      }
      else if(JSON.parse(result) == 'false'){
        alert('Not an Email Address')
        return false;
      }
      else {
        alert(JSON.parse(result) + 'not found')
        return false;
      }
    
  })


}
