//import axios from 'axios';

// npx parcel index.html to run local server
const toggleButton = document.getElementsByClassName('toggle-button')[0]
const navbarLinks = document.getElementsByClassName('navbar-links')[0]

toggleButton.addEventListener('click', async () => {
    navbarLinks.classList.toggle('active')

})
    //data is the get data


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






//leaderboard
fetch('http://127.0.0.1:5000/get')
    .then(response => response.text())
    .then(data => {
    const responsedata = data;
    

// Step 1: parse the JSON string
const users = JSON.parse(responsedata);

// Step 2: create an array of user objects
const userArray = Object.keys(users).map(key => {
  return {
    name: key,
    startrating: users[key].startrating
  };
});

// Step 3: sort the array by startrating
userArray.sort((a, b) => b.startrating - a.startrating);

// Step 4: display the leaderboard
for (const user of userArray) {
  console.log(`${user.name}: ${user.startrating}`);
}
const table = document.createElement('table');
table.style.borderCollapse = 'collapse';
table.style.margin = 'auto';  // center the table within the parent element  // remove the space between the cells and create a single border around each cell
let rank = 1;
for (const user of userArray.slice(0,10)) {
  const row = document.createElement('tr');
  const rankCell = document.createElement('td');
  rankCell.textContent = rank;  // set the rank in the rank column
  row.appendChild(rankCell);
  rankCell.style.border = '1px solid black';
  const nameCell = document.createElement('td');
  nameCell.style.border = '1px solid black';
    // add a border around each cell
  nameCell.textContent = user.name.charAt(0).toUpperCase() + user.name.slice(1);
  row.appendChild(nameCell);
  const ratingCell = document.createElement('td');
  ratingCell.style.border = '1px solid black';  // add a border around each cell
  ratingCell.textContent = user.startrating;
  row.appendChild(ratingCell);
  table.appendChild(row);
    // Change the background color based on the rank
    if (rank === 1) {
      row.style.backgroundColor = 'gold';
    } else if (rank === 2) {
      row.style.backgroundColor = 'silver';
    } else if (rank === 3) {
      row.style.backgroundColor = '#CC8835';  // bronze color
    }
  rank++;
}
table.style.fontSize = '2rem';
table.style.padding = '2rem';
// Step 5: find the "grid-rankings" div
const rankingsDiv = document.querySelector('.grid-rankings');

// Step 6: append the table to the "grid-rankings" div
rankingsDiv.appendChild(table);
    })
    .catch((error) => console.error(error));



