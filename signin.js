const body = document.querySelector("body")

const redirectPage = (page) => {
  body.classList.add("fade-out")
  setTimeout(() => {
    window.location.href = page
  }, 500)
}

document
  .querySelector(".already-account-btn")
  .addEventListener("click", (e) => {
    e.preventDefault()
    redirectPage("./signup.html")
  })

document
  .getElementById("signinForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault() // Evitar el comportamiento por defecto del formulario

    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData.entries())

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const jsonResponse = await response.json()

      if (!response.ok) {
        throw new Error(jsonResponse.message || "Error desconocido")
      }

      // Si el login es exitoso, redirigir al usuario a la página principal
      alert("Login exitoso!")
      window.location.href = "/homepage.html" // Cambiar esto según la página que desees mostrar tras el login
    } catch (error) {
      console.error("Error:", error)
      alert("Error de inicio de sesión: " + error.message)
    }
  })
