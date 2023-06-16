window.addEventListener("DOMContentLoaded", function() {
  const notificationShown = localStorage.getItem("notificationShown");

  if (!notificationShown) {
    Swal.fire({
      title: "Gracias por probar mi página!",
      text: "El sitio web es de formato prueba, por favor solamente ingrese información ficticia para probarla.",
      icon: "",
      showCancelButton: false,
      showConfirmButton: true,
      confirmButtonColor: "#000000",
      confirmButtonText: "Aceptar",
      customClass: {
        popup: "custom-popup",
        confirmButton: "custom-confirm-button"
      }
    });

    localStorage.setItem("notificationShown", "true");
  }
});