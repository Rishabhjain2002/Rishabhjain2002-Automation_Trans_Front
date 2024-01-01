const apiUrl = 'http://[::1]:3000'; 
const userdb = {
    "username": " ",
    "host": " ",
    "database": " ",
    "schema": " ",
    "operation": " ",
    "password": " "
};

fetch(apiUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(jsonData)
})
.then(response => {
  if (response.ok) {
    return response.json(); 
  } else {
    throw new Error('Failed to send data to the API');
  }
})
.then(data => {
  console.log(data);
})
.catch(error => {
  console.error(error);
});
