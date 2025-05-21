import { initCarousel } from '../carousel/carousel.js';
import { initAutoSlide } from '../carousel/autoSlide.js';
import { initVideoPlayer } from '../carousel/videoPlayer.js';
import { initResourceHub, initResourceHubEvents } from '../content/resourceHub.js';

export function initLogin() {
    const loginBtn = document.getElementById('loginBtn');
    const modal = document.getElementById('loginModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const submitLoginBtn = document.getElementById('submitLoginBtn');

    // Modificar para remover referências à button-container
    if (sessionStorage.getItem('isLoggedIn')) {
        loginBtn.textContent = 'Logout';
    }

    loginBtn.addEventListener('click', function () {
        if (this.textContent === 'Logout') {
            sessionStorage.removeItem('isLoggedIn');
            this.textContent = 'Login';

            // Add this code to redirect to initial view
            const contentArea = document.querySelector('.content-area');
            contentArea.innerHTML = `
                <div class="carousel">
                    <div class="carousel-container">
                        <img src="./src/Assets/wp3704699-logistics-wallpapers.jpg" class="carousel-slide" alt="Slide 1">
                        <div class="carousel-slide video-slide">
                            <iframe id="youtubeVideo" width="100%" height="100%"
                                src="https://www.youtube.com/embed/AFGSYgrNYQ8?enablejsapi=1&showinfo=0" frameborder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowfullscreen>
                            </iframe>
                        </div>
                        <img src="./src/Assets/wp7708047-logistic-wallpapers.jpg" class="carousel-slide" alt="Slide 3">
                        <img src="./src/Assets/wp7708138-logistic-wallpapers.jpg" class="carousel-slide" alt="Slide 4">
                    </div>
                    <div class="carousel-navigation">
                        <button class="carousel-button prev" aria-label="Previous slide">&#10094;</button>
                        <button class="carousel-button next" aria-label="Next slide">&#10095;</button>
                    </div>
                </div>
                <div class="news-navigation">
                    <span class="current-news">1</span> / <span class="total-news">4</span>
                </div>
                <p class="news-content">WL Scania: Excelência em Transporte - Parceria Transval</p>
            `;

            // Reinitialize carousel
            initCarousel();
            initAutoSlide();
            initVideoPlayer();
        } else {
            modal.style.display = 'block';
        }
    });

    closeModalBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    submitLoginBtn.addEventListener('click', async function () {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('login-error');

        if (!username || !password) {
            errorMessage.textContent = 'Por favor, preencha todos os campos.';
            return;
        }

        console.log('Attempting login with:', username);

        try {
            // Determinar URL do servidor
            let apiUrl = '/api/auth/login';
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                apiUrl = `http://localhost:3000/api/auth/login`;
            }

            console.log('Using API URL:', apiUrl);

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            console.log('Login response:', data);

            if (!response.ok) {
                errorMessage.textContent = data.error || 'Erro ao fazer login.';
                return;
            }

            // Login successful - store token and user info
            sessionStorage.setItem('authToken', data.token);
            sessionStorage.setItem('user', JSON.stringify(data.user));
            sessionStorage.setItem('isLoggedIn', 'true');

            // Hide modal and update UI
            modal.style.display = 'none';
            loginBtn.textContent = 'Logout';

            // Show admin content if available
            const adminElements = document.querySelectorAll('.admin-only');
            adminElements.forEach(el => el.style.display = 'block');

            // Substituir o carrossel pelo ResourceHub imediatamente após o login
            const contentArea = document.querySelector('.content-area');
            contentArea.innerHTML = initResourceHub();
            // Inicializar os eventos dos botões do ResourceHub
            initResourceHubEvents();

        } catch (error) {
            console.error('Erro ao fazer login:', error);
            errorMessage.textContent = 'Erro de conexão. Tente novamente.';
        }
    });

    // Update the logout functionality
    function handleLogout() {
        sessionStorage.removeItem('authToken');
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('isLoggedIn');

        document.getElementById('login-button').textContent = 'Login';
        document.querySelector('.login-status').textContent = '';

        // Hide admin content
        const adminElements = document.querySelectorAll('.admin-only');
        adminElements.forEach(el => el.style.display = 'none');

        // Redirect to home if on protected page
        if (window.location.hash.startsWith('#admin-')) {
            window.location.hash = '';
        }
    }

    // Check authentication status on page load
    async function checkAuthStatus() {
        const token = sessionStorage.getItem('authToken');
        if (!token) return;

        try {
            // Determinar URL do servidor
            let apiUrl = '/api/auth/verify';
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                apiUrl = `http://localhost:3000/api/auth/verify`;
            }

            const response = await fetch(apiUrl, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                // Token invalid or expired
                handleLogout();
                return;
            }

            // Token valid, update UI
            const data = await response.json();
            document.getElementById('login-button').textContent = 'Logout';
            document.querySelector('.login-status').textContent = `Olá, ${data.user.username}!`;

            // Show admin content
            const adminElements = document.querySelectorAll('.admin-only');
            adminElements.forEach(el => el.style.display = 'block');

            // Se já estiver logado, mostrar o ResourceHub em vez do carrossel
            const contentArea = document.querySelector('.content-area');
            contentArea.innerHTML = initResourceHub();
            // Inicializar os eventos dos botões do ResourceHub
            initResourceHubEvents();

        } catch (error) {
            console.error('Erro ao verificar autenticação:', error);
            handleLogout();
        }
    }

    // Check auth on page load
    checkAuthStatus();
}
