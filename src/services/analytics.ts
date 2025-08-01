
// Service de tracking Google Analytics 4
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

interface PageViewData {
  page_path: string;
  page_location: string;
  page_title: string;
}

class AnalyticsService {
  private isInitialized = false;
  private currentPath = '';

  constructor() {
    this.waitForGtag();
  }

  private waitForGtag() {
    // Attendre que gtag soit disponible
    const checkGtag = () => {
      if (window.gtag) {
        this.isInitialized = true;
        console.log('Google Analytics initialized');
        // Track initial page view
        this.trackPageView();
      } else {
        setTimeout(checkGtag, 100);
      }
    };
    checkGtag();
  }

  public trackPageView(customData?: Partial<PageViewData>) {
    if (!this.isInitialized || !window.gtag) {
      console.warn('Google Analytics not initialized');
      return;
    }

    const currentPath = window.location.pathname;
    
    // Éviter les doublons si on reste sur la même page
    if (currentPath === this.currentPath) {
      return;
    }

    this.currentPath = currentPath;

    const pageViewData: PageViewData = {
      page_path: currentPath,
      page_location: window.location.href,
      page_title: document.title,
      ...customData
    };

    window.gtag('event', 'page_view', pageViewData);
    console.log('GA4 Page view tracked:', pageViewData);
  }

  public trackEvent(eventName: string, parameters: Record<string, any> = {}) {
    if (!this.isInitialized || !window.gtag) {
      console.warn('Google Analytics not initialized');
      return;
    }

    window.gtag('event', eventName, parameters);
    console.log('GA4 Event tracked:', eventName, parameters);
  }

  public trackCustomEvent(action: string, category: string, label?: string, value?: number) {
    this.trackEvent(action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }
}

export const analyticsService = new AnalyticsService();

// Fonction utilitaire pour le tracking de page
export const trackPageView = (customData?: Partial<PageViewData>) => {
  analyticsService.trackPageView(customData);
};

// Fonction utilitaire pour le tracking d'événements
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  analyticsService.trackEvent(eventName, parameters);
};
