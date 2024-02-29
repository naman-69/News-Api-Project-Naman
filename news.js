const apiKey = "c9f7b68939a340a7a43eb248010afe6e";

const blogContainer = document.getElementById("blog-container");
const searchFeild = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

async function fetchRandomNews(){
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching random news" , error);
        return [];
    }
}

searchButton.addEventListener("click", async ()=>{
    const query = searchFeild.value;
    if(query !== ""){
        try {
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        } catch (error) {
            console.error("Error fetching news by query" , error);
        }
    }
})

async function fetchNewsQuery(query){
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching random news" , error);
        return [];
    }
}

function displayBlogs(articles){
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const img = document.createElement("img");
        img.src = article.urlToImage;
        img.alt = article.title;
        const title = document.createElement("h2");
        const truncatedTitle = article.title.length > 30 ? article.title.slice(0,30)+"..."  : article.title ;
        title.textContent = truncatedTitle;
        const description = document.createElement("p");
        const truncatedTitle2 = article.description.length > 130 ? article.description.slice(0,130)+"..."  : article.description ;
        description.textContent = truncatedTitle2;


        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener('click' , ()=>{
            window.open(article.url , "_blank");
        });
        blogContainer.appendChild(blogCard);
    });
}

(async ()=>{
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.error("Error fetching random news" , error);
    }
})();