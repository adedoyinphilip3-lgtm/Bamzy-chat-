const SUPABASE_URL = "YOUR_PROJECT_URL";
const SUPABASE_KEY = "YOUR_PUBLISHABLE_KEY";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
function sendMessage() {
  const input = document.getElementById("messageInput");
  const messages = document.getElementById("messages");

  const text = input.value.trim();

  if (text === "") {
    return;
  }

  const message = document.createElement("div");
  message.classList.add("message", "sent");
  message.textContent = text;

  messages.appendChild(message);

  input.value = "";

  messages.scrollTop = messages.scrollHeight;
}

const input = document.getElementById("messageInput");

input.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});
