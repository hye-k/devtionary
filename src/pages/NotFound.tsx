import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { usePageMeta } from "@/hooks/use-page-meta";

const NotFound = () => {
  const location = useLocation();

  usePageMeta({
    title: "404 - Page Not Found | Devtionary",
    description: "The page you are looking for does not exist.",
    path: location.pathname,
  });

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center px-4">
        <h1 className="mb-3 md:mb-4 font-mono text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">404</h1>
        <p className="mb-3 md:mb-4 text-base md:text-lg lg:text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-sm md:text-base text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
