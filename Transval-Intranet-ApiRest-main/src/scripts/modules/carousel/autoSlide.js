export function initAutoSlide() {
    let autoSlideInterval;
    let isVideoPlaying = false;

    function startAutoSlide() {
        if (!isVideoPlaying) {
            autoSlideInterval = setInterval(() => {
                if (!isVideoPlaying) {
                    currentSlide = (currentSlide + 1) % slides.length;
                    updateCarousel();
                }
            }, 8000);
        }
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    return {
        start: startAutoSlide,
        stop: stopAutoSlide,
        setVideoPlaying: (playing) => isVideoPlaying = playing
    };
}