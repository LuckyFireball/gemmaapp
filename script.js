document.getElementById("msg").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        ask();
    }
});

document.getElementById("sendBtn").addEventListener("click", function(e) {
    e.preventDefault();
    ask();
});

async function ask() {
    const input = document.getElementById("msg");
    const box = document.getElementById("box");
    const text = input.value.trim();
    if (!text) return;

    box.innerHTML += `<div class="msg-bubble user-msg">${text}</div>`;
    input.value = "";
    box.scrollTop = box.scrollHeight;

    const thinkingDiv = document.createElement("div");
    thinkingDiv.className = "msg-bubble bot-msg thinking-text";
    thinkingDiv.innerText = "THINKING...";
    box.appendChild(thinkingDiv);
    box.scrollTop = box.scrollHeight;

    try {
        const data = await document.getElementById("msg").addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        ask();
    }
});

document.getElementById("sendBtn").addEventListener("click", function(e) {
    e.preventDefault();
    ask();
});

async function ask() {
    const input = document.getElementById("msg");
    const box = document.getElementById("box");
    const text = input.value.trim();
    if (!text) return;

    box.innerHTML += `<div class="msg-bubble user-msg">${text}</div>`;
    input.value = "";
    box.scrollTop = box.scrollHeight;

    const thinkingDiv = document.createElement("div");
    thinkingDiv.className = "msg-bubble bot-msg thinking-text";
    thinkingDiv.innerText = "THINKING...";
    box.appendChild(thinkingDiv);
    box.scrollTop = box.scrollHeight;

    try {
        const data = await pywebview.api.chat(text);
        thinkingDiv.remove();
        box.innerHTML += `<div class="msg-bubble bot-msg">${data.response}</div>`;
    } catch (error) {
        thinkingDiv.remove();
        box.innerHTML += `<div class="msg-bubble bot-msg" style="color: #d93025; border-color: #fadbd8; background-color: #fce8e6;">Error processing request.</div>`;
    }
    box.scrollTop = box.scrollHeight;
}
pywebview.api.chat(text);
        thinkingDiv.remove();
        box.innerHTML += `<div class="msg-bubble bot-msg">${data.response}</div>`;
    } catch (error) {
        thinkingDiv.remove();
        box.innerHTML += `<div class="msg-bubble bot-msg" style="color: #d93025; border-color: #fadbd8; background-color: #fce8e6;">Error connecting to engine.</div>`;
    }
    box.scrollTop = box.scrollHeight;
}
