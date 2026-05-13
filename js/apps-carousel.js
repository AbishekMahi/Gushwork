/**
 * Applications Carousel Module
 * Handles horizontal scrolling carousel with touch/swipe support
 */
export function initAppsCarousel() {
  const viewport = document.getElementById("appsCarousel");
  const track = document.getElementById("appsTrack");
  const prevBtn = document.getElementById("appsCarouselPrev");
  const nextBtn = document.getElementById("appsCarouselNext");

  if (!viewport || !track) return;

  const cardWidth = () => {
    const card = track.querySelector(".app-card");
    if (!card) return 280;
    return card.offsetWidth + 16;
  };

  const slide = (direction) => {
    const step = cardWidth();
    viewport.scrollBy({
      left: direction * step,
      behavior: "smooth",
    });
  };

  if (prevBtn) prevBtn.addEventListener("click", () => slide(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => slide(1));
}
