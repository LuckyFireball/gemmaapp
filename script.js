const box = document.getElementById('box');
const msgInput = document.getElementById('msg');
const sendBtn = document.getElementById('sendBtn');

function appendMessage(text, isBot) {
    const bubble = document.createElement('div');
    bubble.className = isBot ? 'msg-bubble bot-msg' : 'msg-bubble user-msg';
    bubble.textContent = text;
    box.appendChild(bubble);
    box.scrollTop = box.scrollHeight;
}

async function handleSendMessage() {
    const text = msgInput.value.trim();
    if (!text) return;

    appendMessage(text, false);
    msgInput.value = '';

    try {
        if (!window.pywebview || !window.pywebview.api) {
            await new Promise(resolve => window.addEventListener('pywebviewready', resolve, { once: true }));
        }

        let result = await window.pywebview.api.chat(text);
        
        if (result && result.response) {
            appendMessage(result.response, true);
        } else {
            appendMessage("Error: Received empty response from engine.", true);
        }
    } catch (error) {
        alert("Error connecting to engine.");
    }
}

sendBtn.addEventListener('click', handleSendMessage);

msgInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleSendMessage();
    }
});
