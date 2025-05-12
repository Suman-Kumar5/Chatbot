let prompt = document.querySelector("#prompt");
let container = document.querySelector(".container");
let chatContainer = document.querySelector(".chat-container");
let userMessage = null;
let btn = document.querySelector(".btn");
let api_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBZzzU6B6wHPy5dFk2fds1zsVQn0bGCy-w";

//"AIzaSyBZzzU6B6wHPy5dFk2fds1zsVQn0bGCy-w";

function createChatBox(html, className) {
    let div = document.createElement("div");
    div.classList.add(className);
    div.innerHTML = html;
    return div;
}

async function getApiResponse(aiChatBox) {
    let textElement = aiChatBox.querySelector(".text");
    try {
        let response = await fetch(api_URL, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [
                    {
                        "role": "user",
                        "parts": [{ text: userMessage }]
                    }]

            })
        })
        let data = await response.json();
        let apiResponse = data?.candidates[0].content.parts[0].text;
        textElement.innerText = apiResponse;
        console.log(apiResponse);
    }
    catch (error) {
        console.log(error);
    }
    finally {
        aiChatBox.querySelector(".loading").style.display = "none";
    }
}

function showLoading() {
    let html = `<div class="img"><img src="chatbot-4736275_1920.png" alt="" width="50"></div>
            <p class="text"></p>
            <img src="load.gif" alt="" class="loading" height="50">`
    let aiChatBox = createChatBox(html, "ai-chat-box");
    chatContainer.appendChild(aiChatBox);
    getApiResponse(aiChatBox);
}



btn.addEventListener("click", () => {
    userMessage = prompt.value;
    if (userMessage != "") {
        container.style.display = "none";
    }
    else {
        container.style.display = "flex";
    }
    if (!userMessage) return;
    let html = `<div class="img"><img src="avatar-3637425_1280.png" alt="" width="50"></div>
            <p class="text"></p></div>`
    let userChatBox = createChatBox(html, "user-chat-box");
    userChatBox.querySelector(".text").innerText = userMessage;
    chatContainer.appendChild(userChatBox);
    prompt.value = "";
    setTimeout(showLoading, 500);
})