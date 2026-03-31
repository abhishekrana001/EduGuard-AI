// TEXT CHECK
async function checkText() {
    const text = document.getElementById("textInput").value.trim();
    const resultBox = document.getElementById("resultBox");

    if (!text) {
        alert("Enter text first!");
        return;
    }

    resultBox.innerHTML = "⏳ Checking text...";

    try {
        const res = await fetch("http://localhost:5000/api/check/text", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text })
        });

        const data = await res.json();

        resultBox.innerHTML = `
            <p><b>Result:</b> ${data.message}</p>
            <p><b>AI Probability:</b> ${data.aiProbability}%</p>
        `;

    } catch (err) {
        resultBox.innerHTML = "⚠️ Error checking text";
    }
}


// IMAGE CHECK
async function checkImage() {
    const file = document.getElementById("imageInput").files[0];
    const resultBox = document.getElementById("resultBox");

    if (!file) {
        alert("Upload image first!");
        return;
    }

    resultBox.innerHTML = "⏳ Checking image...";

    try {
        const res = await fetch("http://localhost:5000/api/check/image", {
            method: "POST"
        });

        const data = await res.json();

        resultBox.innerHTML = `
            <p><b>Image Result:</b> ${data.result}</p>
        `;

    } catch (err) {
        resultBox.innerHTML = "⚠️ Error checking image";
    }
}