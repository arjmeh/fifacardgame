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
    const key1 = usernamevalue
    const key2 = passwordvalue
    fetch('http://127.0.0.1:5000/get')
    .then(response => response.text())
    .then(data => {
    let responsedata = JSON.parse(data);
    //if json data includes the username that the user inputted
    if (responsedata.hasOwnProperty(usernamevalue)) {
        let usernamejson = responsedata[usernamevalue]
        if(usernamejson.usernamevalue === usernamevalue && usernamejson.passwordvalue === passwordvalue) {
        window.location.href = "index.html";
        setCookie('loggedIn', 'true', 0);
        }
        else {
        alert('Wrong username or password.')
        document.getElementById('username-input').value = '';
        document.getElementById('password-input').value = '';
        return false;
        }
    }
    else {
        alert('Wrong username or password.')
        document.getElementById('username-input').value = '';
        document.getElementById('password-input').value = '';
        return false;
    }  
    })
    .catch((error) => console.error(error));
}

