import { useState, useEffect, useCallback } from "react";
import { ArrowUp } from "lucide-react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(24); // default 1.5rem

  const handleScroll = useCallback(() => {
    setVisible(window.scrollY > 300);

    const footer = document.querySelector("footer");
    if (footer) {
      const footerRect = footer.getBoundingClientRect();
      const buttonSize = 48; // approximate button height
      const gap = 24; // gap from footer or viewport bottom

      if (footerRect.top < window.innerHeight) {
        // Footer is visible — push button above it
        setBottomOffset(window.innerHeight - footerRect.top + gap);
      } else {
        setBottomOffset(gap);
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{ bottom: `${bottomOffset}px` }}
      className="fixed right-6 z-50 rounded-full bg-primary p-3 text-primary-foreground shadow-lg hover:bg-primary/90 transition-all hover:scale-105"
      aria-label="Scroll to top"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
