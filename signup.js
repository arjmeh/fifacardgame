var username = document.getElementById('username-input');
var password = document.getElementById('password-input');

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
    var startrating = 60;
    if (usernamevalue === '' || passwordvalue === '') {
        alert('Please enter username and password');
        return false;
    }
    if (usernamevalue.length > 14) {
        alert('Username must be less than 14 characters');
        return false;
    }
    const key1 = usernamevalue
    const key2 = passwordvalue

    fetch('http://127.0.0.1:5000/get')
    .then(response => response.text())
    .then(data => {
    let responsedata = data;
    if(responsedata.includes(usernamevalue)) {
        alert('username taken')
        return false;
    }
    else {
        fetch('http://127.0.0.1:5000/post', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
            [key1]: {usernamevalue, passwordvalue, startrating}
            })
        })
        setCookie('logged_in', true, 0);
        window.location.href = "index.html";
    }
    })
    .catch((error) => console.error(error));


}
