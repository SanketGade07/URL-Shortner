// async function connectToserver() {
//   const response = await fetch('http://localhost:5000/api/connect');
//   const data = await response.json();
//   console.log(data.message);
// }

// connectToserver();

async function shortenUrl() {   
    const isLocalhost = window.location.hostname === "localhost" || window.location.hostname.startsWith("127.");

    const baseUrl = isLocalhost 
        ? "http://localhost:5000"    // Local development (covers both localhost and 127.x.x.x)
        : "https://url-shortner-nine-beta.vercel.app"; // Production (Vercel)

    const url = document.getElementById('longUrl').value;

    const response = await fetch(`${baseUrl}/shorten`, {
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