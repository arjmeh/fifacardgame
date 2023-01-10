var usernameinput = document.getElementById('usernameinput');
var emailinput = document.getElementById('emailinput');
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
    // Redirect the user to the login page if they are not logged in
    window.location.href = "login.html";
    }
  var username = getCookie('username');
  usernameinput.value = username;
  usernameinput.placeholder = username;

function edit() {
    usernameinput.contentEditable = true;
    usernameinput.removeAttribute('readonly');
    usernameinput.readonly = false;
}

function save() {
    var result = confirm('Are you sure you want to change your username?');
    if (result) {
      fetch('http://127.0.0.1:5000/get')
        .then(response => response.text())
        .then(data => {
          let responsedata = JSON.parse(data);  // parse the received data as JSON
          if (JSON.stringify(responsedata).includes(usernameinput.value)) {
            alert('username taken');
            usernameinput.value = username;
          }
           
          else {
            fetch('http://127.0.0.1:5000/changeusername', {
                method: 'PUT',
                body: JSON.stringify({newusername: usernameinput.value, oldusername: getCookie('username')}),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                }
                })
                .then(res => res.json())
                .then(response => console.log('Success:', JSON.stringify(response)))
                .catch(error => console.error('Error:', error));
            usernameinput.contentEditable = false;
            usernameinput.setAttribute('readonly', true);
            setCookie('username', usernameinput.value, 0);
            
        }})


          }
        };
  
var passwordinput = document.getElementById('passwordinput');
var password = getCookie('password');
  passwordinput.value = password;
  passwordinput.placeholder = password;
function editpassword() {
  passwordinput.contentEditable = true;
  passwordinput.removeAttribute('readonly');
  passwordinput.readonly = false;
}

function savepassword() {
  var result = confirm('Are you sure you want to change your password?');
  if (result) {
    setCookie('password',passwordinput.value, 0)
          fetch('http://127.0.0.1:5000/changepassword', {
              method: 'PUT',
              body: JSON.stringify({username: getCookie('username'), password: getCookie('password')}),
              headers: {
                  'Content-Type': 'application/json'
              }
              })
              .then(res => res.json())
              .then(response => console.log('Success:', JSON.stringify(response)))
              .catch(error => console.error('Error:', error));
          usernameinput.contentEditable = false;
          usernameinput.setAttribute('readonly', true);
          


        }
      };

deletebtn = document.getElementById('delete');
usernamedelete = document.getElementById('usernameinput');

function deletefunc() {
  var deleteresult = confirm('Are you sure you want to delete your account? This cannot be undone.');
  if (deleteresult) {
  console.log(usernamedelete.value);
  fetch('http://127.0.0.1:5000/delete', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  },
  body: JSON.stringify({username: usernamedelete.value})
}).then(response => response.json())
  setCookie('username', username, -1)
  setCookie('password', password, -1)
  setCookie('email', email, -1)
  window.location.href = 'signup.html'
}
else {
  return false
}
  
}
console.log(getCookie('email'))
var email = getCookie('email');
console.log(email)
emailinput.value = email;
emailinput.placeholder = email;