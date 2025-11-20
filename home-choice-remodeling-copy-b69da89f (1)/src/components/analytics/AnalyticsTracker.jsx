import { useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import { useLanguage } from "../../Layout";

// Generate or retrieve session ID
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

// Get UTM parameters from URL
const getUTMParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
  };
};

export const useAnalytics = (pageName) => {
  const { language } = useLanguage();
  const startTimeRef = useRef(Date.now());
  const sessionId = getSessionId();

  useEffect(() => {
    // Track page view
    const trackPageView = async () => {
      const utmParams = getUTMParams();
      
      await base44.entities.Analytics.create({
        event_type: "page_view",
        page_name: pageName,
        session_id: sessionId,
        ...utmParams,
        referrer: document.referrer || undefined,
        user_agent: navigator.userAgent,
        language: language,
        metadata: {
          viewport_width: window.innerWidth,
          viewport_height: window.innerHeight
        }
      });
    };

    trackPageView();

    // Track session start (once per session)
    const hasTrackedSession = sessionStorage.getItem('analytics_session_tracked');
    if (!hasTrackedSession) {
      base44.entities.Analytics.create({
        event_type: "session_start",
        session_id: sessionId,
        ...getUTMParams(),
        referrer: document.referrer || undefined,
        language: language
      });
      sessionStorage.setItem('analytics_session_tracked', 'true');
    }

    // Track time on page when user leaves
    const handleBeforeUnload = async () => {
      const timeOnPage = Math.floor((Date.now() - startTimeRef.current) / 1000);
      
      // Use sendBeacon for reliable tracking on page unload
      const data = JSON.stringify({
        event_type: "session_end",
        page_name: pageName,
        session_id: sessionId,
        time_on_page: timeOnPage,
        language: language
      });

      navigator.sendBeacon('/api/analytics', data);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pageName, language, sessionId]);

  // Function to track custom events
  const trackEvent = async (eventData) => {
    await base44.entities.Analytics.create({
      session_id: sessionId,
      page_name: pageName,
      language: language,
      ...eventData
    });
  };

  return { trackEvent };
};

export default useAnalytics;