document.addEventListener("DOMContentLoaded", function() {
    loadLatestNews();
});

function loadLatestNews(){
    fetch("https://localhost:7176/api/News/loadLatestNews")
        .then((response) => response.json())
        .then((response) => {
            generateNews(response);
        })
}
function generateNews(json){
    //There is no news in the database
    if(json.length <= 0){
        let msg = document.createElement("p");
        msg.innerHTML = "No news found";
        document.getElementById("news").style.display = "block";
        document.getElementById("news").append(msg);
    } else {
        //Create big news item for latest element
        let content = `
            <div class="news_item news_item_big" style="background-image: url(data:image/png;base64,`+json[0].base64String+`)">
                <div class="news_item_cover">
                    <div>
                        <p class="news_title">`+json[0].title+`</p>
                        <p class="news_date">`+json[0].postDate+`</p>
                        <p class="news_excerpt">`+json[0].excerpt+`</p>
                    </div>
                </div>
            </div>    
        `;

        //Create small news items for next 5 elements
        for (let i = 1; i < json.length; i++) {
            
            let newsItemSmall = `
                <div class="news_item news_item_small" style="background-image: url(data:image/png;base64,`+json[i].base64String+`)">
                    <div class="news_item_cover">
                        <div>
                            <p class="news_title">`+json[i].title+`</p>
                            <p class="news_date">`+json[i].postDate+`</p>
                            <p class="news_excerpt">`+json[i].excerpt+`</p>
                        </div>
                    </div>
                </div>
            `
            content += newsItemSmall;
        };
        // insert all news items in div
        if(document.getElementById("news")){document.getElementById("news").innerHTML = content};
    }
}