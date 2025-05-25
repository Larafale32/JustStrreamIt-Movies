export function voirPlus(sectionId) {
  const films = document.querySelectorAll(`#${sectionId} .movie-container`);
  films.forEach(film => {
    film.style.display = 'block';
  });
  
  document.querySelector(`#${sectionId} .voir-plus`).style.display = 'none';
  document.querySelector(`#${sectionId} .voir-moins`).style.display = 'block';
}

export function voirMoins(sectionId) {
  const films = document.querySelectorAll(`#${sectionId} .movie-container`);
  const isMobile = window.innerWidth < 700;
  
  films.forEach((film, index) => {
    if (isMobile && index >= 2) {
      film.style.display = 'none';
    } else if (!isMobile && index >= 4) {
      film.style.display = 'none';
    }
  });
  
  document.querySelector(`#${sectionId} .voir-moins`).style.display = 'none';
  document.querySelector(`#${sectionId} .voir-plus`).style.display = 'block';
}

document.querySelectorAll('.voir-plus').forEach(btn => {
  const sectionId = btn.closest('article').id;
  btn.addEventListener('click', () => voirPlus(sectionId));
});

document.querySelectorAll('.voir-moins').forEach(btn => {
  const sectionId = btn.closest('article').id;
  btn.addEventListener('click', () => voirMoins(sectionId));
});