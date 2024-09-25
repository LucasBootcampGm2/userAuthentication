document.getElementById("signupForm").addEventListener("submit", async (event) => {
  event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const jsonResponse = await response.json();

    if (!response.ok) {
      throw new Error(jsonResponse.message || "Error desconocido");
    }

    // Mostrar el mensaje de éxito
    alert(jsonResponse.message);
    // Aquí puedes redirigir al usuario o limpiar el formulario
  } catch (error) {
    // Manejar el error aquí
    console.error("Error:", error);
    alert(error.message);
  }
});
