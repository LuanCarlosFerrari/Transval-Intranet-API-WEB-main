export function initVideoPlayer() {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = function() {
        new YT.Player('youtubeVideo', {
            events: {
                'onStateChange': onPlayerStateChange
            }
        });
    };

    function onPlayerStateChange(event) {
        const isPlaying = event.data === YT.PlayerState.PLAYING;
        const carousel = document.querySelector('.carousel-container');
        if (isPlaying) {
            clearInterval(autoSlideInterval);
        } else {
            startAutoSlide();
        }
    }
}