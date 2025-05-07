

document.addEventListener('DOMContentLoaded', function() {
    const menuButton = document.getElementById('menuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (menuButton && mobileMenu) {
        menuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    const tabButtons = document.querySelectorAll('.tab-button');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            this.classList.add('active');
            
            const tabId = this.getAttribute('data-tab');
            
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => {
                content.classList.remove('active');
                content.classList.add('hidden');
            });
            
            const activeContent = document.getElementById(tabId);
            if (activeContent) {
                activeContent.classList.add('active');
                activeContent.classList.remove('hidden');
            }
        });
    });
    
    const distanceRange = document.getElementById('distanceRange');
    const distanceValue = document.getElementById('distanceValue');
    
    if (distanceRange && distanceValue) {
        distanceRange.addEventListener('input', function() {
            distanceValue.textContent = this.value + 'km';
        });
    }
    
    const preferencesForm = document.getElementById('preferencesForm');
    
    if (preferencesForm) {
        preferencesForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const estilos = Array.from(document.querySelectorAll('input[name="estilo"]:checked')).map(cb => cb.value);
            const locais = Array.from(document.querySelectorAll('input[name="local"]:checked')).map(cb => cb.value);
            const distancia = document.getElementById('distanceRange').value;
            
            console.log('Preferências salvas:', { estilos, locais, distancia });
            
            const button = this.querySelector('button[type="submit"]');
            const originalText = button.innerHTML;
            
            button.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                Preferências Salvas!
            `;
            
            button.classList.add('bg-arq-green');
            button.classList.remove('bg-arq-red', 'hover:bg-red-600');
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.classList.remove('bg-arq-green');
                button.classList.add('bg-arq-red', 'hover:bg-red-600');
            }, 3000);
        });
    }
    
    initMap();
    
    const cards = document.querySelectorAll('.transform');
    
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('opacity-100');
            card.classList.remove('opacity-0');
        }, 100 * index);
    });
});

function initMap() {
    const mapElement = document.getElementById('map');
    
    if (mapElement) {
        const paulistaCoords = [-23.5632, -46.6544];
        
        const map = L.map('map').setView(paulistaCoords, 15);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        const points = [
            {
                name: "MASP",
                coords: [-23.5614, -46.6559],
                color: "#F44336",
                icon: "🏛️",
                description: "Museu de Arte de São Paulo"
            },
            {
                name: "Conjunto Nacional",
                coords: [-23.5592, -46.6584],
                color: "#2196F3",
                icon: "🏢",
                description: "Primeiro shopping center da cidade"
            },
            {
                name: "Japan House",
                coords: [-23.5639, -46.6601],
                color: "#FFEB3B",
                icon: "🏯",
                description: "Centro cultural japonês"
            },
            {
                name: "IMS Paulista",
                coords: [-23.5625, -46.6527],
                color: "#92D050",
                icon: "🏙️",
                description: "Instituto Moreira Salles"
            },
            {
                name: "Casa das Rosas",
                coords: [-23.5703, -46.6443],
                color: "#F48FB1",
                icon: "🏠",
                description: "Mansão histórica em estilo clássico francês"
            },
            {
                name: "Edifício Itália",
                coords: [-23.5430, -46.6433],
                color: "#9C27B0",
                icon: "🏙️",
                description: "Arranha-céu projetado por Franz Heep"
            }
        ];
        
        points.forEach((point, index) => {
            const markerIcon = L.divIcon({
                className: 'custom-div-icon',
                html: `<div style="background-color: ${point.color}; color: white; width: 30px; height: 30px; display: flex; justify-content: center; align-items: center; border-radius: 50%; font-weight: bold;">${index + 1}</div>`,
                iconSize: [30, 30],
                iconAnchor: [15, 15]
            });
            
            const marker = L.marker(point.coords, { icon: markerIcon }).addTo(map);
            
            marker.bindPopup(`
                <div class="popup-content">
                    <h3 style="font-weight: bold; margin-bottom: 5px;">${point.name}</h3>
                    <p>${point.description}</p>
                </div>
            `);
        });
        
        const paulistaLine = L.polyline([
            [-23.5703, -46.6443], // Casa das Rosas
            [-23.5639, -46.6601], // Japan House
            [-23.5614, -46.6559], // MASP
            [-23.5592, -46.6584], // Conjunto Nacional
            [-23.5625, -46.6527]  // IMS Paulista
        ], {
            color: '#F44336',
            weight: 3,
            opacity: 0.7,
            dashArray: '10, 10',
            lineJoin: 'round'
        }).addTo(map);
        
        L.marker([-23.5614, -46.6500], {
            icon: L.divIcon({
                className: 'text-label',
                html: '<div style="background-color: rgba(255,255,255,0.8); padding: 5px; border-radius: 3px; font-weight: bold;">Avenida Paulista</div>',
                iconSize: [100, 20],
                iconAnchor: [50, 10]
            })
        }).addTo(map);
    }
}

function rotateRecommendations() {
    // Implementação futura para alternar entre diferentes recomendações
}

function loadUserChallenges() {
    // Implementação futura para carregar desafios do usuário de uma API
}

function loadUserAchievements() {
    // Implementação futura para carregar conquistas do usuário de uma API
}