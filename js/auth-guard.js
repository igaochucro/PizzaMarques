import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { auth, isFirebaseConfigured } from "./firebase-init.js";

// CRACHÁ DIGITAL / ROUTE GUARD
if (!isFirebaseConfigured) {
  window.location.replace("login.html");
} else {
  onAuthStateChanged(auth, (user) => {
    if (!user || !user.uid) {
      window.location.replace("login.html");
      return;
    }

    const userLabel = document.querySelector("[data-user]");
    if (userLabel) userLabel.textContent = user.email || user.uid;
  });
}

const logoutButton = document.querySelector("[data-logout]");
if (logoutButton && isFirebaseConfigured) {
  logoutButton.addEventListener("click", async () => {
    await signOut(auth);
    window.location.replace("login.html");
  });
}
