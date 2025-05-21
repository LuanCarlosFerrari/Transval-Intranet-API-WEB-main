export function initMobileMenu() {
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const navMenu = document.querySelector('.nav-menu');

    // Toggle menu when hamburger button is clicked
    mobileMenuButton.addEventListener('click', function () {
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (event) {
        if (!navMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
            navMenu.classList.remove('active');
        }
    });

    // Add click event listeners to all nav items
    const navItems = document.querySelectorAll('.nav-menu .nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
}