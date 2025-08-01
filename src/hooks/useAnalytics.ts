
import { useCallback } from 'react';
import { trackEvent, trackPageView } from '@/services/analytics';

export const useAnalytics = () => {
  const track = useCallback((eventName: string, parameters?: Record<string, any>) => {
    trackEvent(eventName, parameters);
  }, []);

  const trackPage = useCallback((customData?: any) => {
    trackPageView(customData);
  }, []);

  const trackUserAction = useCallback((action: string, category: string, label?: string, value?: number) => {
    trackEvent(action, {
      event_category: category,
      event_label: label,
      value: value
    });
  }, []);

  return {
    track,
    trackPage,
    trackUserAction
  };
};
