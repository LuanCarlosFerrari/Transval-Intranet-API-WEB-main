/**
 * Resource Hub - Página central para acessar todos os recursos após login
 */

import { initDownloadsSection, addEventListeners, initializeDownloadsData, createFolder, downloadsData, folderContents } from './download.js';
import { initQuickContactsSection, initQuickContactsEvents } from './quickContacts.js';

// Configuration for predefined cards
const predefinedCardsConfig = [
    {
        title: "Treinamentos e Políticas",
        type: "downloads",
        iconClass: "fas fa-file-alt",
        description: "Acesse documentos de treinamento, procedimentos operacionais, normas de segurança e políticas internas da empresa."
    },
    {
        title: "Contatos",
        type: "contacts",
        iconClass: "fas fa-address-book",
        description: "Lista de contatos dos departamentos e colaboradores da Transval para comunicação interna."
    }
];

export function initResourceHub() {
    // Verificar se o usuário está logado
    if (!sessionStorage.getItem('isLoggedIn')) {
        return `
            <div class="resource-container">
                <h2>Acesso Restrito</h2>
                <p>Por favor, faça login para acessar este conteúdo.</p>
            </div>
        `;
    }

    let sectionCardsHTML = '';
    const renderedTitles = new Set();

    // 1. Render predefined cards based on config and availability in downloadsData for "downloads" type
    predefinedCardsConfig.forEach(config => {
        if (config.type === "downloads") {
            const exists = downloadsData.some(d => d.title === config.title);
            if (exists) {
                sectionCardsHTML += `
                    <div class="resource-card">
                        <div class="resource-icon"><i class="${config.iconClass}"></i></div>
                        <div class="resource-content">
                            <h3>${config.title}</h3>
                            <p>${config.description}</p>
                            <a href="javascript:void(0)" class="resource-button" data-category="${config.title}" data-type="downloads">
                                <i class="fas fa-eye"></i> Acessar
                            </a>
                        </div>
                    </div>`;
                renderedTitles.add(config.title);
            } else {
                console.warn(`Predefined download section "${config.title}" not found in downloadsData. Card will not be rendered.`);
            }
        } else if (config.type === "contacts") {
            sectionCardsHTML += `
                <div class="resource-card">
                    <div class="resource-icon"><i class="${config.iconClass}"></i></div>
                    <div class="resource-content">
                        <h3>${config.title}</h3>
                        <p>${config.description}</p>
                        <a href="javascript:void(0)" class="resource-button" data-category="${config.title}" data-type="contacts">
                            <i class="fas fa-eye"></i> Acessar
                        </a>
                    </div>
                </div>`;
            renderedTitles.add(config.title);
        }
    });

    // 2. Render dynamic download sections from downloadsData that haven't been rendered yet
    if (downloadsData && downloadsData.length > 0) {
        downloadsData.forEach(folder => {
            if (!renderedTitles.has(folder.title)) { // Avoid re-rendering if it was a predefined card
                sectionCardsHTML += `
                    <div class="resource-card">
                        <div class="resource-icon"><i class="fas fa-folder"></i></div>
                        <div class="resource-content">
                            <h3>${folder.title}</h3>
                            <p>Acesse os arquivos da seção ${folder.title}.</p>
                            <a href="javascript:void(0)" class="resource-button" data-category="${folder.title}" data-type="downloads">
                                <i class="fas fa-eye"></i> Acessar
                            </a>
                        </div>
                    </div>`;
            }
        });
    }

    return `
        <div class="resource-container">
            <h2>Portal de Recursos Transval</h2>
            <button id="addSectionBtn" class="btn btn-primary add-section-btn">Nova Seção</button>
            <div class="resource-main-grid">
                ${sectionCardsHTML}
            </div>
        </div>
    `;
}

/**
 * Inicializa os eventos dos botões do ResourceHub
 */
export function initResourceHubEvents() {
    const contentArea = document.querySelector('.content-area');

    // Unified event listener for all resource buttons
    const resourceGrid = document.querySelector('.resource-main-grid');
    if (resourceGrid) {
        // Remove previous listener if any to avoid duplicates on re-init
        resourceGrid.addEventListener('click', async (event) => {
            const button = event.target.closest('.resource-button');
            if (!button) {
                return; // Click was not on a resource button or its child
            }

            const categoryName = button.dataset.category;
            const type = button.dataset.type;

            if (!categoryName || !type) {
                console.error("Button is missing data-category or data-type", button);
                return;
            }

            if (type === 'downloads') {
                contentArea.innerHTML = `
                    <div class="loading-container">
                        <i class="fas fa-spinner fa-spin fa-3x"></i>
                        <p>Carregando arquivos para ${categoryName}...</p>
                    </div>`;
                try {
                    // Ensure downloadsData and folderContents are available.
                    const selectedCategory = downloadsData.find(cat => cat.title === categoryName);

                    if (selectedCategory) {
                        // Populate/ensure .downloads property for the selected category object
                        if (folderContents && folderContents[categoryName]) {
                            selectedCategory.downloads = folderContents[categoryName];
                        } else {
                            console.warn(`Conteúdo da pasta "${categoryName}" não encontrado ou vazio em folderContents. Defaulting to empty.`);
                            selectedCategory.downloads = [];
                        }
                        contentArea.innerHTML = initDownloadsSection(selectedCategory);
                        addEventListeners(); // For download items, modals etc.
                    } else {
                        console.error(`Categoria de download "${categoryName}" não encontrada em downloadsData.`);
                        contentArea.innerHTML = `<div class="error-container"><p>Erro: Categoria de download "${categoryName}" não encontrada.</p></div>`;
                    }
                } catch (error) {
                    console.error(`Erro ao carregar a seção de downloads "${categoryName}":`, error);
                    contentArea.innerHTML = `
                        <div class="error-container">
                            <i class="fas fa-exclamation-triangle"></i>
                            <p>Erro ao carregar os arquivos para ${categoryName}. Por favor, tente novamente.</p>
                        </div>`;
                }
            } else if (type === 'contacts') {
                contentArea.innerHTML = initQuickContactsSection();
                initQuickContactsEvents();
            }
        });
    }

    // Botão para adicionar nova seção
    const addSectionBtn = document.getElementById('addSectionBtn');
    if (addSectionBtn) {
        addSectionBtn.addEventListener('click', async () => {
            const sectionName = prompt("Digite o nome da nova seção:");

            if (sectionName && sectionName.trim() !== '') {
                try {
                    await createFolder(sectionName.trim());
                    await initializeDownloadsData(); // Refresh data

                    // Re-render the entire resource hub to show the new section
                    // and ensure event listeners are correctly attached to the new DOM.
                    if (contentArea) {
                        contentArea.innerHTML = initResourceHub();
                        initResourceHubEvents(); // Re-attach events to the newly rendered hub
                    }
                    alert(`Seção "${sectionName.trim()}" criada com sucesso.`);

                } catch (error) {
                    console.error('Erro ao criar nova seção:', error);
                    alert(`Falha ao criar seção: ${error.message || 'Erro desconhecido.'}`);
                }
            } else if (sectionName !== null) { // Usuário clicou OK mas deixou em branco
                alert("O nome da seção não pode ser vazio.");
            }
        });
    }
}
