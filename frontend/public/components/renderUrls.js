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
    urls.forEach((url)=>{
        html+=`
        <tr>
            <td>${url.longUrl}</td>
            <td><a href="https://url-shortner-nine-beta.vercel.app/${url.shortCode}" class="text-primary">${url.shortUrl}</a></td>
            <td><button class="btn btn-sm btn-outline-secondary">Copy</button></td>
        </tr>
        `
    });
    tableBodyElement.innerHTML=html;
    
}