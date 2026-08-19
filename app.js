const SUPABASE_URL = "YOUR_PROJECT_URL";
const SUPABASE_KEY = "YOUR_PUBLISHABLE_KEY";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);
async function sendMessage() {
  async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password
  });

  if (error) {
    alert("Login failed: " + error.message);
    return;
  }

  alert("Login successful!");
  }
  const input = document.getElementById("messageInput");
  const messages = document.getElementById("messages");

  const text = input.value.trim();

  if (text === "") {
    return;
  }
const { data, error } = await supabase
  .from("messages")
  .insert([
    {
      sender_id: (await supabase.auth.getUser()).data.user?.id,
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

const input = document.getElementById("messageInput");

input.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    sendMessage();
  }
});
