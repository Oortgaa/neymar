// ===== Barra de progreso de scroll =====
const progressBar = document.getElementById('progressBar');
function updateProgress(){
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
}

// ===== Cabecera con fondo al hacer scroll =====
const header = document.getElementById('siteHeader');
function updateHeader(){
  if(window.scrollY > 40){
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', () => {
  updateProgress();
  updateHeader();
}, { passive: true });
updateProgress();
updateHeader();

// ===== Menú móvil =====
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');
navToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});
mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== Línea de tiempo interactiva =====
const timelineItems = document.querySelectorAll('.timeline-item');
const details = document.querySelectorAll('.detail');
timelineItems.forEach(item => {
  item.addEventListener('click', () => {
    const club = item.dataset.club;

    timelineItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');

    details.forEach(d => {
      d.classList.toggle('active', d.dataset.detail === club);
    });
  });
});

// ===== Barras de habilidad animadas al entrar en pantalla =====
const skills = document.querySelectorAll('.skill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      const skill = entry.target;
      const value = skill.dataset.value;
      const bar = skill.querySelector('.bar i');
      const label = skill.querySelector('.skill-head em');

      bar.style.width = value + '%';

      let current = 0;
      const step = Math.max(1, Math.round(value / 40));
      const counter = setInterval(() => {
        current += step;
        if(current >= value){
          current = value;
          clearInterval(counter);
        }
        label.textContent = current + '%';
      }, 20);

      skillObserver.unobserve(skill);
    }
  });
}, { threshold: 0.4 });

skills.forEach(skill => skillObserver.observe(skill));

// ===== Botón volver arriba =====
const toTop = document.getElementById('toTop');
toTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
