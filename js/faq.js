/**
 * FAQ Accordion Module
 * Handles FAQ accordion behavior - ensures only one item open at a time
 */
export function initFAQ() {
  const items = document.querySelectorAll(".faq__item");

  if (!items.length) return;

  const openItems = [...items].filter((item) => item.open);
  if (!openItems.length) {
    items[0].open = true;
  } else if (openItems.length > 1) {
    openItems.slice(1).forEach((item) => {
      item.open = false;
    });
  }

  items.forEach((item) => {
    const summary = item.querySelector(".faq__question");

    summary?.addEventListener("click", (event) => {
      if (item.open) {
        event.preventDefault();
      }
    });

    item.addEventListener("toggle", () => {
      if (item.open) {
        items.forEach((other) => {
          if (other !== item && other.open) {
            other.open = false;
          }
        });
      }
    });
  });
}
