document.addEventListener('DOMContentLoaded', () => {

    // ─── BARRA FLOTANTE ───────────────────────────────────────
    const promoBar = document.getElementById('promoBar');
    const closePromoBtn = document.getElementById('closePromoBtn');
    const actionPromoBtn = document.getElementById('actionPromoBtn');
    if (promoBar) {
        closePromoBtn?.addEventListener('click', () => promoBar.style.display = 'none');
        actionPromoBtn?.addEventListener('click', () => promoBar.style.display = 'none');
    }

    // ─── FAQ ACORDEÓN ─────────────────────────────────────────
    document.querySelectorAll('.faq-q').forEach(btn => {
        btn.addEventListener('click', () => {
            const answer = btn.nextElementSibling;
            const isOpen = btn.getAttribute('aria-expanded') === 'true';
            // Cierra todos
            document.querySelectorAll('.faq-q').forEach(b => {
                b.setAttribute('aria-expanded', 'false');
                b.nextElementSibling.classList.remove('open');
            });
            // Abre el clickeado si estaba cerrado
            if (!isOpen) {
                btn.setAttribute('aria-expanded', 'true');
                answer.classList.add('open');
            }
        });
    });

    // ─── FUNCIÓN GENÉRICA DE CARRUSEL ─────────────────────────
    function initCarousel(trackId, prevId, nextId, dotsId) {
        const track = document.getElementById(trackId);
        const prev  = document.getElementById(prevId);
        const next  = document.getElementById(nextId);
        const dotsContainer = document.getElementById(dotsId);
        if (!track) return;

        const slides = track.children;
        let current = 0;
        const total = slides.length;

        // Crear dots
        const dots = [];
        for (let i = 0; i < total; i++) {
            const d = document.createElement('button');
            d.className = 'car-dot' + (i === 0 ? ' active' : '');
            d.setAttribute('aria-label', `Ir a slide ${i + 1}`);
            d.addEventListener('click', () => goTo(i));
            dotsContainer?.appendChild(d);
            dots.push(d);
        }

        function goTo(index) {
            current = (index + total) % total;
            track.style.transform = `translateX(-${current * 100}%)`;
            dots.forEach((d, i) => d.classList.toggle('active', i === current));
        }

        prev?.addEventListener('click', () => goTo(current - 1));
        next?.addEventListener('click', () => goTo(current + 1));

        // Auto-advance cada 5 segundos
        let timer = setInterval(() => goTo(current + 1), 5000);
        track.parentElement?.addEventListener('mouseenter', () => clearInterval(timer));
        track.parentElement?.addEventListener('mouseleave', () => {
            timer = setInterval(() => goTo(current + 1), 5000);
        });

        // Swipe touch
        let startX = 0;
        track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
        track.addEventListener('touchend', e => {
            const diff = startX - e.changedTouches[0].clientX;
            if (Math.abs(diff) > 40) goTo(diff > 0 ? current + 1 : current - 1);
        }, { passive: true });
    }

    initCarousel('appCarouselTrack', 'appPrev', 'appNext', 'appDots');
    initCarousel('transformTrack', 'transformPrev', 'transformNext', 'transformDots');

    // ─── PESTAÑAS DE PAQUETES ─────────────────────────────────
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    function activateTab(tabId) {
        tabBtns.forEach(btn => {
            const selected = btn.dataset.tab === tabId;
            btn.setAttribute('aria-selected', selected);
            btn.classList.toggle('active', selected);
        });
        tabPanels.forEach(panel => {
            const show = panel.id === `panel-${tabId}`;
            panel.hidden = !show;
        });
    }

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => activateTab(btn.dataset.tab));
    });

    // Activar TRIMESTRAL por defecto
    activateTab('trimestral');

    // ─── ¿QUÉ INCLUYE? (colapsable) ───────────────────────────
    document.querySelectorAll('.btn-incluye').forEach(btn => {
        const targetId = btn.dataset.target;
        const details  = document.getElementById(targetId);
        const chev     = btn.querySelector('.inc-chev');
        if (!details) return;

        // El trimestral ya empieza abierto
        const isInitiallyOpen = details.classList.contains('details-open');
        if (isInitiallyOpen) {
            chev?.classList.add('open');
        }

        btn.addEventListener('click', () => {
            const isOpen = details.classList.contains('details-open');
            details.classList.toggle('details-open', !isOpen);
            chev?.classList.toggle('open', !isOpen);
        });
    });

});
