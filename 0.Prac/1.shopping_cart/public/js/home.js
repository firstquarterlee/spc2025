document.addEventListener("DOMContentLoaded", () => {
  checkLoginStatus();

  document.getElementById("login").addEventListener("click", (e) => {
    e.preventDefault();
    login();
  });
});
