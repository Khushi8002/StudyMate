
const chatForm = document.getElementById("chat-form");
const userInput = document.getElementById("user-input");
const chatMessages = document.getElementById("chat-messages");
const clearChat = document.getElementById("clear-chat");
const suggestionButtons = document.querySelectorAll(".suggestion-btn");

// Predefined chatbot responses
const responses = [
    {
        keywords: ["hello", "hi", "hey"],
        answer: "Hello! 😊 Welcome to StudyMate. What would you like to learn today?"
    },
    {
        keywords: ["html"],
        answer: "HTML stands for HyperText Markup Language. It is used to create the structure of web pages using elements such as headings, paragraphs, images, and links."
    },
    {
        keywords: ["css"],
        answer: "CSS stands for Cascading Style Sheets. It is used to style web pages by controlling colors, fonts, layouts, spacing, and responsiveness."
    },
    {
        keywords: ["javascript", "js"],
        answer: "JavaScript is a programming language used to make websites interactive. It can handle events, update webpage content, validate forms, and communicate with APIs."
    },
    {
        keywords: ["python"],
        answer: "Python is a high-level programming language known for its readable syntax. It is used in web development, automation, data science, and artificial intelligence."
    },
    {
        keywords: ["c programming", "language c", " c language", "program in c"],
        answer: "C is a procedural programming language. It supports variables, loops, functions, arrays, pointers, and structures. It is commonly used to learn programming fundamentals."
    },
    {
        keywords: ["study tips", "study tip", "how to study", "exam tips"],
        answer: "Here are some study tips:\n1. Make a realistic study timetable.\n2. Study in short focused sessions.\n3. Practice questions regularly.\n4. Revise topics frequently.\n5. Take breaks and get enough sleep."
    },
    {
        keywords: ["operating system", "what is os"],
        answer: "An Operating System (OS) is system software that manages computer hardware and software resources. Examples include Windows, Linux, macOS, and Android."
    },
    {
        keywords: ["project"],
        answer: "You can start with a personal portfolio, to-do list app, calculator, online notes app, or study chatbot. Visit our Projects page for more ideas!"
    },
    {
        keywords: ["thank"],
        answer: "You're welcome! 😊 Keep learning and keep growing."
    }
];

// Return a matching response
function getBotResponse(question) {
    const text = question.toLowerCase().trim();

    for (const item of responses) {
        if (item.keywords.some(keyword => text.includes(keyword))) {
            return item.answer;
        }
    }

    return "That's an interesting question! I'm currently a demo chatbot, so I only know a limited set of topics. Try asking about HTML, CSS, JavaScript, Python, C programming, operating systems, or study tips.";
}

// Get current time
function getTime() {
    return new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}

// Safely create and display a chat message
function addMessage(text, sender) {
    const message = document.createElement("div");
    message.className = `message ${sender}-message`;

    const avatar = document.createElement("div");
    avatar.className = "message-avatar";

    const icon = document.createElement("i");
    icon.className = sender === "bot"
        ? "fa-solid fa-robot"
        : "fa-solid fa-user";

    avatar.appendChild(icon);

    const content = document.createElement("div");
    content.className = "message-content";

    const paragraph = document.createElement("p");
    paragraph.textContent = text;

    const time = document.createElement("span");
    time.className = "message-time";
    time.textContent = getTime();

    content.appendChild(paragraph);
    content.appendChild(time);

    message.appendChild(avatar);
    message.appendChild(content);

    chatMessages.appendChild(message);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Handle form submission
chatForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const question = userInput.value.trim();

    if (question === "") return;

    addMessage(question, "user");
    userInput.value = "";

    const answer = getBotResponse(question);
    addMessage(answer, "bot");

    userInput.focus();
});

// Handle suggested questions
suggestionButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const question = button.dataset.question;

        addMessage(question, "user");
        addMessage(getBotResponse(question), "bot");
    });
});

// Clear conversation
clearChat.addEventListener("click", function() {
    chatMessages.replaceChildren();

    addMessage(
        "Hello! 👋 I'm StudyMate Bot. Ask me about HTML, CSS, JavaScript, Python, C programming, or study tips.",
        "bot"
    );
});