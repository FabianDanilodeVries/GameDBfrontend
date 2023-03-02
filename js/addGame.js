document.getElementById("addGameButton").addEventListener("click", function(e) {
    createGameObject(e);
});

async function createGameObject(e) {
    e.preventDefault();

    if(document.getElementById("inputName").value && document.getElementById("inputDescription").value && 
    document.getElementById("inputGenre").value && document.getElementById("inputPlatform").value && 
    document.getElementById("inputReleaseDate").value && document.getElementById("inputRuntime").value && document.getElementById("inputImage").value)
    {
        //make game object
        var addGameObj = {
            name: document.getElementById("inputName").value.trim(),
            description: document.getElementById("inputDescription").value.trim(),
            genre: document.getElementById("inputGenre").value.trim(),
            platform: document.getElementById("inputPlatform").value.trim(),
            releasedate: document.getElementById("inputReleaseDate").value,
            runtime: document.getElementById("inputRuntime").value.trim()
        };

        //convert uploaded image to Base64String
        let uploadedImage = document.getElementById("inputImage").files[0];
        const base64String = await convertBlobToBase64(uploadedImage);
        addGameObj['imageUrl'] = base64String;

        //convert the object into a JSON file
        const json = JSON.stringify(addGameObj);
        addGameServerRequest(json);
    } else {
        alert("Not all fields are filled");
    }
}

//Call addGame endpoint, call loadTopGames() to show added game and clear input fields
function addGameServerRequest(json){
    fetch("https://localhost:7176/api/Game/addGame", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        body: json
    })
    .then((response) => response.json())
    .then((response) => {
        if (response === true) {
            loadTopGames();
            document.getElementById("inputName").value = "";
            document.getElementById("inputDescription").value = "";
            document.getElementById("inputGenre").value = "";
            document.getElementById("inputPlatform").value = "";
            document.getElementById("inputReleaseDate").value = "";
            document.getElementById("inputRuntime").value = "";
            document.getElementById("inputImage").value = null;
        }        
    })
}

convertBlobToBase64 = (blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
});
