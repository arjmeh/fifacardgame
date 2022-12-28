const urlParams = new URLSearchParams(window.location.search);
const name = urlParams.get('name');
const uppercaseName = name.charAt(0).toUpperCase() + name.slice(1);
document.title = uppercaseName;
const brandTitle = document.querySelector('.brand-title a');
brandTitle.innerText = uppercaseName;

fetch('http://127.0.0.1:5000/get')
  .then(response => response.text())
  .then(data => {
    const responsedata = JSON.parse(data);  // Parse the data into a JavaScript object
    console.log(responsedata);
    console.log(name);
    if (responsedata.hasOwnProperty(name)) {  // Check if responsedata has a property with the name of "name"
      const rating = responsedata[name]["startrating"];
      console.log(rating);
      const ratingElem = document.getElementsByClassName('rating')[0];
      console.log(ratingElem);
      ratingElem.innerText = `Rating: ${rating}`;

      // Get an array of all the startrating values
      const ratings = Object.values(responsedata).map(user => user.startrating);
      // Sort the array in descending order
      ratings.sort((a, b) => b - a);

      // Get an array of all the names
      const names = Object.keys(responsedata);
      // Sort the array in ascending order
      names.sort();

      // Zip the names and ratings arrays together, and add the rank as the third element
      const nameRatings = names.map((name, index) => [name, ratings[index], index + 1]);

      console.log(nameRatings);  //

      // Find the element with the matching name in the nameRatings array
      const nameRating = nameRatings.find(([n]) => n === name);
      if (nameRating) {
        // Extract the rank from the nameRating element
        const [, , rank] = nameRating;
        // Display the rank on the page
        const rankElem = document.getElementsByClassName('rank')[0];
        rankElem.innerText = `Rank: ${rank}`;
          // Extract the date joined from the responsedata object
        const dateJoined = responsedata[name]['dateJoined'];
        // Display the date joined on the page
        const dateJoinedElem = document.getElementsByClassName('date-joined')[0];
        dateJoinedElem.innerText = `Date Joined: ${dateJoined}`;

      } else {
        console.error(`Could not find '${name}' in nameRatings`);
      }
    } else {
      console.error(`Could not find '${name}' in responsedata`);
    }
  })
  .catch((error) => console.error(error));
