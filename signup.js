var username = document.getElementById('username-input');
var password = document.getElementById('password-input');

function submit() {
    var usernamevalue = document.getElementById('username-input').value;
    var passwordvalue = document.getElementById('password-input').value;
    if (usernamevalue === '' || passwordvalue === '') {
        alert('Please enter username and password');
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
            [key1]: {usernamevalue, passwordvalue}
            })
        })
        window.location.href = "index.html";
    }
    })
    .catch((error) => console.error(error));


}
