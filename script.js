const siteConfig = {
  bookingEngineUrl: "https://www.booking.com/hotel/gt/hostal-oasis-the-traveler-alta-verapaz-department.es.html",
  websiteUrl: "https://hotelesenlanquin.com/oasis-de-lanquin",
  whatsappNumber: "50240917878",
  phonePrimary: "+502 4091-7878",
  phoneSecondary: "+502 4888-7300",
  email: "lanquinh@gmail.com",
  instagramUrl: "https://www.instagram.com/hostal.oasis.the2/",
  tiktokUrl: "https://www.tiktok.com/@hostal.oasis.the2",
  reviewsUrl: "https://www.google.com/maps/place/Hostal+Oasis+The+Traveler/@15.5845263,-89.9786597,17z/data=!4m8!3m7!1s0x8f61fa37b1ab88b7:0x917fbc6a0b8e98e9!8m2!3d15.5845263!4d-89.9764706!9m1!1b1!16s%2Fg%2F11b7blz3lb?entry=ttu"
};

const whatsappMessage = encodeURIComponent("Hola, quiero consultar disponibilidad, tours o transporte en Hostal Oasis The Traveler.");
const whatsappToursMessage = encodeURIComponent("Hola, quiero planear mi aventura y conocer tours o shuttles disponibles en Oasis.");

const linksByKey = {
  booking: siteConfig.bookingEngineUrl,
  whatsapp: `https://wa.me/${siteConfig.whatsappNumber}?text=${whatsappMessage}`,
  "whatsapp-tours": `https://wa.me/${siteConfig.whatsappNumber}?text=${whatsappToursMessage}`,
  website: siteConfig.websiteUrl,
  instagram: siteConfig.instagramUrl,
  tiktok: siteConfig.tiktokUrl,
  reviews: siteConfig.reviewsUrl,
  "phone-primary": `tel:${siteConfig.phonePrimary.replace(/[\s-]/g, "")}`,
  "phone-secondary": `tel:${siteConfig.phoneSecondary.replace(/[\s-]/g, "")}`,
  email: `mailto:${siteConfig.email}`
};

document.querySelectorAll("[data-link]").forEach((element) => {
  const key = element.dataset.link;
  // Permite usar keys del diccionario o URLs directas
  const href = key && (linksByKey[key] || (key.startsWith("http") ? key : null));
  if (!href) return;

  element.setAttribute("href", href);
  if (!href.startsWith("tel:") && !href.startsWith("mailto:") && !href.startsWith("#")) {
    element.setAttribute("target", "_blank");
    element.setAttribute("rel", "noopener noreferrer");
  }
});

const currentYear = document.getElementById("current-year");
if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

// ── Gallery Carousel ────────────────────────────────────
(function initGalleryCarousel() {
  const track = document.getElementById('gallery-track');
  const prevBtn = document.getElementById('gallery-prev');
  const nextBtn = document.getElementById('gallery-next');
  const counter = document.getElementById('gallery-counter');
  if (!track) return;

  const slides = Array.from(track.querySelectorAll('.carousel-slide'));
  const total = slides.length;
  if (counter) counter.textContent = `1 / ${total}`;

  function getSlideWidth() {
    const gap = parseInt(getComputedStyle(track).gap) || 12;
    return (slides[0]?.offsetWidth || 0) + gap;
  }

  function getCurrentIndex() {
    const sw = getSlideWidth();
    return sw > 0 ? Math.round(track.scrollLeft / sw) : 0;
  }

  function scrollToIndex(idx) {
    const sw = getSlideWidth();
    track.scrollTo({ left: idx * sw, behavior: 'smooth' });
  }

  function updateState() {
    const atStart = track.scrollLeft <= 4;
    const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 4;
    if (prevBtn) prevBtn.disabled = atStart;
    if (nextBtn) nextBtn.disabled = atEnd;
    if (counter) {
      const sw = getSlideWidth();
      const idx = sw > 0 ? Math.round(track.scrollLeft / sw) : 0;
      counter.textContent = `${idx + 1} / ${total}`;
    }
  }

  nextBtn?.addEventListener('click', () => scrollToIndex(Math.min(getCurrentIndex() + 1, total - 1)));
  prevBtn?.addEventListener('click', () => scrollToIndex(Math.max(getCurrentIndex() - 1, 0)));
  track.addEventListener('scroll', updateState, { passive: true });
  updateState();
})();

const roomTabs = Array.from(document.querySelectorAll(".room-tab"));
const roomCards = Array.from(document.querySelectorAll(".room-card[data-room-type]"));

roomTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const filter = tab.dataset.filter;

    roomTabs.forEach((button) => {
      const active = button === tab;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-selected", String(active));
    });

    roomCards.forEach((card) => {
      const show = filter === "all" || card.dataset.roomType === filter;
      card.hidden = !show;
    });
  });
});
