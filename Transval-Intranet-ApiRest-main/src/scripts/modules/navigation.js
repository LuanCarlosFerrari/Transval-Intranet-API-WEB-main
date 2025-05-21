// Import all required modules
import { initAboutSection } from './content/about.js';
import { initContactSection } from './content/contact.js';
import { initLocationsSection } from './content/locations.js';
import { initLGPDSection } from './content/lgpd.js';
import { initClientsSection } from './content/clients.js';
import { initRoutesSection, initRouteCalculator } from './content/routes.js';
import { updateActiveState } from './utils/domUtils.js';
import { initQuickContactsSection } from './content/quickContacts.js';

export function initNavigation() {
  // Event listener for regular nav items
  document.querySelectorAll('.nav-item, [data-content]').forEach(item => {
    item.addEventListener('click', () => {
      const contentArea = document.querySelector('.content-area');

      switch (item.dataset.content) {
        case 'sobre':
          contentArea.innerHTML = initAboutSection();
          break;
        case 'SAC':
          contentArea.innerHTML = initContactSection();
          break;
        case 'unidades':
          contentArea.innerHTML = initLocationsSection();
          // Initialize map after content is loaded
          setTimeout(() => {
            if (window.google && window.google.maps) {
              initMap(); // Call the global initMap function
            }
          }, 300); // Increased timeout
          break;
        case 'LGPD':
          contentArea.innerHTML = initLGPDSection();
          break;
        case 'clientes':
          contentArea.innerHTML = initClientsSection();
          break;
        case 'rotas':
          contentArea.innerHTML = initRoutesSection();
          setTimeout(() => {
            if (window.google && window.google.maps) {
              initRouteCalculator();
            }
          }, 300); // Increased timeout
          break;
      }

      updateActiveState(item, '.nav-item');

      // Initialize specific events after content is loaded
      if (item.dataset.content === 'sobre') {
        setTimeout(() => {
          const buttons = document.querySelectorAll('.tab-button');
          buttons.forEach(button => {
            button.addEventListener('click', () => {
              const tabId = button.dataset.tab;
              if (tabId) {
                document.querySelectorAll('.tab-content').forEach(content => {
                  content.style.display = 'none';
                });
                document.getElementById(tabId).style.display = 'block';
                document.querySelector('.initial-view').style.display = 'none';
              }
            });
          });
        }, 0);
      }
    });
  });

  // Remover manipulação dos botões que não existem mais
}

// Add global initialization function
window.initMap = function () {
  const currentTab = document.querySelector('.nav-item.active');
  if (currentTab) {
    if (currentTab.dataset.content === 'unidades') {
      initMap();
    } else if (currentTab.dataset.content === 'rotas') {
      initRouteCalculator();
    }
  }
};