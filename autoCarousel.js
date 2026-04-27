function iniciarCarrusel() {
  const track = document.getElementById('carruselTrack');
  if (!track) return;

  let scrollLeft = 0;

  // Clonamos el contenido para el efecto infinito
  track.innerHTML += track.innerHTML;

  function animar() {
    scrollLeft += 0.5; // Velocidad de desplazamiento

    // Si ya desplazamos la mitad (las primeras fotos), reiniciamos a 0
    if (scrollLeft >= track.scrollWidth / 2) {
      scrollLeft = 0;
    }

    track.style.transform = `translateX(-${scrollLeft}px)`;
    requestAnimationFrame(animar);
  }

  animar();
}

iniciarCarrusel();
