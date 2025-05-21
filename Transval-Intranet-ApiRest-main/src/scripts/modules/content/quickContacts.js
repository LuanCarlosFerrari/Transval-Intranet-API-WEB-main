const quickContactsData = [
    {
        title: "Recursos Humanos",
        contacts: [
            {
                name: "Ruan Talles SP",
                icon: "fa-user",
                info: "tel: (18)98177-0855\nEmail:\nruan@transval.net.br"
            },
            {
                name: "Fabricia Melo MT",
                icon: "fa-user",
                info: "tel: +55 66 9978-6387\nEmail:"
            }
        ]
    },
    {
        title: "Contas a Receber",
        contacts: [
            {
                name: "Elizabete",
                icon: "fa-money-bill",
                info: "Tel: (18)98185-1049\nEmail: financeirorinopolis@transval.net.br"
            },
        ]
    },
    {
        title: "Faturamento",
        contacts: [
            {
                name: "Maria Helena",
                icon: "fa-file-invoice",
                info: "Tel: +55 18 99816-7328\nEmail: faturamentosumare@transval.net.br"
            },
            {
                name: "Silvania",
                icon: "fa-file-invoice",
                info: "Tel: (19)99876-9816\nEmail: faturamentosumare8@transval.net.br"
            },
            {
                name: "Amanda Inacio",
                icon: "fa-file-invoice",
                info: "Tel: (19)98292-0003\nEmail: faturamentosumare4@transval.net.br"
            }
        ]
    },
    {
        title: "Estadia",
        contacts: [
            {
                name: "Anne",
                icon: "fa-hotel",
                info: "Tel: (66)99665-1265\nEmail: estadia@transval.net.br"
            },
            {
                name: "Leomar",
                icon: "fa-hotel",
                info: "Tel: (66)99665-1265\nEmail: estadia@transval.net.br"
            }
        ]
    },
    {
        title: "Gestor de Frota",
        contacts: [
            {
                name: "Atirson (Frota SP)",
                icon: "fa-truck",
                info: "Tel: (18)98185-0214\nEmail: atirson@transval.net.br"
            },
            {
                name: "Vitor (Frota SP)",
                icon: "fa-truck",
                info: "Tel: (18)98184-0288\nEmail: vitor@transval.net.br"
            },
            {
                name: "Ronaldo Balestrin Gomes (Frota MT)",
                icon: "fa-truck",
                info: "Tel: (66)98129-0092\nEmail: logistica2@transval.net.br"
            }
        ]
    },
    {
        title: "Controladoria",
        contacts: [
            {
                name: "Ellen ",
                icon: "fa-chart-line",
                info: "Tel: +55 18 99732-3551\nEmail:"
            },
            {
                name: "Mislaine Resende",
                icon: "fa-chart-line",
                info: "Tel: (66)99622-3227\nEmail:"
            },
            {
                name: "Gislaine Rocha",
                icon: "fa-chart-line",
                info: "Tel: (66)99719-8331\nEmail:"
            },
            {
                name: "Taissa Lorayne",
                icon: "fa-chart-line",
                info: "Tel: (66)99909-7207\nEmail:"
            },
            {
                name: "Lorrayne Cristina",
                icon: "fa-chart-line",
                info: "Tel: (66)99243-1018\nEmail:"
            },
            {
                name: "Lilian Payão",
                icon: "fa-chart-line",
                info: "Tel: (66)99220-8501\nEmail:"
            }
        ]
    },
    {
        title: "Marketing",
        contacts: [
            {
                name: "Crislaine",
                icon: "fa-bullhorn",
                info: "Tel: (18)99726-6639\nEmail:"
            }
        ]
    },
    {
        title: "GR",
        contacts: [
            {
                name: "Cassyklei",
                icon: "fa-truck-loading",
                info: "Tel: (66)99628-2538\nEmail: cassyklei@transval.net.br"
            },
            {
                name: "João Elias Mercia Costa",
                icon: "fa-truck-loading",
                info: "Tel: (66)98467-7870\nEmail: logistica7@transval.net.br"
            },
            {
                name: "Luiz Felippe Claudino da Silva",
                icon: "fa-truck-loading",
                info: "Tel: (66)99224-8420\nEmail: logistica8@transval.net.br"
            }
        ]
    },
    {
        title: "Contábil / Fiscal",
        contacts: [
            {
                name: "Alex",
                icon: "fa-calculator",
                info: "Tel: (14)99663-5979\nEmail: contabilmatriz@transval.net.br"
            },
            {
                name: "Daniella",
                icon: "fa-calculator",
                info: "Tel: (14)99850-3891\nEmail: contabilmatriz1@transval.net.br"
            },
            {
                name: "Jonatas",
                icon: "fa-calculator",
                info: "Tel: (18)99743-4469\nEmail: contabilmatriz2@transval.net.br"
            },
            {
                name: "Rafaela",
                icon: "fa-calculator",
                info: "Tel: (18)99603-8990\nEmail: contabilmatriz4@transval.net.br"
            }
        ]
    },
    {
        title: "Conferência e Controle",
        contacts: [
            {
                name: "Emerson Luciano Tomasela",
                icon: "fa-check-double",
                info: "Tel: (18)98177-0239\nEmail: faturamentosp@transval.net.br"
            },
            {
                name: "Naiara Cristina R. Sanchez",
                icon: "fa-check-double",
                info: "Tel: (18)99797-9474\nEmail: faturamentosp3@transval.net.br"
            },
            {
                name: "Bruno Henrique",
                icon: "fa-check-double",
                info: "Tel: (18)99818-5606\nEmail: faturamentosp5@transval.net.br"
            }
        ]
    }
];

import { initResourceHub, initResourceHubEvents } from './resourceHub.js';

export function initQuickContactsSection() {
    if (!sessionStorage.getItem('isLoggedIn')) {
        return `
            <div class="contacts-container">
                <h2>Acesso Restrito</h2>
                <p>Por favor, faça login para acessar os contatos.</p>
            </div>
        `;
    }

    return `
        <div class="contacts-container">
            <div class="titulo-container">
                <button id="backToHubBtn" class="back-button">
                    <i class="fas fa-arrow-left"></i> Voltar ao Hub
                </button>
                <h2>Contatos Rápidos</h2>
            </div>
            
            ${quickContactsData.map(department => `
                <div class="department-group">
                    <h3 class="department-title">${department.title}</h3>
                    <div class="contacts-grid">
                        ${department.contacts.map(contact => `
                            <div class="contact-item">
                                <i class="fas ${contact.icon}"></i>
                                <h3>${contact.name}</h3>
                                ${contact.info ? `<p>${contact.info.replace('\n', '<br>')}</p>` : ''}
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

export function initQuickContactsEvents() {
    const contentArea = document.querySelector('.content-area');

    // Add back to hub button listener
    const backToHubBtn = document.getElementById('backToHubBtn');
    if (backToHubBtn) {
        backToHubBtn.addEventListener('click', () => {
            contentArea.innerHTML = initResourceHub();
            initResourceHubEvents();
        });
    }
}