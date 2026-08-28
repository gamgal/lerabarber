// ========================================
// CATÁLOGO DE CORTES
// ========================================

const cuts = [
    {
        name: "Degradado Afeitado con Barba",
        description: "Degradado limpio y moderno.",
        image: "images/fade.webp"
    },
    {
        name: "Degradado Simple",
        description: "Degradado elegante y versátil.",
        image: "images/taper.webp"
    },
    {
        name: "Degradado Simple Curvo",
        description: "Corte estético, limpio y práctico,",
        image: "images/buzz.webp"
    },
    {
        name: "Degradado Simple Curvo",
        description: "Un estilo tradicional que nunca pasa de moda,",
        image: "images/clasico.webp"
    },
    {
        name: "Degradado Afeitado y Barba",
        description: "Degradado simple con afeitado de barba, fresco y conservador.",
        image: "images/diseno.webp"
    },
    {
        name: "Degradado con Dibujo y Barba",
        description: "Diseños personalizados para darle un toque diferente.",
        image: "images/corte-barba.webp"
    }
];


// ========================================
// MOSTRAR CATÁLOGO
// ========================================

const cutsContainer = document.getElementById("cuts-container");

cuts.forEach(cut => {

    const cutCard = document.createElement("article");

    cutCard.classList.add("cut-card");

    cutCard.innerHTML = `
        <img 
            src="${cut.image}" 
            alt="${cut.name}"
        >

        <div class="cut-card-content">

            <h3>${cut.name}</h3>

            <p>${cut.description}</p>

            <span class="cut-price">
                500 CUP
            </span>

        </div>
    `;

    cutsContainer.appendChild(cutCard);

    // ========================================
// OFERTA DEL DÍA
// ========================================

const dailyOffer = "🔥 Corte + Barba + Cejas por 600CUP 🔥";

document.getElementById("daily-offer-text").textContent = dailyOffer;

// ========================================
// SISTEMA DE RESERVAS
// ========================================

const bookingForm = document.getElementById("booking-form");

const dateInput = document.getElementById("date");


// Evitar seleccionar fechas pasadas

const today = new Date();

const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");

const todayFormatted = `${year}-${month}-${day}`;

dateInput.min = todayFormatted;

// ========================================
// HORARIO DE ATENCIÓN
// ========================================

const openingTime = "09:00";
const closingTime = "20:00";

const timeInput = document.getElementById("time");

timeInput.min = openingTime;
timeInput.max = closingTime;

// ========================================
// VALIDACIÓN DEL FORMULARIO
// ========================================

bookingForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const selectedDate = dateInput.value;
    const selectedTime = timeInput.value;

    const addressInput = document.getElementById("address");
    const referenceInput = document.getElementById("reference");

    const address = addressInput.value.trim();
    const reference = referenceInput.value.trim();


    // Comprobar que todos los campos estén completos

    if (
        !selectedDate ||
        !selectedTime ||
        !address ||
        !reference
    ) {
        alert("Por favor, completa todos los campos.");
        return;
    }


    // Comprobar que la fecha no sea anterior a hoy

    if (selectedDate < todayFormatted) {
        alert("No puedes seleccionar una fecha anterior a hoy.");
        return;
    }


    // Comprobar horario

    if (
        selectedTime < openingTime ||
        selectedTime > closingTime
    ) {
        alert(
            `El horario de atención es de ${openingTime} a ${closingTime}.`
        );

        return;
    }


    // Si todo está correcto

        // ========================================
    // CREAR MENSAJE DE WHATSAPP
    // ========================================

    const dateObject = new Date(`${selectedDate}T00:00:00`);

    const formattedDate = dateObject.toLocaleDateString(
        "es-ES",
        {
            day: "numeric",
            month: "long",
            year: "numeric"
        }
    );


    const whatsappMessage = `
Hola, quiero reservar un servicio en la barbería.

- Día: ${formattedDate}
- Hora: ${selectedTime}

- Dirección:
${address}

- Punto de referencia:
${reference}

¿Podrían confirmarme la disponibilidad?

Gracias.
    `.trim();


    const whatsappNumber = "50158993";

const whatsappURL =
    `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

window.location.href = whatsappURL;

});
});