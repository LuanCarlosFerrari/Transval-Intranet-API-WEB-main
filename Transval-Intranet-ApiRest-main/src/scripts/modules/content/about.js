import { updateActiveState } from '../utils/domUtils.js';

export const aboutContent = {
    history: `
        <div class="history-content">
            <img src="src/Assets/LOGO-APP.png" alt="Logo Transval" class="history-logo">
            <button class="back-button tab-button">Voltar</button>
            
            <p class="company-history" style="text-align: center;"><strong>NOSSA HISTÓRIA:</strong></p>
            <p class="company-history" style="text-align: center;">Somos uma empresa familiar com mais de três décadas de experiência no setor de transportes e logística. Fundada em 1987 por Onevaldo e Valmir, trilhamos uma trajetória de crescimento baseada na qualidade, eficiência e compromisso com nossos clientes.</p>
            <p class="company-history" style="text-align: center;">Nossa sede administrativa está localizada em Rinópolis, interior de São Paulo, onde tudo começou. A partir daqui, coordenamos nossas operações, sempre guiados pelos valores que nos trouxeram até o presente.</p>
            <p class="company-history" style="text-align: center;">Para ampliar nossa atuação e otimizar nossos serviços, contamos com unidades estratégicas em <em>Rondonópolis (MT) e Sumaré (SP)</em>, equipadas com escritórios e infraestrutura dedicada à nossa frota, garantindo maior eficiência operacional.</p>
            <p class="company-history" style="text-align: center;"><strong>NOSSA INFRAESTRUTURA:</strong></p>
            <ul class="company-history" style="text-align: center; list-style-position: inside;">
                <li><em>Frota própria</em>, proporcionando agilidade, controle e segurança no transporte de cargas.</li>
                <li><em>Agenciamento de cargas</em>, conectando soluções logísticas para atender todo o território brasileiro.</li>
                <li><em>Unidades de embarque estratégicas</em>, ampliando nosso alcance e capacidade de atendimento.</li>
            </ul>
            <p class="company-history" style="text-align: center;">Comprometidos com a excelência, seguimos evoluindo para oferecer as melhores soluções em transporte e logística.</p>
        </div>
    `,
    mission: `
        <div class="mission-content">
            <img src="src/Assets/LOGO-APP.png" alt="Logo Transval" class="mission-logo">
            <button class="back-button tab-button">Voltar</button>
            
            <p class="company-history" style="text-align: center;"><strong>NOSSO PROPÓSITO:</strong></p>
            <p class="company-history" style="text-align: center;">Ser um parceiro estratégico dos nossos clientes e transformar a logística nacional com soluções eficientes, transparentes e seguras. Nosso compromisso é entregar qualidade, pontualidade e inovação, atender às necessidades específicas de cada cliente e promover a sustentabilidade, contribuindo ativamente para o avanço do agronegócio e da indústria.</p>
            
            <p class="company-history" style="text-align: center;"><strong>NOSSOS PRINCÍPIOS:</strong></p>
            <ul class="company-history" style="list-style-type: none; padding-left: 0; text-align: center;">
                <li style="text-align: center;"><strong>FOCO NO CLIENTE E NOS RESULTADOS</strong></li>
                <li style="text-align: center;">Priorizar as necessidades dos clientes, buscando sempre entregar soluções ágeis, eficazes e com resultados positivos.</li>
                
                <li style="text-align: center;"><strong>AGILIDADE E RAPIDEZ</strong></li>
                <li style="text-align: center;">Responder de forma célere e eficiente, reconhecendo a importância do tempo na construção de relações de sucesso.</li>
                
                <li style="text-align: center;"><strong>QUALIDADE E EXCELÊNCIA</strong></li>
                <li style="text-align: center;">Garantir processos e entregas de alta qualidade, desenvolvendo com precisão o que foi proposto.</li>
                
                <li style="text-align: center;"><strong>RESPONSABILIDADE E COMPROMISSO</strong></li>
                <li style="text-align: center;">Assumir responsabilidades, agir com ética, transparência e dedicação em todas as ações e decisões.</li>
                
                <li style="text-align: center;"><strong>COMUNICAÇÃO E COLABORAÇÃO</strong></li>
                <li style="text-align: center;">Promover integração entre as áreas, garantindo uma comunicação clara e eficaz para alcançar objetivos comuns.</li>
                
                <li style="text-align: center;"><strong>SEGURANÇA E CONFIABILIDADE</strong></li>
                <li style="text-align: center;">Assegurar a execução segura de todas as atividades, conectando pessoas e negócios com confiança.</li>
                
                <li style="text-align: center;"><strong>TRABALHO EM EQUIPE E INTEGRAÇÃO</strong></li>
                <li style="text-align: center;">Valorizar o espírito colaborativo, unindo esforços para superar desafios e alcançar metas com eficiência.</li>
            </ul>
        </div>
    `
};

export function initAboutSection() {
    const content = `
        <div class="initial-view">
            <img src="src/Assets/LOGO-APP.png" alt="Logo Transval" class="company-logo">
            <div class="button-group">
                <button class="tab-button" data-tab="history">História da Empresa</button>
                <button class="tab-button" data-tab="mission">Missão e Valores</button>
            </div>
        </div>
        <div id="history" class="tab-content">${aboutContent.history}</div>
        <div id="mission" class="tab-content">${aboutContent.mission}</div>
    `;

    // Return content first
    setTimeout(() => initAboutEvents(), 0);
    return content;
}

function initAboutEvents() {
    const buttons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const initialView = document.querySelector('.initial-view');

    buttons.forEach(button => {
        button.addEventListener('click', () => handleTabButtonClick(button, initialView, tabContents));
    });

    // Add specific handler for back buttons
    const backButtons = document.querySelectorAll('.back-button');
    backButtons.forEach(button => {
        button.addEventListener('click', () => handleBackButtonClick(initialView, tabContents));
    });
}

function handleTabButtonClick(button, initialView, tabContents) {
    if (button.classList.contains('back-button')) {
        // Show initial view, hide tab contents
        initialView.style.display = 'flex';
        tabContents.forEach(content => {
            content.style.display = 'none';
            content.classList.remove('active');
        });
    } else {
        // Hide initial view, show selected content
        initialView.style.display = 'none';
        const tabId = button.dataset.tab;

        tabContents.forEach(content => {
            if (content.id === tabId) {
                content.style.display = 'block';
                content.classList.add('active');
            } else {
                content.style.display = 'none';
                content.classList.remove('active');
            }
        });

        // Update active state of buttons
        updateActiveState(button, '.tab-button');
    }
}

function handleBackButtonClick(initialView, tabContents) {
    initialView.style.display = 'flex';
    tabContents.forEach(content => {
        content.style.display = 'none';
        content.classList.remove('active');
    });
}