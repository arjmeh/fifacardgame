fetch('http://127.0.0.1:5000/get')
  .then(response => response.json())
  .then(data => {
    // Sort the data by startrating in descending order
    const sortedData = Object.values(data).sort((a, b) => b.startrating - a.startrating);

    // Create a table element
    const table = document.createElement('table');

    // Create a row for the table header
    const headerRow = document.createElement('tr');
    const header1 = document.createElement('th');
    header1.textContent = 'Rank';
    const header2 = document.createElement('th');
    header2.textContent = 'Username';
    const header3 = document.createElement('th');
    header3.textContent = 'Rating';
    const header4 = document.createElement('th');
    header4.textContent = 'Date Joined';
    headerRow.appendChild(header1);
    headerRow.appendChild(header2);
    headerRow.appendChild(header3);
    headerRow.appendChild(header4);
    table.appendChild(headerRow);

    // Add a row for each user
    sortedData.forEach((user, index) => {
      const row = document.createElement('tr');
      row.classList.add('styled-row');
      const rankCell = document.createElement('td');
      rankCell.textContent = index + 1;
      const usernameCell = document.createElement('td');
      // Create a link for the username
      const usernameLink = document.createElement('a');
      usernameLink.textContent = user.usernamevalue.charAt(0).toUpperCase() + user.usernamevalue.slice(1);
      usernameLink.href = `user.html?name=${user.usernamevalue}`;
      usernameLink.target = '_blank'; // Open the link in a new tab
      usernameCell.appendChild(usernameLink);
      const ratingCell = document.createElement('td');
      ratingCell.textContent = user.startrating;
      const dateJoinedCell = document.createElement('td');
      dateJoinedCell.textContent = user.dateJoined;
      row.appendChild(rankCell);
      row.appendChild(usernameCell);
      row.appendChild(ratingCell);
      row.appendChild(dateJoinedCell);
      table.appendChild(row);
    });

    // Add the table to the page
    document.body.appendChild(table);
  });
