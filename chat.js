const messages =
    document.getElementById("messages");

const input =
    document.getElementById("messageInput");

const sendButton =
    document.getElementById("sendButton");

const clearButton =
    document.getElementById("clearChat");

const quickButtons =
    document.querySelectorAll(
        ".quick button"
    );


// ===============================
// SEND MESSAGE
// ===============================

async function sendMessage() {

    const text =
        input.value.trim();

    if (!text) return;


    // USER MESSAGE

    addUserMessage(text);

    input.value = "";

    input.style.height = "auto";

    scrollBottom();


    // TYPING

    const typing =
        document.createElement("div");

    typing.className =
        "message ai";

    typing.innerHTML = `

        <div class="small-avatar">
            ✦
        </div>

        <div>

            <small class="name">
                GetInfo AI
            </small>

            <div class="bubble typing">

                <span></span>
                <span></span>
                <span></span>

            </div>

        </div>

    `;

    messages.appendChild(typing);

    scrollBottom();


    try {

        const response =
            await fetch("/api/chat", {

                method: "POST",

                headers: {

                    "Content-Type":
                        "application/json"

                },

                body: JSON.stringify({

                    message: text

                })

            });


        const data =
            await response.json();


        typing.remove();


        if (!response.ok) {

            throw new Error(
                data.reply ||
                "Server error"
            );

        }


        addAIMessage(
            data.reply
        );


    }

    catch (error) {

        console.error(error);

        typing.remove();

        addAIMessage(
            "Sorry, I couldn't connect to the AI. Please check your server and API key."
        );

    }

}


// ===============================
// USER MESSAGE
// ===============================

function addUserMessage(text) {

    const message =
        document.createElement("div");

    message.className =
        "user-message";


    const bubble =
        document.createElement("div");

    bubble.className =
        "user-bubble";

    bubble.textContent =
        text;


    message.appendChild(bubble);

    messages.appendChild(message);

}


// ===============================
// AI MESSAGE
// ===============================

function addAIMessage(text) {

    const message =
        document.createElement("div");

    message.className =
        "message ai";


    message.innerHTML = `

        <div class="small-avatar">
            ✦
        </div>

        <div>

            <small class="name">
                GetInfo AI
            </small>

            <div class="bubble"></div>

        </div>

    `;


    message
        .querySelector(".bubble")
        .textContent = text;


    messages.appendChild(message);

    scrollBottom();

}


// ===============================
// SEND BUTTON
// ===============================

sendButton.addEventListener(
    "click",
    sendMessage
);


// ===============================
// ENTER TO SEND
// ===============================

input.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendMessage();

        }

    }
);


// ===============================
// QUICK QUESTIONS
// ===============================

quickButtons.forEach(button => {

    button.addEventListener(
        "click",
        function() {

            input.value =
                "Tell me about " +
                this.textContent.trim();

            sendMessage();

        }
    );

});


// ===============================
// CLEAR CHAT
// ===============================

clearButton.addEventListener(
    "click",
    function() {

        messages.innerHTML = `

            <div class="message ai">

                <div class="small-avatar">
                    ✦
                </div>

                <div>

                    <small class="name">
                        GetInfo AI
                    </small>

                    <div class="bubble">

                        Hi again 👋

                        <br><br>

                        What would you like
                        to know about digital
                        marketing?

                    </div>

                </div>

            </div>

        `;

    }
);


// ===============================
// AUTO RESIZE
// ===============================

input.addEventListener(
    "input",
    function() {

        this.style.height = "auto";

        this.style.height =
            Math.min(
                this.scrollHeight,
                120
            ) + "px";

    }
);


// ===============================
// SCROLL
// ===============================

function scrollBottom() {

    messages.scrollTo({

        top:
            messages.scrollHeight,

        behavior:
            "smooth"

    });

}