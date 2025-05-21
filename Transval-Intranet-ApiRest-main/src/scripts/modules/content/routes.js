export function initRoutesSection() {
    return `
        <div class="route-calculator">            
            <div class="route-inputs">
                <div class="input-group">
                    <label for="origin">Origem:</label>
                    <input type="text" id="origin" placeholder="Digite o local de origem">
                </div>                
                <div class="input-group">
                    <label for="destination">Destino:</label>
                    <input type="text" id="destination" placeholder="Digite o local de destino">
                </div>
                
                <div class="input-group">
                    <label for="axles">Número de Eixos:</label>
                    <select id="axles">
                        <option value="2">2 Eixos</option>
                        <option value="3">3 Eixos</option>
                        <option value="4">4 Eixos</option>
                        <option value="5">5 Eixos</option>
                        <option value="6">6 Eixos</option>
                        <option value="7">7 Eixos</option>
                        <option value="8">8 Eixos</option>
                        <option value="9">9 Eixos</option>
                    </select>
                </div>
            </div>
            
            <div class="route-options">
                <button class="calculate-route">Calcular Rota</button>
                <button class="calculate-route">Adicionar Parada</button>
                <button class="calculate-route">Otimizar Rota</button>
            </div>
            
            <div id="routeMap" class="route-map"></div>
            
            <div class="route-details">
                <div class="route-info">
                    <div class="info-item">
                        <span id="totalDistance">0 km</span>
                        <p>Distância Total</p>
                    </div>
                    <div class="info-item">
                        <span id="totalTime">0h 0min</span>
                        <p>Tempo Estimado</p>
                    </div>
                    <div class="info-item">
                        <span id="estimatedToll">R$ 0,00</span>
                        <p>Custo Estimado de Pedágio</p>
                    </div>
                </div>
                
                <div id="waypointsList" class="waypoints-list"></div>
            </div>
        </div>
    `;
}

// Global variables
let map;
let waypoints = [];
let markers = [];
let currentRoute = null;
let directionsService;
let directionsRenderer;

export function initRouteCalculator() {
    setTimeout(() => {
        const mapElement = document.getElementById('routeMap');
        if (!mapElement) return;

        // Initialize Google Maps services
        directionsService = new google.maps.DirectionsService();
        directionsRenderer = new google.maps.DirectionsRenderer();

        map = new google.maps.Map(mapElement, {
            zoom: 4,
            center: { lat: -15.793889, lng: -47.882778 },
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        directionsRenderer.setMap(map);

        // Initialize autocomplete for input fields
        const originInput = document.getElementById('origin');
        const destinationInput = document.getElementById('destination');
        initAutocomplete(originInput, 'br');
        initAutocomplete(destinationInput, 'br');

        // Add click event listeners to all calculate buttons
        document.querySelectorAll('.calculate-route').forEach(button => {
            button.onclick = null; // Remove inline handler
            if (button.textContent === 'Calcular Rota') {
                button.addEventListener('click', handleCalculateButtonClick);
            } else if (button.textContent === 'Adicionar Parada') {
                button.addEventListener('click', addWaypoint);
            } else if (button.textContent === 'Otimizar Rota') {
                button.addEventListener('click', optimizeRoute);
            }
        });

        // Initialize axle change listener
        initAxleChangeListener();
    }, 100);
}

// Initialize Google Places Autocomplete
function initAutocomplete(inputElement, country) {
    new google.maps.places.Autocomplete(inputElement, {
        types: ['(cities)'],
        componentRestrictions: { country: country }
    });
}

// Handle calculate button click
function handleCalculateButtonClick() {
    if (currentRoute) {
        // If we have a current route, just update tolls
        clearTollMarkers();
        addTollLocations(currentRoute.routes[0]);
        displayRouteDetails(currentRoute);
    } else {
        // Calculate new route
        calculateRoute();
    }
}

// Calculate route and display on map
function calculateRoute() {
    const origin = document.getElementById('origin').value;
    const destination = document.getElementById('destination').value;

    if (!origin || !destination) {
        alert('Por favor, preencha origem e destino');
        return;
    }

    // Clear existing markers and tolls
    clearTollMarkers();

    const request = {
        origin: origin,
        destination: destination,
        waypoints: waypoints.map(wp => ({
            location: wp,
            stopover: true
        })),
        travelMode: google.maps.TravelMode.DRIVING,
        optimizeWaypoints: true,
        provideRouteAlternatives: false
    };

    directionsService.route(request, (result, status) => {
        if (status === 'OK') {
            directionsRenderer.setDirections(result);
            currentRoute = result;

            clearTollMarkers();
            addTollLocations(result.routes[0]);
            displayRouteDetails(result);
        } else {
            alert('Não foi possível calcular a rota: ' + status);
        }
    });
}

// Make calculateRoute accessible globally
window.calculateRoute = calculateRoute;

// Calculate toll cost based on distance and number of axles
function calculateToll(route, axles) {
    const baseTollRate = 0.15; // Base toll rate per axle per kilometer
    const distance = route.routes[0].legs.reduce((total, leg) =>
        total + leg.distance.value, 0) / 1000; // Convert to kilometers

    const tollCost = distance * baseTollRate * axles;

    return tollCost.toFixed(2);
}

// Display route details including distance, time, and toll cost
function displayRouteDetails(result) {
    const route = result.routes[0];
    let totalDistance = 0;
    let totalTime = 0;

    route.legs.forEach(leg => {
        totalDistance += leg.distance.value;
        totalTime += leg.duration.value;
    });

    const axles = parseInt(document.getElementById('axles').value);
    const tollCost = calculateToll(result, axles);

    document.getElementById('totalDistance').textContent =
        `${Math.round(totalDistance / 1000)} km`;
    document.getElementById('totalTime').textContent =
        formatTime(totalTime);
    document.getElementById('estimatedToll').textContent =
        `R$ ${tollCost}`;

    // Display waypoints
    const waypointsList = document.getElementById('waypointsList');
    waypointsList.innerHTML = '';

    route.legs.forEach((leg, index) => {
        const waypoint = document.createElement('div');
        waypoint.className = 'waypoint-item';
        waypoint.textContent = `${index + 1}. ${leg.start_address} → ${leg.end_address}`;
        waypointsList.appendChild(waypoint);
    });

    // Add total toll costs
    const totalTolls = markers.length;
    const averageTollCost = (Math.random() * 10 + 5 * axles).toFixed(2);
    const totalTollCost = (totalTolls * averageTollCost).toFixed(2);

    document.getElementById('estimatedToll').textContent =
        `R$ ${totalTollCost} (${totalTolls} pedágios)`;
}

// Format time from seconds to hours and minutes
function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    return `${hours}h ${minutes}min`;
}

// Add a new waypoint input field
function addWaypoint() {
    const waypointInput = document.createElement('div');
    waypointInput.className = 'input-group';
    const inputId = `waypoint-${waypoints.length}`;
    waypointInput.innerHTML = `
        <label for="${inputId}">Parada ${waypoints.length + 1}:</label>
        <input type="text" id="${inputId}" placeholder="Digite o local da parada">
    `;

    document.querySelector('.route-inputs').appendChild(waypointInput);
    const input = waypointInput.querySelector('input');
    initAutocomplete(input, 'br');

    input.addEventListener('change', () => {
        const index = parseInt(input.id.split('-')[1]);
        waypoints[index] = input.value;
    });
}

// Optimize the current route
function optimizeRoute() {
    const request = {
        ...currentRequest,
        optimizeWaypoints: true
    };

    calculateRoute();
}

// Clear all toll markers from the map
function clearTollMarkers() {
    markers.forEach(marker => marker.setMap(null));
    markers = [];
}

// Axle multiplier constants
const AXLE_MULTIPLIERS = {
    2: 1.0,    // Base multiplier for 2 axles
    3: 1.5,    // 3 axles
    4: 2.0,    // 4 axles
    5: 2.5,    // 5 axles
    6: 3.0,    // 6 axles
    7: 3.5,    // 7 axles
    8: 4.0,    // 8 axles
    9: 4.5     // 9 axles
};

// Add toll locations along the route
function addTollLocations(route) {
    clearTollMarkers();
    const axles = parseInt(document.getElementById('axles').value);

    // Get route details
    const path = route.overview_path;
    const totalDistance = route.legs.reduce((total, leg) => total + leg.distance.value, 0) / 1000;

    const baseTollRatePerKm = 0.10; // Base toll rate per km per axle
    const averageTollDistance = 100; // Average distance between toll plazas in Brazil
    const estimatedTolls = Math.max(Math.ceil(totalDistance / averageTollDistance), 1);

    // Calculate toll points
    const checkPoints = [];
    for (let i = 0; i < estimatedTolls; i++) {
        const index = Math.floor((path.length / estimatedTolls) * i);
        checkPoints.push({
            position: path[index],
            distance: (totalDistance / estimatedTolls) * i
        });
    }

    // Add toll markers
    checkPoints.forEach((point, index) => {
        const segmentDistance = totalDistance / estimatedTolls;
        const axleMultiplier = AXLE_MULTIPLIERS[axles];
        const regionalFactor = 1.2;

        // Updated toll price calculation with axle multiplier
        const tollPrice = (
            baseTollRatePerKm *
            segmentDistance *
            axleMultiplier *
            regionalFactor
        ).toFixed(2);

        const tollMarker = new google.maps.Marker({
            position: point.position,
            map: map,
            icon: {
                url: 'https://maps.google.com/mapfiles/ms/icons/dollar.png',
                scaledSize: new google.maps.Size(32, 32)
            },
            title: `Pedágio ${index + 1} - R$ ${tollPrice}`
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div class="toll-info">
                    <h3>Pedágio ${index + 1}</h3>
                    <p>Valor base por km: R$ ${baseTollRatePerKm.toFixed(2)}</p>
                    <p>Distância do trecho: ${Math.round(segmentDistance)} km</p>
                    <p>Número de eixos: ${axles} (multiplicador: ${axleMultiplier}x)</p>
                    <p>Valor total: R$ ${tollPrice}</p>
                </div>
            `
        });

        tollMarker.addListener('click', () => {
            infoWindow.open(map, tollMarker);
        });

        markers.push({
            marker: tollMarker,
            price: parseFloat(tollPrice)
        });
    });

    const totalTollCost = markers.reduce((total, marker) => total + marker.price, 0);
    document.getElementById('estimatedToll').textContent =
        `R$ ${totalTollCost.toFixed(2)} (${markers.length} pedágios)`;
}

// Initialize axle change listener
function initAxleChangeListener() {
    const axleSelect = document.getElementById('axles');
    if (axleSelect) {
        axleSelect.addEventListener('change', () => {
            // Get current route
            const currentRoute = directionsRenderer.getDirections();
            if (currentRoute) {
                // Recalculate tolls with new axle count
                clearTollMarkers();
                addTollLocations(currentRoute.routes[0]);
            }
        });
    }
}