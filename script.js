//import axios from 'axios';

while (true) {
  if (getCookie('loggedIn') === 'false') {
    window.location.href = "login.html";
  }
}
// npx parcel index.html to run local server
const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', async () => {
    navbarLinks.classList.toggle('active')
    // const returnValue = await axios.get('http://127.0.0.1:5000/getData');
    // console.log(returnValue.data);
    // doPostRequest('testing')

//     fetch('http://127.0.0.1:5000/post', {
//     method: 'POST',
//     headers: {
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Origin': '*'
//     },
//     body: JSON.stringify({
//     "ani": 'cataa'
//     })
// })
//   .then((postresponse) => postresponse.json())
//   .then((postdata) => console.log(postdata))
//   .catch((posterror) => console.error(posterror));


    fetch('http://127.0.0.1:5000/get')
    .then(response => response.text())
    .then(data => {
    let responsedata = data;
    console.log(responsedata);
    })
    .catch((error) => console.error(error));
})
    //data is the get data


//cookies
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







