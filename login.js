var username = document.getElementById('username-input');
var password = document.getElementById('password-input');







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

