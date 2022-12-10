import axios from 'axios';
const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', async () => {
    navbarLinks.classList.toggle('active')
    //const returnValue = await axios.get('http://127.0.0.1:5000/getData');
    //console.log(returnValue.data);
})