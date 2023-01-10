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
        setCookie('logged_in', true, 0);
        setCookie('username', usernamevalue, 0)
        setCookie('password', passwordvalue, 0)
        fetch('http://127.0.0.1:5000/get')
        .then(response => response.text()
        .then(data => {
            let responsedata = JSON.parse(data);
            //if json data includes the username that the user inputted
            if (responsedata.hasOwnProperty(usernamevalue)) {
                let usernamejson = responsedata[usernamevalue]
                setCookie('email', usernamejson.emailvalue,0)
                console.log(getCookie('email'))
                }}))
                window.location.href = "index.html";
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


var emailinput = document.getElementById('email-input');
var emailbutton = document.getElementsByClassName('submitemail');
function unhide() {
  emailinput.style.display = 'block';
  emailbutton[0].style.display = 'block';
  //alert('An email will be sent to the email address that is associated with your account.');
}

function forgotpassword() {
  if (emailinput.value == '') {
    alert('Please enter an email address.');
    emailinput.style.display = 'none';
    emailbutton[0].style.display = 'none';
  }
  else {
    var emailvalue = emailinput.value;
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
    console.log(result);
    if (JSON.parse(result) == "true") {
      fetch('http://127.0.0.1:5000/get')
      .then(response => response.text())
      .then(data => {
        let responsedata = JSON.parse(data);
        const allemails = [];
        for (const prop in responsedata) {
          if (responsedata[prop].hasOwnProperty('emailvalue')) {
            allemails.push(responsedata[prop].emailvalue);
          }
        }
        const containsEmail = allemails.includes(emailvalue);
        if (containsEmail) {
          console.log('sending email');
          fetch('http://127.0.0.1:5000/sendemail', {
            method: 'POST',
              headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
              },
              body: JSON.stringify({
              email: emailvalue
              })
          })
          .then(response => response.text())
          .then(data => {
            console.log(data);
          })
        }
      })
    }
  else {
    alert('Not an email.')
  }
   })
    
  }
}