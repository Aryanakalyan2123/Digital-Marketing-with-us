async function sendMessage() {
    const input = document.getElementById("userMessage");
    const chatBox = document.getElementById("chatBox");

    const message = input.value.trim();

    if (!message) return;

    chatBox.innerHTML += `<p><strong>You:</strong> ${message}</p>`;

    input.value = "";

    try {
        const response = await fetch("/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();

        if (data.reply) {
            chatBox.innerHTML += `<p><strong>AI:</strong> ${data.reply}</p>`;
        } else {
            chatBox.innerHTML += `<p><strong>AI:</strong> ${data.error}</p>`;
        }

    } catch (error) {
        console.error(error);
        chatBox.innerHTML += `<p><strong>AI:</strong> Connection error.</p>`;
    }
}