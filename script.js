const clock = document.getElementById("clock");
const description = document.getElementById("description");
const eventLog = document.getElementById("eventLog");
const logStatus = document.getElementById("logStatus");
const scanBtn = document.getElementById("scanBtn");

const anomalies = [
  {
    text: "Un corredor que no estaba antes aparece al este. Mismo patrón de alfombra.",
    entry: "corredor no registrado detectado al este",
  },
  {
    text: "El zumbido baja medio tono durante cuatro segundos y vuelve a su frecuencia.",
    entry: "variación de frecuencia acústica — 4s",
  },
  {
    text: "La distancia hasta la siguiente intersección parece un 12% más larga que antes.",
    entry: "inconsistencia métrica en tramo norte",
  },
  {
    text: "Marcas en la pared izquierda cambian de orden sin causa aparente.",
    entry: "alteración de referencias visuales — pared L",
  },
  {
    text: "Los fluorescentes sincronizan su parpadeo con tus pasos durante tres segundos.",
    entry: "sincronización lumínica anómala — 3s",
  },
  {
    text: "La temperatura desciende dos grados en una sección de menos de cuatro metros.",
    entry: "gradiente térmico localizado — Δ-2°C",
  },
  {
    text: "Una puerta entreabierta. Al mirar, solo hay otro pasillo idéntico.",
    entry: "apertura no catalogada — contenido estándar",
  },
];

function now() {
  return new Date().toLocaleTimeString("es-ES", { hour12: false });
}

function updateClock() {
  clock.textContent = now();
}

function addLogEntry(message) {
  const li = document.createElement("li");
  const timeSpan = document.createElement("span");
  timeSpan.className = "log-time";
  timeSpan.textContent = now();
  li.appendChild(timeSpan);
  li.appendChild(document.createTextNode(" " + message));
  li.classList.add("fresh");

  eventLog.prepend(li);

  while (eventLog.children.length > 8) {
    eventLog.removeChild(eventLog.lastElementChild);
  }
}

function triggerAnomaly(source) {
  const a = anomalies[Math.floor(Math.random() * anomalies.length)];

  description.textContent = a.text;
  addLogEntry(source + " — " + a.entry);

  logStatus.textContent = "anomalía";
  logStatus.classList.add("alert");

  setTimeout(() => {
    logStatus.textContent = "en escucha";
    logStatus.classList.remove("alert");
  }, 2400);
}

scanBtn.addEventListener("click", () => {
  triggerAnomaly("escaneo manual");
});

// Ambient auto-events
setInterval(() => {
  if (Math.random() > 0.72) {
    triggerAnomaly("detección pasiva");
  }
}, 5000);

// Clock tick
updateClock();
setInterval(updateClock, 1000);
