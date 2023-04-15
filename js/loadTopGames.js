document.addEventListener("DOMContentLoaded", function() {
    loadTopGames();
});

function loadTopGames(){
    fetch("https://localhost:7176/api/Game/loadTopGames")
        .then((response) => response.json())
        .then((response) => {
            generateGames(response);
        })
}
function generateGames(json){
    //There are no games in the database
    if(json.length <= 0){
        let msg = document.createElement("p");
        msg.innerHTML = "No games found";
        document.getElementById("topGames").style.display = "block";
        document.getElementById("topGames").append(msg);
    } else {
        let content = "";
        json.forEach(element => {
            //Foreach element create a div
            let divElement = `     
            <div class="topGames_item">
                <img src=data:image/png;base64,`+element.base64String+`></img>
                <span>
                    <a class="fa fa-star checked"></a><a id="rating">8.1</a>
                    <p class="topGames_item_name">`+element.name+`</p>
                    <p class="topGames_item_genre"><b>Genre: </b>`+element.genre+`</p>
                    <a id=`+element.id+`"></a>
                </span>
            </div>
             `;
            content += divElement;
        });
        // insert all games in div
        if(document.getElementById("topGames")){document.getElementById("topGames").innerHTML = content};
    }
}