import { initNavigation } from './modules/navigation.js';
import { initCarousel } from './modules/carousel/carousel.js';
import { initAutoSlide } from './modules/carousel/autoSlide.js';
import { initVideoPlayer } from './modules/carousel/videoPlayer.js';
import { initLogin } from './modules/auth/login.js';
import { initDownloadsEvents, initializeDownloadsData } from './modules/content/download.js';
import { initMobileMenu } from './modules/mobileMenu.js';
import { initResourceHub, initResourceHubEvents } from './modules/content/resourceHub.js';

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();

    // Verificar se o usuário já está logado
    if (!sessionStorage.getItem('isLoggedIn')) {
        // Se não estiver logado, mostrar o carrossel normalmente
        initCarousel();
        initAutoSlide();
        initVideoPlayer();
    } else {
        // Se já estiver logado, primeiro pré-carregar os dados e depois mostrar o ResourceHub
        // para garantir que os dados estejam disponíveis quando o usuário clicar em um card
        initializeDownloadsData()
            .then(() => {
                const contentArea = document.querySelector('.content-area');
                contentArea.innerHTML = initResourceHub();
                // Inicializar os eventos dos botões do ResourceHub
                initResourceHubEvents();
            })
            .catch(error => {
                console.error('Erro ao carregar dados iniciais:', error);
                // Mostrar ResourceHub mesmo em caso de erro
                const contentArea = document.querySelector('.content-area');
                contentArea.innerHTML = initResourceHub();
                initResourceHubEvents();
            });
    }

    initLogin();
    initMobileMenu();

    // Listener for navigating back to Resource Hub
    document.addEventListener('navigateToResourceHub', async () => {
        const contentArea = document.querySelector('.content-area');
        // Ensure data is fresh before rendering the hub
        await initializeDownloadsData();
        contentArea.innerHTML = initResourceHub();
        initResourceHubEvents();
    });
});