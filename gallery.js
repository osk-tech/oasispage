function initGallery() {
  const modal = document.getElementById('gallery-modal');
  const modalImg = document.getElementById('modal-expanded-img');
  const closeBtn = document.querySelector('.modal-close');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  if (!modal || !modalImg || !closeBtn || !prevBtn || !nextBtn) return;

  const roomGalleries = Array.from(document.querySelectorAll('.room-media'))
    .map((media) => Array.from(media.querySelectorAll('img')))
    .filter((images) => images.length > 0);

  if (roomGalleries.length === 0) return;

  let activeImages = [];
  let currentIndex = 0;
  let lastTrigger = null;

  function updateModalImage() {
    const currentImage = activeImages[currentIndex];
    if (!currentImage) return;

    modalImg.src = currentImage.src;
    modalImg.alt = currentImage.alt || '';
  }

  function openGallery(images, startIndex = 0) {
    activeImages = images;
    currentIndex = startIndex;
    updateModalImage();
    modal.classList.add('modal-active');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  roomGalleries.forEach((images) => {
    const coverImage = images[0];
    if (!coverImage) return;

    coverImage.setAttribute('tabindex', '0');
    coverImage.setAttribute('role', 'button');
    coverImage.setAttribute('aria-haspopup', 'dialog');
    coverImage.setAttribute(
      'aria-label',
      coverImage.alt ? `Abrir galeria: ${coverImage.alt}` : 'Abrir galeria de la habitacion'
    );

    coverImage.addEventListener('click', () => {
      lastTrigger = coverImage;
      openGallery(images);
    });

    coverImage.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        lastTrigger = coverImage;
        openGallery(images);
      }
    });
  });

  function goToImage(direction) {
    if (activeImages.length === 0) return;
    currentIndex = (currentIndex + direction + activeImages.length) % activeImages.length;
    updateModalImage();
  }

  // Navegación siguiente
  nextBtn.addEventListener('click', () => {
    goToImage(1);
  });

  // Navegación anterior
  prevBtn.addEventListener('click', () => {
    goToImage(-1);
  });

  // Cerrar modal
  function closeModal() {
    modal.classList.remove('modal-active');
    document.body.style.overflow = '';
    lastTrigger?.focus();
  }

  closeBtn.addEventListener('click', closeModal);

  // Cerrar al hacer clic en el fondo oscuro
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Soporte de teclado: ESC, flechas izquierda/derecha
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('modal-active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') {
      goToImage(1);
    }
    if (e.key === 'ArrowLeft') {
      goToImage(-1);
    }
  });
}

initGallery();
