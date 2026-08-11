/* ==========================================
   UNIVERSO ANIMADO
========================================== */

const canvas = document.getElementById("spaceCanvas");
const ctx = canvas.getContext("2d");

let stars = [];
let width = 0;
let height = 0;


/* Ajustar canvas */

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;

  canvas.width = width * window.devicePixelRatio;
  canvas.height = height * window.devicePixelRatio;

  canvas.style.width = width + "px";
  canvas.style.height = height + "px";

  ctx.setTransform(
    window.devicePixelRatio,
    0,
    0,
    window.devicePixelRatio,
    0,
    0
  );

  createStars();
}


/* Crear estrellas */

function createStars() {

  stars = [];

  const amount = Math.min(
    550,
    Math.floor((width * height) / 2500)
  );

  for (let i = 0; i < amount; i++) {

    stars.push({

      x: Math.random() * width,

      y: Math.random() * height,

      radius:
        Math.random() * 1.7 + .2,

      alpha:
        Math.random() * .8 + .2,

      speed:
        Math.random() * .25 + .03,

      twinkle:
        Math.random() * .03 + .005,

      direction:
        Math.random() > .5 ? 1 : -1

    });

  }

}


/* Dibujar estrellas */

function drawStars() {

  ctx.clearRect(
    0,
    0,
    width,
    height
  );

  stars.forEach(star => {

    star.y += star.speed;

    star.alpha +=
      star.twinkle *
      star.direction;

    if (star.alpha >= 1) {
      star.alpha = 1;
      star.direction = -1;
    }

    if (star.alpha <= .15) {
      star.alpha = .15;
      star.direction = 1;
    }

    if (star.y > height + 10) {
      star.y = -10;
      star.x = Math.random() * width;
    }

    ctx.beginPath();

    ctx.fillStyle =
      `rgba(255,255,255,${star.alpha})`;

    ctx.arc(
      star.x,
      star.y,
      star.radius,
      0,
      Math.PI * 2
    );

    ctx.fill();

  });

  requestAnimationFrame(drawStars);
}


window.addEventListener(
  "resize",
  resizeCanvas
);

resizeCanvas();
drawStars();


/* ==========================================
   NAVEGACIÓN
========================================== */

function scrollToSection(id) {

  const section =
    document.getElementById(id);

  if (!section) return;

  section.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });

}


/* ==========================================
   MENSAJES
========================================== */

const messages = [

  {
    title: "Eres increíble ♡",

    text:
      "No sé cómo explicarlo, pero desde que llegaste hay momentos que simplemente se sienten diferentes. Gracias por ser esa persona que hace que un día normal pueda convertirse en un recuerdo bonito."
  },

  {
    title: "Gracias por todo ✦",

    text:
      "Gracias por cada conversación, cada sonrisa y cada pequeño momento que hemos compartido. Quizá algunas cosas parezcan pequeñas, pero para mí tienen un lugar especial."
  },

  {
    title: "Contigo, todo es mejor ♡",

    text:
      "Hay personas que llegan sin hacer ruido y terminan convirtiéndose en un lugar favorito. Tú eres una de esas personas que hacen que todo se sienta un poquito más bonito."
  }

];


function showMessage(index) {

  const modal =
    document.getElementById(
      "messageModal"
    );

  const title =
    document.getElementById(
      "modalTitle"
    );

  const text =
    document.getElementById(
      "modalText"
    );

  if (!messages[index]) return;

  title.textContent =
    messages[index].title;

  text.textContent =
    messages[index].text;

  modal.classList.add("show");

}


function closeMessage() {

  const modal =
    document.getElementById(
      "messageModal"
    );

  modal.classList.remove("show");

}


document
  .getElementById("messageModal")
  .addEventListener(
    "click",
    function(event) {

      if (event.target === this) {
        closeMessage();
      }

    }
  );


/* ==========================================
   FOTO
========================================== */

const photoInput =
  document.getElementById(
    "photoInput"
  );

const memoryImage =
  document.getElementById(
    "memoryImage"
  );

const photoFrame =
  document.querySelector(
    ".photo-frame"
  );


photoInput.addEventListener(
  "change",
  function() {

    const file = this.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {

      alert(
        "Selecciona una imagen válida."
      );

      return;
    }

    const imageURL =
      URL.createObjectURL(file);

    memoryImage.src =
      imageURL;

    photoFrame.classList.add(
      "has-image"
    );

  }
);


/* ==========================================
   MÚSICA
========================================== */

const songInput =
  document.getElementById(
    "songInput"
  );

const loveSong =
  document.getElementById(
    "loveSong"
  );

const musicTopButton =
  document.getElementById(
    "musicTopButton"
  );

const musicStatus =
  document.getElementById(
    "musicStatus"
  );


songInput.addEventListener(
  "change",
  function() {

    const file = this.files[0];

    if (!file) return;

    if (!file.type.startsWith("audio/")) {

      alert(
        "Selecciona un archivo de audio válido."
      );

      return;
    }

    const audioURL =
      URL.createObjectURL(file);

    loveSong.src =
      audioURL;

    loveSong.load();

    musicStatus.textContent =
      "Música: Lista";

  }
);


/* Botón superior */

musicTopButton.addEventListener(
  "click",
  async function() {

    if (!loveSong.src) {

      alert(
        "Primero selecciona tu canción MP3 debajo de la foto."
      );

      return;
    }

    try {

      if (loveSong.paused) {

        await loveSong.play();

        musicStatus.textContent =
          "Música: Encendida";

      } else {

        loveSong.pause();

        musicStatus.textContent =
          "Música: Pausada";

      }

    } catch (error) {

      console.log(
        "El navegador necesita una interacción del usuario."
      );

    }

  }
);


/* Cambiar texto según reproducción */

loveSong.addEventListener(
  "play",
  function() {

    musicStatus.textContent =
      "Música: Encendida";

  }
);


loveSong.addEventListener(
  "pause",
  function() {

    musicStatus.textContent =
      "Música: Pausada";

  }
);


/* ==========================================
   RELOJ
========================================== */

function updateClock() {

  const now =
    new Date();

  let hours =
    now.getHours();

  const minutes =
    String(
      now.getMinutes()
    ).padStart(2, "0");

  const seconds =
    String(
      now.getSeconds()
    ).padStart(2, "0");

  const period =
    hours >= 12
      ? "PM"
      : "AM";

  hours =
    hours % 12;

  if (hours === 0) {
    hours = 12;
  }

  const time =
    `${hours}:${minutes}:${seconds} ${period}`;

  const clock =
    document.getElementById(
      "currentTime"
    );

  if (clock) {
    clock.textContent = time;
  }

}


updateClock();

setInterval(
  updateClock,
  1000
);


/* ==========================================
   NAVEGACIÓN ACTIVA
========================================== */

const sections =
  document.querySelectorAll(
    "section[id]"
  );

const navLinks =
  document.querySelectorAll(
    ".navbar nav a"
  );


const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (!entry.isIntersecting) {
          return;
        }

        navLinks.forEach(link => {

          link.classList.remove(
            "active"
          );

          if (
            link.getAttribute("href") ===
            "#" + entry.target.id
          ) {

            link.classList.add(
              "active"
            );

          }

        });

      });

    },
    {
      threshold: .35
    }
  );


sections.forEach(
  section => observer.observe(section)
);


/* ==========================================
   TECLADO
========================================== */

document.addEventListener(
  "keydown",
  function(event) {

    if (event.key === "Escape") {
      closeMessage();
    }

  }
);


/* ==========================================
   EFECTO DE MOVIMIENTO DEL UNIVERSO
========================================== */

document.addEventListener(
  "mousemove",
  function(event) {

    const x =
      (event.clientX / window.innerWidth - .5);

    const y =
      (event.clientY / window.innerHeight - .5);

    const galaxies =
      document.querySelectorAll(
        ".galaxy"
      );

    galaxies.forEach(
      (galaxy, index) => {

        const amount =
          index === 0
            ? 12
            : -12;

        galaxy.style.marginLeft =
          `${x * amount}px`;

        galaxy.style.marginTop =
          `${y * amount}px`;

      }
    );

  }
);