const SUPABASE_URL = "YOUR_PROJECT_URL";
const SUPABASE_KEY = "YOUR_PUBLISHABLE_KEY";

// Initialize Supabase client provided by the CDN script
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Top-level login function (index.html expects this to exist globally)
async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert("Login failed: " + error.message);
    return;
  }

  alert("Login successful!");
}

// Send a message (clearly separated from login)
async function sendMessage() {
  const input = document.getElementById("messageInput");
  const messages = document.getElementById("messages");

  if (!input || !messages) {
    console.error("DOM elements not found: messageInput or messages");
    return;
  }

  const text = input.value.trim();
  if (text === "") {
    return;
  }

  // Ensure the user is logged in
  const userResult = await supabase.auth.getUser();
  const userId = userResult?.data?.user?.id;
  if (!userId) {
    alert("You must be logged in to send messages");
    return;
  }

  const { data, error } = await supabase
    .from("messages")
    .insert([
      {
        sender_id: userId,
        content: text
      }
    ]);

  if (error) {
    console.error("Supabase error:", error);
    alert("Message could not be saved");
    return;
  }

  const message = document.createElement("div");
  message.classList.add("message", "sent");
  message.textContent = text;

  messages.appendChild(message);

  input.value = "";

  messages.scrollTop = messages.scrollHeight;
}

// Attach Enter key handler to the input (run when DOM is present)
const inputEl = document.getElementById("messageInput");
if (inputEl) {
  inputEl.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });
}
