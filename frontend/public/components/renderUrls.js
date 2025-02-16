const urls=[

]
 export function addToUrls(url){
    urls.unshift({
        longUrl:url.originalUrl,
        shortUrl:url.shortUrl,
        shortCode:url.shortCode
    });
 }



export function renderUrls(){
    const tableBodyElement =document.querySelector('tbody');
    let html ='';

    // Check if running on localhost or production
    const isLocalhost = window.location.hostname === "localhost" || window.location.hostname.startsWith("127.");
    const baseUrl = isLocalhost 
        ? "http://localhost:5000"    // Local development
        : "https://url-shortner-nine-beta.vercel.app"; // Production
    
    urls.forEach((url)=>{
        html+=`
        <tr>
            <td>${url.longUrl}</td>
            <td><a href="${baseUrl}/${url.shortCode}" class="text-primary">${url.shortUrl}</a></td>
            <td><button class="btn btn-sm btn-outline-secondary">Copy</button></td>
        </tr>
        `
    });
    tableBodyElement.innerHTML=html;
    
}