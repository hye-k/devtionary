import { useEffect } from "react";

const BASE_URL = "https://devtionary.lovable.app";

interface PageMeta {
  title: string;
  description: string;
  path?: string;
}

export function usePageMeta({ title, description, path }: PageMeta) {
  useEffect(() => {
    document.title = title;

    const url = `${BASE_URL}${path ?? "/"}`;

    const updates: Record<string, string> = {
      'meta[name="description"]': description,
      'meta[property="og:title"]': title,
      'meta[property="og:description"]': description,
      'meta[property="og:url"]': url,
      'meta[name="twitter:title"]': title,
      'meta[name="twitter:description"]': description,
      'link[rel="canonical"]': url,
    };

    for (const [selector, value] of Object.entries(updates)) {
      const el = document.querySelector(selector);
      if (el) {
        if (el.tagName === "LINK") {
          el.setAttribute("href", value);
        } else {
          el.setAttribute("content", value);
        }
      }
    }
  }, [title, description, path]);
}
