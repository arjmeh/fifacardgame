//import axios from 'axios';

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
//     'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//     name: 'dogwater'
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










 
