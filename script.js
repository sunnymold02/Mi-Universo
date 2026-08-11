/* =========================================================
   MI UNIVERSO ❤️
   SCRIPT.JS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     NAVEGACIÓN
     ======================================================= */

  window.scrollToSection = function (sectionId) {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  };


  /* =======================================================
     MENSAJES
     ======================================================= */

  const messages = [
    {
      title: "Eres increíble ❤️",
      text: "No sé cómo explicarlo, pero desde que llegaste hay momentos que simplemente se sienten diferentes."
    },
    {
      title: "Gracias por todo ✨",
      text: "Gracias por cada conversación, cada sonrisa y cada pequeño momento que hemos compartido."
    },
    {
      title: "Contigo, todo es mejor ♡",
      text: "Hay personas que llegan sin hacer ruido y terminan convirtiéndose en un lugar favorito."
    }
  ];

  window.showMessage = function (index) {

    const modal = document.getElementById("messageModal");
    const title = document.getElementById("modalTitle");
    const text = document.getElementById("modalText");

    if (!modal || !title || !text) return;

    const message = messages[index];

    if (!message) return;

    title.textContent = message.title;
    text.textContent = message.text;

    modal.classList.add("show");
  };


  window.closeMessage = function () {

    const modal = document.getElementById("messageModal");

    if (modal) {
      modal.classList.remove("show");
    }
  };


  /* Cerrar modal haciendo clic fuera */

  const messageModal = document.getElementById("messageModal");

  if (messageModal) {

    messageModal.addEventListener("click", (event) => {

      if (event.target === messageModal) {
        closeMessage();
      }

    });

  }


  /* Cerrar modal con ESC */

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
      closeMessage();
    }

  });


  /* =======================================================
     RELOJ
     ======================================================= */

  const currentTime = document.getElementById("currentTime");

  function updateClock() {

    if (!currentTime) return;

    const now = new Date();

    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    currentTime.textContent =
      `${hours}:${minutes}:${seconds}`;
  }

  updateClock();

  setInterval(updateClock, 1000);


  /* =======================================================
     FOTO
     ======================================================= */

  const photoInput = document.getElementById("photoInput");
  const memoryImage = document.getElementById("memoryImage");
  const photoPlaceholder = document.getElementById("photoPlaceholder");

  if (photoInput && memoryImage) {

    photoInput.addEventListener("change", (event) => {

      const file = event.target.files[0];

      if (!file) return;

      if (!file.type.startsWith("image/")) {
        alert("Selecciona una imagen válida.");
        return;
      }

      const imageURL = URL.createObjectURL(file);

      memoryImage.src = imageURL;
      memoryImage.style.display = "block";

      if (photoPlaceholder) {
        photoPlaceholder.style.display = "none";
      }

    });

  }


  /* =======================================================
     MÚSICA
     ======================================================= */

  const songInput = document.getElementById("songInput");
  const audio = document.querySelector("audio");
  const musicTopButton = document.getElementById("musicTopButton");
  const musicStatus = document.getElementById("musicStatus");

  if (songInput && audio) {

    songInput.addEventListener("change", (event) => {

      const file = event.target.files[0];

      if (!file) return;

      if (!file.type.startsWith("audio/")) {
        alert("Selecciona un archivo de audio válido.");
        return;
      }

      const audioURL = URL.createObjectURL(file);

      audio.src = audioURL;

      audio.load();

      if (musicStatus) {
        musicStatus.textContent = "Música: Lista";
      }

    });

  }


  /* Botón de música superior */

  if (musicTopButton && audio) {

    musicTopButton.addEventListener("click", async () => {

      if (audio.paused) {

        try {

          await audio.play();

          if (musicStatus) {
            musicStatus.textContent = "Música: Encendida";
          }

        } catch (error) {

          if (musicStatus) {
            musicStatus.textContent = "Música: Selecciona una canción";
          }

        }

      } else {

        audio.pause();

        if (musicStatus) {
          musicStatus.textContent = "Música: Apagada";
        }

      }

    });


    audio.addEventListener("play", () => {

      if (musicStatus) {
        musicStatus.textContent = "Música: Encendida";
      }

    });


    audio.addEventListener("pause", () => {

      if (musicStatus) {
        musicStatus.textContent = "Música: Apagada";
      }

    });

  }


  /* =======================================================
     ESTRELLAS
     ======================================================= */

  const canvas = document.getElementById("spaceCanvas");

  if (canvas) {

    const ctx = canvas.getContext("2d");

    let stars = [];

    function resizeCanvas() {

      const ratio = window.devicePixelRatio || 1;

      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;

      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      createStars();

    }


    function createStars() {

      const amount = Math.min(
        240,
        Math.max(
          100,
          Math.floor(
            (window.innerWidth * window.innerHeight) / 8500
          )
        )
      );

      stars = [];

      for (let i = 0; i < amount; i++) {

        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          radius: Math.random() * 1.4 + 0.2,
          alpha: Math.random() * 0.7 + 0.2,
          speed: Math.random() * 0.015 + 0.003,
          phase: Math.random() * Math.PI * 2
        });

      }

    }


    function drawStars(time) {

      ctx.clearRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
      );

      stars.forEach((star) => {

        const glow =
          star.alpha +
          Math.sin(time * star.speed + star.phase) * 0.18;

        ctx.beginPath();

        ctx.arc(
          star.x,
          star.y,
          star.radius,
          0,
          Math.PI * 2
        );

        ctx.fillStyle =
          `rgba(255,255,255,${Math.max(0.08, glow)})`;

        ctx.fill();

      });

      requestAnimationFrame(drawStars);

    }


    window.addEventListener(
      "resize",
      resizeCanvas
    );

    resizeCanvas();

    requestAnimationFrame(drawStars);

  }


  /* =======================================================
     NAVBAR ACTIVA
     ======================================================= */

  const sections = document.querySelectorAll(
    "section[id]"
  );

  const navLinks = document.querySelectorAll(
    ".navbar nav a"
  );

  if (sections.length && navLinks.length) {

    const observer = new IntersectionObserver(
      (entries) => {

        entries.forEach((entry) => {

          if (!entry.isIntersecting) return;

          navLinks.forEach((link) => {
            link.classList.remove("active");
          });

          const activeLink =
            document.querySelector(
              `.navbar nav a[href="#${entry.target.id}"]`
            );

          if (activeLink) {
            activeLink.classList.add("active");
          }

        });

      },
      {
        rootMargin: "-35% 0px -55% 0px"
      }
    );

    sections.forEach((section) => {
      observer.observe(section);
    });

  }


  /* =======================================================
     PROTECCIÓN DEL ENLACE DE NAVEGACIÓN
     ======================================================= */

  document.querySelectorAll(
    '.navbar nav a[href^="#"]'
  ).forEach((link) => {

    link.addEventListener("click", (event) => {

      const targetId =
        link.getAttribute("href").substring(1);

      const target =
        document.getElementById(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* =======================================================
     INICIO
     ======================================================= */

  console.log("❤️ Mi Universo cargado correctamente.");

});
