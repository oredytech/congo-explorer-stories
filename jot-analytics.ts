import { JOTAnalytics } from '@jot/analytics';

// Initialiser l'analyse
const jotAnalytics = new JOTAnalytics({
    endpoint: 'https://visitcongo.net/wp-json/jot/v1/analytics',
    siteId: '1'
});

// Fonction pour initialiser le tracking
export function initJOTAnalytics() {
    // Démarrer le tracking
    jotAnalytics.start();
    
    // Ajouter des événements personnalisés
    window.addEventListener('customEvent', (event) => {
        jotAnalytics.trackEvent(event.detail.type, event.detail.data);
    });
}

// Ajouter l'initialisation au chargement de la page
if (typeof window !== 'undefined') {
    window.addEventListener('load', initJOTAnalytics);
}
