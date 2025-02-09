// async function connectToserver() {
//   const response = await fetch('http://localhost:5000/api/connect');
//   const data = await response.json();
//   console.log(data.message);
// }

// connectToserver();

async function shortenUrl() {   
    const url = document.getElementById('longUrl').value;
    const response = await fetch('http://localhost:5000/api/shorten', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({url})
    });
    const data = await response.json();
    console.log(data);
    }
    document.querySelector('.js-short-url-btn').addEventListener('click', shortenUrl);