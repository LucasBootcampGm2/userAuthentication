const body = document.querySelector("body")
const fullnameInput = document.getElementById("fullname-input")
const usernameInput = document.getElementById("username")
const emailInput = document.getElementById("email-input")
const passwordInput = document.getElementById("password")
const confirmPasswordInput = document.getElementById("confirm-password")

const redirectPage = (page) => {
  body.classList.add("fade-out")
  setTimeout(() => {
    window.location.href = page
  }, 500)
}

const usersTable = "SELECT * FROM users"

function saveFullName() {
  
}

document
  .querySelector(".already-account-btn")
  .addEventListener("click", (e) => {
    e.preventDefault()
    redirectPage("./signin.html")
  })
