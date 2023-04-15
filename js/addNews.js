document.getElementById("addNewsButton").addEventListener("click", function(e) {
    createNewsObject(e);
});

async function createNewsObject(e) {
    e.preventDefault();

    if(document.getElementById("inputTitle").value && document.getElementById("inputExcerpt").value && 
    document.getElementById("inputBody").value && document.getElementById("inputNewsImage").value)
    {
        //make News object
        var addNewsObj = {
            title: document.getElementById("inputTitle").value.trim(),
            excerpt: document.getElementById("inputExcerpt").value.trim(),
            body: document.getElementById("inputBody").value.trim(),
        };

        //convert uploaded image to Base64String
        let uploadedImage = document.getElementById("inputNewsImage").files[0];
        const base64String = await convertBlobToBase64(uploadedImage);
        addNewsObj['imageUrl'] = base64String;

        //convert the object into a JSON file
        const json = JSON.stringify(addNewsObj);
        addNewsServerRequest(json);
    } else {
        alert("Not all fields are filled");
    }
}

//Call addNews endpoint, call loadNews() to show added news and clear input fields
function addNewsServerRequest(json){
    fetch("https://localhost:7176/api/News/addNews", {
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
            loadLatestNews();
            document.getElementById("inputTitle").value = "";
            document.getElementById("inputExcerpt").value = "";
            document.getElementById("inputBody").value = "";
            document.getElementById("inputNewsImage").value = null;
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
