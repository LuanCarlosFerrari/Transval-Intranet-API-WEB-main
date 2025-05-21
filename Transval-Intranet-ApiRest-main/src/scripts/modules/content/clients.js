const clientsConfig = {
    rumo: {
        name: 'Rumo Logística',
        url: 'https://rumolog.com/',
        image: 'src/Assets/clients/Rumo-logistica-logo-clipart.png'
    },
    ldc: {
        name: 'LDC',
        url: 'https://www.ldc.com/br/pt/',
        image: 'src/Assets/clients/LDC.png'
    },
    viterra: {
        name: 'Viterra',
        url: 'https://www.viterra.us/',
        image: 'src/Assets/clients/viterra.png'
    },
    caramuru: {
        name: 'Caramuru',
        url: 'https://caramuru.com/',
        image: 'src/Assets/clients/caramuru.png'
    },
    cofco: {
        name: 'Cofco Agri',
        url: 'https://br.cofcointernational.com/',
        image: 'src/Assets/clients/cofco.png'
    },
    raizen: {
        name: 'Raizen',
        url: 'https://www.raizen.com.br/',
        image: 'src/Assets/clients/raizen.png'
    },
    fertipar: {
        name: 'Fertipar',
        url: 'https://fertipar.com.br/',
        image: 'src/Assets/clients/fertipar.png'
    },
    yara: {
        name: 'Yara',
        url: 'https://www.yarabrasil.com.br/',
        image: 'src/Assets/clients/yara.png'
    },
    copersucar: {
        name: 'Copersucar',
        url: 'https://www.copersucar.com.br/',
        image: 'src/Assets/clients/copersucar.png'
    },
    heringer: {
        name: 'Heringer',
        url: 'https://www.heringer.com.br/',
        image: 'src/Assets/clients/heringer.png'
    }
};

export function initClientsSection() {
    const template = `
        <div class="titulo-container">
            <h2>Nossos Parceiros</h2>
            <div class="client-grid">
                ${Object.values(clientsConfig).map(client => `
                    <a href="${client.url}" class="client-box" target="_blank" rel="noopener noreferrer">
                        <img src="${client.image}" alt="${client.name}" loading="lazy">
                        <h3>${client.name}</h3>
                    </a>
                `).join('')}
            </div>
        </div>
    `;
    return template;
}