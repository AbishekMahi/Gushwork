/**
 * Hero Carousel Module
 * Handles: carousel navigation, thumbnail selection, auto-play, zoom preview
 */
export function initHeroCarousel() {
  const stage = document.querySelector(".carousel__stage");
  const thumbsContainer = document.querySelector(".carousel__thumbs");
  const images = document.querySelectorAll(".carousel__stage .carousel__img");
  const thumbs = document.querySelectorAll(
    ".carousel__thumbs .carousel__thumb",
  );
  const prevBtn = document.querySelector(".carousel__arrow--prev");
  const nextBtn = document.querySelector(".carousel__arrow--next");
  const zoomPanel = document.getElementById("zoomPanel");

  if (!stage || images.length === 0) return;

  let currentIndex = 0;

  const syncThumbStrip = () => {
    if (!thumbsContainer || !thumbs[currentIndex]) return;

    const activeThumb = thumbs[currentIndex];
    const targetLeft =
      activeThumb.offsetLeft -
      (thumbsContainer.clientWidth - activeThumb.offsetWidth) / 2;

    thumbsContainer.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: "smooth",
    });
  };

  const goTo = (index) => {
    images.forEach((image) => image.classList.remove("active"));
    thumbs.forEach((thumb) => {
      thumb.classList.remove("active");
      thumb.setAttribute("aria-selected", "false");
    });

    currentIndex = (index + images.length) % images.length;

    images[currentIndex].classList.add("active");
    if (thumbs[currentIndex]) {
      thumbs[currentIndex].classList.add("active");
      thumbs[currentIndex].setAttribute("aria-selected", "true");
      syncThumbStrip();
    }

    if (zoomPanel) {
      zoomPanel.style.backgroundImage = `url(${images[currentIndex].src})`;
    }
  };

  // Arrow buttons
  if (prevBtn) prevBtn.addEventListener("click", () => goTo(currentIndex - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => goTo(currentIndex + 1));

  // Thumbnail clicks
  thumbs.forEach((thumb, i) => {
    thumb.addEventListener("click", () => goTo(i));
  });

  // Keyboard navigation
  stage.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") goTo(currentIndex - 1);
    if (e.key === "ArrowRight") goTo(currentIndex + 1);
  });

  // Auto-play
  let autoPlayInterval = setInterval(() => goTo(currentIndex + 1), 4000);

  stage.addEventListener("mouseenter", () => clearInterval(autoPlayInterval));
  stage.addEventListener("mouseleave", () => {
    autoPlayInterval = setInterval(() => goTo(currentIndex + 1), 4000);
  });

  // Zoom functionality
  if (!zoomPanel) {
    goTo(0);
    return;
  }

  zoomPanel.style.backgroundImage = `url(${images[0].src})`;
  zoomPanel.style.backgroundSize = "400%";

  stage.addEventListener("mouseenter", () => {
    zoomPanel.style.backgroundImage = `url(${images[currentIndex].src})`;
    zoomPanel.classList.add("is-visible");
  });

  stage.addEventListener("mouseleave", () => {
    zoomPanel.classList.remove("is-visible");
  });

  stage.addEventListener("mousemove", (e) => {
    const rect = stage.getBoundingClientRect();
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100;
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100;

    const x = Math.min(Math.max(xPercent, 0), 100);
    const y = Math.min(Math.max(yPercent, 0), 100);

    zoomPanel.style.backgroundPosition = `${x}% ${y}%`;
  });

  goTo(0);
}
