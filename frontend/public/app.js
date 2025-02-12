import { renderUrls } from "./views/renderUrls.js";
import { addToUrls } from "./views/renderUrls.js";

async function shortenUrl() {   
    const isLocalhost = window.location.hostname === "localhost" || window.location.hostname.startsWith("127.");

    const baseUrl = isLocalhost 
        ? "http://localhost:5000"    // Local development (covers both localhost and 127.x.x.x)
        : "https://url-shortner-nine-beta.vercel.app"; // Production (Vercel)

    const longUrl = document.getElementById('longUrl').value;

    const response = await fetch(`${baseUrl}/shorten`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({longUrl})
    });
    const url= await response.json();
    addToUrls(url);
    renderUrls();
     
    }
    document.querySelector('.js-short-url-btn').addEventListener('click', shortenUrl);
