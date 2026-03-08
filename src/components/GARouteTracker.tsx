import { useEffect } from "react";
import { useLocation } from "react-router-dom";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const GARouteTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", "G-DDNPWPR451", {
        page_path: location.pathname + location.search,
      });
    }
  }, [location]);

  return null;
};
