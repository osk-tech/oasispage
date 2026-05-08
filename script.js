const siteConfig = {
  bookingEngineUrl: "https://www.booking.com/hotel/gt/hostal-oasis-the-traveler-alta-verapaz-department.es.html",
  websiteUrl: "https://hotelesenlanquin.com/oasis-de-lanquin",
  whatsappNumber: "50240917878",
  phonePrimary: "+502 4091-7878",
  phoneSecondary: "+502 4888-7300",
  email: "lanquinh@gmail.com",
  instagramUrl: "https://www.instagram.com/oasisthetraveler/",
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
