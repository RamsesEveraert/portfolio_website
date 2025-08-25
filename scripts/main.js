/*---------------------------------------------- Carousel Section -------------------------------------------------*/

function getCarouselInstance() {
  const element = document.getElementById("carouselExampleCaptions");
  if (element && window.bootstrap && window.bootstrap.Carousel) {
    return window.bootstrap.Carousel.getOrCreateInstance(element);
  }
  return null;
}

/*---------------------------------------------- Youtube Section -------------------------------------------------*/

let players = [];
let videoPlaying = false;

window.onYouTubeIframeAPIReady = function () {
  const iframes = document.querySelectorAll(".youtube-video");
  players = [];
  iframes.forEach((iframe, index) => {
    if (iframe.id && window.YT && window.YT.Player) {
      players[index] = new window.YT.Player(iframe.id, {
        events: {
          onStateChange: onPlayerStateChange,
        },
      });
    }
  });
};

function onPlayerStateChange(event) {
  const carouselInstance = getCarouselInstance();
  if (!event || !carouselInstance || !window.YT || !window.YT.PlayerState) return;

  const state = event.data;
  if (state === window.YT.PlayerState.PLAYING) {
    videoPlaying = true;
    if (carouselInstance) carouselInstance.pause();
  } else if (state === window.YT.PlayerState.ENDED) {
    videoPlaying = false;
    if(event?.target instanceof YT.Player){
      event.target.seekTo(0);
      event.target.pauseVideo();
    }
    setTimeout(() => {
      const ci = getCarouselInstance();
      if (ci) ci.next();
    }, 3000);
  } else if (state === window.YT.PlayerState.PAUSED) {
    videoPlaying = false;
    setTimeout(() => {
      const ci = getCarouselInstance();
      if (ci) ci.cycle();
    }, 3000);
  }
}

/*---------------------------------------------- General Section -------------------------------------------------*/

document.addEventListener("DOMContentLoaded", () => {

// Initialize EmailJS only if the library and init() are available
  window.emailjs?.init?.("g_iMnZ4PN4_GJjW2k");

  // Carousel custom indicators and slide handling
  const myCarouselEl = document.getElementById("carouselExampleCaptions");
  let bsCarousel = null;
  if (myCarouselEl && window.bootstrap && window.bootstrap.Carousel) {
    bsCarousel = window.bootstrap.Carousel.getOrCreateInstance(myCarouselEl);

    const indicators = myCarouselEl.querySelectorAll(".custom-indicator");
    myCarouselEl.addEventListener("slide.bs.carousel", (event) => {
      indicators.forEach((indicator) => indicator.classList.remove("active"));
      if (indicators[event.to]) indicators[event.to].classList.add("active");
    });

    myCarouselEl.addEventListener("slid.bs.carousel", () => {
      if (!videoPlaying && bsCarousel) {
        bsCarousel.cycle();
      }
    });
  }

  // Contact form submission (only if form and EmailJS exist)
  const contactForm = document.getElementById("contact-form");
  if (
    contactForm &&
    window.emailjs &&
    typeof window.emailjs.sendForm === "function"
  ) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();
      window.emailjs
        .sendForm("service_1schkg7", "template_vinsit6", this)
        .then(() => {
          alert("Your message has been sent successfully!");
        })
        .catch(() => {
          alert("Failed to send the message, please try again.");
        });
    });
  }

  /*---------------------------------------------- Project Section -------------------------------------------------*/

  // Project filtering
  const filterButtons = document.querySelectorAll(".filter-btn");
  const filterItems = document.querySelectorAll(".filter-item");

  if (filterButtons.length > 0) {
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        filterButtons.forEach((btn) => btn.classList.remove("active"));
        button.classList.add("active");

        const filter = button.getAttribute("data-filter");

        filterItems.forEach((item) => {
          const categories = (item.getAttribute("data-category") || "").split(" ");
          item.style.display = filter === "all" || categories.includes(filter) ? "block" : "none";
        });
      });
    });
  }
});

// YouTube videos stop and reset when a Bootstrap modal is closed
if (typeof document !== "undefined") {
  document.addEventListener("hide.bs.modal", (e) => {
    const modalEl = e.target;
    if (!modalEl) return;
    const iframes = modalEl.querySelectorAll("iframe");
    iframes.forEach((iframe) => {
      try {
        const src = iframe.getAttribute("src");
        if (src) iframe.setAttribute("src", src);
      } catch (_) {
        /* no-op */
      }
    });
  });
}
