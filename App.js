function setDocumentAttributes(title, faviconHref) {
  document.title = title;

  const faviconLink = document.querySelector('link[rel="icon"]');
  if (faviconLink) {
    faviconLink.href = faviconHref;
  }
}

function renderLoginForm() {
  setDocumentAttributes(
    "Login",
    "https://cdn.iconscout.com/icon/premium/png-512-thumb/user-239-95852.png?f=webp&w=256"
  );

  const appRoot = document.getElementById("app-root");
  appRoot.innerHTML = `
    <h2>Login</h2>
    <form id="loginForm">
      <label for="username">Username:</label>
      <input type="text" id="username" name="username" required/>

      <label for="password">Password:</label>
      <input type="password" id="password" name="password" required/>

      <button type="button" onclick="handleLogin()">Login</button>
    </form>
  `;
}

function handleLogin() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "admin") {
    window.location.href = "/UserDashboard.html";
  } else {
    alert("Invalid username or password");
  }
}

// Initial rendering
renderLoginForm();
