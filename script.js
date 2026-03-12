  // Nav scroll
  const nav = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  // Mobile menu
  const toggle = document.getElementById('navToggle');
  const links  = document.getElementById('navLinks');
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  reveals.forEach(el => io.observe(el));

  // ---- PORTRAIT UPLOAD ----
  const portraitFrame = document.getElementById('portraitFrame');
  const portraitInput = document.getElementById('portraitInput');
  if (portraitFrame && portraitInput) {
    portraitFrame.addEventListener('click', () => portraitInput.click());
    portraitInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      portraitFrame.innerHTML = '<img src="' + url + '" alt="Margaretta Ziętek" style="width:100%;height:100%;object-fit:cover;display:block;">';
    });
  }

  // ---- SLIDER ----
  const track   = document.getElementById('sliderTrack');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  const dotsEl  = document.getElementById('sliderDots');

  if (track) {
    const slides = document.querySelectorAll('.slide');
    const total  = slides.length;
    let current  = 0;
    //let slidesVisible = () => window.innerWidth <= 700 ? 1 : 2;
    let slidesVisible = () => 1;

    function buildDots() {
      dotsEl.innerHTML = '';
      const maxPos = total - slidesVisible();
      for (let i = 0; i <= maxPos; i++) {
        const d = document.createElement('button');
        d.className = 'slider-dot' + (i === 0 ? ' active' : '');
        d.setAttribute('aria-label', 'Slajd ' + (i+1));
        d.addEventListener('click', () => goTo(i));
        dotsEl.appendChild(d);
      }
    }

    function goTo(idx) {
      const maxPos = total - slidesVisible();
      current = Math.max(0, Math.min(idx, maxPos));
      const gap = 24;
      const slideW = slides[0].offsetWidth + gap;
      track.style.transform = 'translateX(-' + (current * slideW) + 'px)';
      document.querySelectorAll('.slider-dot').forEach((d, i) => d.classList.toggle('active', i === current));
      prevBtn.disabled = current === 0;
      nextBtn.disabled = current >= maxPos;
    }

    prevBtn.addEventListener('click', () => goTo(current - 1));
    nextBtn.addEventListener('click', () => goTo(current + 1));
    window.addEventListener('resize', () => { buildDots(); goTo(0); });
    buildDots();
    goTo(0);
  }

  // ---- SLIDE IMAGE UPLOAD ----
  document.querySelectorAll('.slide-img').forEach(imgEl => {
    const id = imgEl.getAttribute('data-slide-id');
    const input = imgEl.parentElement.querySelector('.slide-input');
    if (!input) return;
    imgEl.addEventListener('click', () => input.click());
    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const url = URL.createObjectURL(file);
      imgEl.innerHTML = '<img src="' + url + '" alt="Zdjęcie ' + id + '" style="width:100%;height:100%;object-fit:cover;display:block;">';
    });
  });