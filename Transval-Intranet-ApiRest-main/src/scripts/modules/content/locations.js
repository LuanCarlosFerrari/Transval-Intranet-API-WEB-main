let map;
let markers = {};
let locationCoordinates; // Nova variável global

export function initLocationsSection() {
    locationCoordinates = [
        { lat: -23.1066, lng: -55.2250, title: 'Amambai-MS' },
        { lat: -16.3266, lng: -48.9534, title: 'Anápolis-GO' },
        { lat: -21.2088, lng: -50.4278, title: 'Araçatuba-SP' },
        { lat: -19.5908, lng: -46.9408, title: 'Araxá-MG' },
        { lat: -20.2836, lng: -45.5419, title: 'Arcos-MG' },
        { lat: -18.6464, lng: -48.1933, title: 'Araguari-MG' },
        { lat: -24.1458, lng: -49.9458, title: 'Arapoti-PR' },
        { lat: -14.0497, lng: -52.1597, title: 'Água Boa-MT' },
        { lat: -23.9380, lng: -54.1680, title: 'Mundo Novo-MS' },
        { lat: -14.4088, lng: -56.4388, title: 'Diamantino-MT' },
        { lat: -22.2208, lng: -54.8058, title: 'Dourados-MS' },
        { lat: -15.5399, lng: -47.3333, title: 'Formosa-GO' },
        { lat: -16.6868, lng: -49.2647, title: 'Goiânia-GO' },
        { lat: -10.6438, lng: -51.5694, title: 'Confresa-MT' },
        { lat: -15.6013, lng: -56.0983, title: 'Cuiabá-MT' },
        { lat: -23.8911, lng: -46.4175, title: 'Cubatão-SP' },
        { lat: -13.6788, lng: -57.8902, title: 'Campo Novo do Parecis-MT' },
        { lat: -20.4697, lng: -54.6208, title: 'Campo Grande-MS' },
        { lat: -15.5458, lng: -55.1666, title: 'Campo Verde-MT' },
        { lat: -13.5505, lng: -52.2705, title: 'Canarana-MT' },
        { lat: -18.1661, lng: -47.9445, title: 'Catalão-GO' },
        { lat: -18.4072, lng: -52.5999, title: 'Chapadão do Céu-GO' },
        { lat: -18.7908, lng: -52.5908, title: 'Chapadão do Sul-MS' },
        { lat: -8.0586, lng: -48.4783, title: 'Colinas do Tocantins-TO' },
        { lat: -7.5322, lng: -46.0369, title: 'Balsas-MA' },
        { lat: -22.2944, lng: -54.1822, title: 'Batayporã-MS' },
        { lat: -1.5147, lng: -48.6197, title: 'Barcarena-PA' },
        { lat: -15.8905, lng: -52.2643, title: 'Barra do Garças-MT' },
        { lat: -16.3566, lng: -46.9083, title: 'Unaí-MG' },
        { lat: -14.7194, lng: -56.3291, title: 'Nobres-MT' },
        { lat: -13.8319, lng: -56.0752, title: 'Nova Mutum-MT' },
        { lat: -13.8300, lng: -56.0741, title: 'Nova Mutum Transbordo-MT' },
        { lat: -22.9788, lng: -49.8708, title: 'Ourinhos-SP' },
        { lat: -21.1311, lng: -48.9163, title: 'Catanduva-SP' },
        { lat: -17.4436, lng: -51.1036, title: 'Montividiu-GO' },
        { lat: -21.6138, lng: -55.1688, title: 'Maracaju-MS' },
        { lat: -23.4250, lng: -51.9386, title: 'Maringá-PR' },
        { lat: -10.1558, lng: -54.9467, title: 'Matupá-MT' },
        { lat: -4.2905, lng: -55.9527, title: 'Miritituba-PA' },
        { lat: -2.9980, lng: -47.3533, title: 'Paragominas-PA' },
        { lat: -17.2252, lng: -46.8744, title: 'Paracatu-MG' },
        { lat: -25.5177, lng: -48.5094, title: 'Paranaguá-PR' },
        { lat: -18.5793, lng: -46.5180, title: 'Patos de Minas-MG' },
        { lat: -22.7555, lng: -47.1247, title: 'Paulínia-SP' },
        { lat: -22.5361, lng: -55.7252, title: 'Ponta Porã-MS' },
        { lat: -15.5583, lng: -54.2819, title: 'Primavera do Leste-MT' },
        { lat: -12.5883, lng: -52.1827, title: 'Querência-MT' },
        { lat: -21.7147, lng: -50.7233, title: 'Rinópolis-SP' },
        { lat: -21.1766, lng: -47.8208, title: 'Ribeirão Preto-SP' },
        { lat: -16.4677, lng: -54.6355, title: 'Rondonópolis-MT' },
        { lat: -17.7988, lng: -50.9219, title: 'Rio Verde-GO' },
        { lat: -13.5402, lng: -58.8147, title: 'Sapezal-MT' },
        { lat: -2.4427, lng: -54.7093, title: 'Santarém-PA' },
        { lat: -2.5297, lng: -44.2966, title: 'São Luís-MA' },
        { lat: -19.3938, lng: -54.1880, title: 'São Gabriel do Oeste-MS' },
        { lat: -26.2427, lng: -48.6383, title: 'São Francisco do Sul-SC' },
        { lat: -20.4830, lng: -54.6147, title: 'Sidrolândia-MS' },
        { lat: -11.8605, lng: -55.5097, title: 'Sinop-MT' },
        { lat: -11.8583, lng: -55.5083, title: 'Sinop Transbordo-MT' },
        { lat: -11.8605, lng: -55.5097, title: 'Sinop Fertilizante-MT' },
        { lat: -12.5458, lng: -55.7208, title: 'Sorriso-MT' },
        { lat: -12.5458, lng: -55.7208, title: 'Sorriso Transbordo-MT' },
        { lat: -14.6230, lng: -57.4855, title: 'Tangará da Serra-MT' },
        { lat: -18.9166, lng: -48.2833, title: 'Uberlândia-MG' },
        { lat: -19.7488, lng: -47.9369, title: 'Uberaba-MG' },
        { lat: -14.5252, lng: -49.1453, title: 'Uruaçu-GO' },
        { lat: -21.7977, lng: -50.8816, title: 'Osvaldo Cruz-SP' },
        { lat: -12.7461, lng: -60.1297, title: 'Vilhena-RO' },
        { lat: -16.7405, lng: -48.5155, title: 'Vianópolis-GO' }
    ];

    // Use os títulos dos marcadores para o select
    const locations = locationCoordinates.map(loc => loc.title).sort();

    const selectOptions = locations.map(location =>
        `<option value="${location}">${location}</option>`
    ).join('');

    const mapHtml = `
        <div class="unidades-container">
            <h2 class="company-title">Conheça Nossas Unidades</h2>
            <select id="unidades-select" class="unidades-select">
                <option value="">Selecione uma unidade</option>
                ${selectOptions}
            </select>
            <div id="map" style="width: 100%; height: 500px;"></div>
        </div>
    `;

    // Aguarde o DOM estar pronto antes de inicializar o mapa
    setTimeout(() => {
        const mapElement = document.getElementById('map');
        if (mapElement) {
            initMap();
        }
    }, 100);

    return mapHtml;
}

// Initialize Google Map and markers
function initMap() {
    // Atualiza a variável global map
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: { lat: -15.793889, lng: -47.882778 },
        styles: [{ featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }]
    });

    markers = createMarkers(locationCoordinates, map);

    const select = document.getElementById('unidades-select');
    if (select) {
        select.addEventListener('change', handleSelectChange);
    }

    // Add InfoWindows for markers
    const infoWindows = createInfoWindows(locationCoordinates, markers, map);

    // Add marker cluster
    const markerCluster = new MarkerClusterer(map, Object.values(markers), {
        imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'
    });

    // Add custom controls
    map.controls[google.maps.ControlPosition.TOP_RIGHT].push(
        createCustomControl('Centralizar Mapa', () => {
            map.setCenter({ lat: -15.793889, lng: -47.882778 });
            map.setZoom(4);
        })
    );

    // Add region filters
    addRegionFilters();
}

// Create markers for each location
function createMarkers(locations, map) {
    const markers = {};
    locations.forEach(location => {
        markers[location.title] = new google.maps.Marker({
            position: location,
            map: map,
            title: location.title,
            animation: google.maps.Animation.DROP
        });
    });
    return markers;
}

// Handle location selection change
function handleSelectChange(e) {
    const selectedLocation = e.target.value;

    // Use a variável global map ao invés de tentar acessar através do DOM
    if (!map || !selectedLocation) return;

    const marker = markers[selectedLocation];
    if (marker) {
        map.setZoom(12);
        map.setCenter(marker.getPosition());
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(() => {
            marker.setAnimation(null);
        }, 1500);
    }
}

// Create InfoWindows for each marker
function createInfoWindows(locations, markers, map) {
    const infoWindows = {};
    locations.forEach(location => {
        const content = `
            <div class="map-marker-info">
                <h3>${location.title}</h3>
                <p>Clique para mais informações</p>
            </div>
        `;

        const infoWindow = new google.maps.InfoWindow({
            content: content
        });

        markers[location.title].addListener('click', () => {
            // Close all other InfoWindows
            Object.values(infoWindows).forEach(iw => iw.close());
            infoWindow.open(map, markers[location.title]);
        });

        infoWindows[location.title] = infoWindow;
    });
    return infoWindows;
}

// Create custom control button
function createCustomControl(text, onClick) {
    const controlButton = document.createElement('button');
    controlButton.style.cssText = `
        background-color: white;
        border: 2px solid #ccc;
        border-radius: 3px;
        box-shadow: 0 2px 6px rgba(0,0,0,.3);
        cursor: pointer;
        margin: 10px;
        padding: 8px;
        text-align: center;
    `;
    controlButton.textContent = text;
    controlButton.addEventListener('click', onClick);
    return controlButton;
}

// Add region filter buttons
function addRegionFilters() {
    const regions = {
        'all': 'Todas as Regiões',
        'north': 'Norte',
        'northeast': 'Nordeste',
        'midwest': 'Centro-Oeste',
        'southeast': 'Sudeste',
        'south': 'Sul'
    };

    const filterContainer = document.createElement('div');
    filterContainer.className = 'region-filters';

    Object.entries(regions).forEach(([key, value]) => {
        const button = document.createElement('button');
        button.className = 'region-filter-btn';
        button.textContent = value;
        button.onclick = () => filterMarkersByRegion(key);
        filterContainer.appendChild(button);
    });

    document.querySelector('.unidades-container').insertBefore(
        filterContainer,
        document.querySelector('#map')
    );
}

// Filter markers by region
function filterMarkersByRegion(region) {
    Object.entries(markers).forEach(([title, marker]) => {
        const visible = region === 'all' || getMarkerRegion(title) === region;
        marker.setVisible(visible);
    });
}

// Função auxiliar para determinar a região com base no estado
function getMarkerRegion(title) {
    const state = title.split('-')[1];
    const regions = {
        'north': ['PA', 'TO', 'RO', 'AM', 'AC', 'RR', 'AP'],
        'northeast': ['MA', 'PI', 'CE', 'RN', 'PB', 'PE', 'AL', 'SE', 'BA'],
        'midwest': ['MT', 'MS', 'GO', 'DF'],
        'southeast': ['MG', 'ES', 'RJ', 'SP'],
        'south': ['PR', 'SC', 'RS']
    };

    for (const [region, states] of Object.entries(regions)) {
        if (states.includes(state)) {
            return region;
        }
    }
    return 'all';
}