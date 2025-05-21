export function initCarousel() {
    const carousel = document.querySelector('.carousel-container');
    const slides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;
    let autoSlideInterval;
    let touchStartX = 0;
    let touchEndX = 0;

    // Add navigation buttons event listeners
    const prevButton = document.querySelector('.carousel-navigation .prev');
    const nextButton = document.querySelector('.carousel-navigation .next');

    // Create progress indicators
    const progressContainer = document.createElement('div');
    progressContainer.className = 'carousel-progress';
    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = `progress-dot ${index === 0 ? 'active' : ''}`;
        dot.setAttribute('aria-label', `Slide ${index + 1}`);
        dot.onclick = () => goToSlide(index);
        progressContainer.appendChild(dot);
    });
    carousel.parentElement.appendChild(progressContainer);

    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        updateNewsContent();
        updateProgressDots();
    }

    function updateNewsContent() {
        const newsContents = [
            "WL Scania: Excelência em Transporte - Parceria Transval",
            "Demonstração das Operações de Transporte - Transval",
            "Qualidade e Eficiência no Transporte de Cargas",
            "Compromisso com a Excelência em Logística"
        ];
        const currentNewsSpan = document.querySelector('.current-news');
        document.querySelector('.news-content').textContent = newsContents[currentSlide];
        if (currentNewsSpan) {
            currentNewsSpan.textContent = currentSlide + 1;
        }
    }

    function updateProgressDots() {
        document.querySelectorAll('.progress-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateCarousel();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateCarousel();
    }

    // Add click event listeners to navigation buttons
    if (prevButton) {
        prevButton.addEventListener('click', (e) => {
            e.preventDefault();
            prevSlide();
        });
    }

    if (nextButton) {
        nextButton.addEventListener('click', (e) => {
            e.preventDefault();
            nextSlide();
        });
    }

    // Touch events
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) nextSlide();
            else prevSlide();
        }
    }

    // Pause on hover
    carousel.addEventListener('mouseenter', () => {
        stopAutoSlide();
    });

    carousel.addEventListener('mouseleave', () => {
        startAutoSlide();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    function startAutoSlide() {
        stopAutoSlide();
        autoSlideInterval = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        if (autoSlideInterval) {
            clearInterval(autoSlideInterval);
        }
    }

    startAutoSlide();
    updateCarousel();
}