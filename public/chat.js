// FORMAT TEXT (IMPORTANT 🔥)
function formatText(text) {
    return text
        .replace(/\n/g, "<br>")
        .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>")
        .replace(/### (.*?)/g, "<h3>$1</h3>");
}

// SEND MESSAGE
async function sendMessage() {
    const input = document.getElementById("userInput");
    const message = input.value.trim();

    if (!message) return;

    const chatBox = document.getElementById("chatBox");
    const historyList = document.getElementById("chatHistory");

    // 👤 USER MESSAGE
    const userMsg = document.createElement("div");
    userMsg.className = "message user";
    userMsg.innerText = message;
    chatBox.appendChild(userMsg);

    // 🧠 HISTORY
    if (historyList) {
        const li = document.createElement("li");
        li.innerText = message.substring(0, 25);
        historyList.appendChild(li);
    }

    input.value = "";

    // 🤖 BOT LOADING
    const botMsg = document.createElement("div");
    botMsg.className = "message bot";
    botMsg.innerText = "Typing...";
    chatBox.appendChild(botMsg);

    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        const BASE_URL = window.location.origin;

        const res = await fetch(`${BASE_URL}/api/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message })
        });

        const data = await res.json();

        // 🔥 FORMAT TEXT
        let formatted = formatText(data.reply);

        // 🔥 TYPE EFFECT WITH HTML
        botMsg.innerHTML = "";
        let i = 0;

        function typeEffect() {
            if (i < formatted.length) {
                botMsg.innerHTML = formatted.substring(0, i);
                i++;
                setTimeout(typeEffect, 10);
            }
        }

        typeEffect();

    } catch (error) {
        console.log(error);
        botMsg.innerText = "⚠️ Server error. Please try again.";
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}