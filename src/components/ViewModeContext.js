"use client";
import { createContext, useContext, useEffect, useState } from "react";

const ViewModeContext = createContext();

export function ViewModeProvider({ children }) {
  const [isMobile, setIsMobile] = useState(false);
  const [isLandscape, setIsLandscape] = useState(false);
  
  // 'mobile' | 'desktop' | null
  const [userPreference, setUserPreference] = useState(null); 

  useEffect(() => {
    // Initial check
    const checkMobile = () => {
        // Simple check: width < 768px is typically mobile in Tailwind (md is 768)
        setIsMobile(window.innerWidth < 768);
    };
    
    const checkOrientation = () => {
       setIsLandscape(window.innerWidth > window.innerHeight);
    };

    checkMobile();
    checkOrientation();

    const handleResize = () => {
      checkMobile();
      checkOrientation();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Derived viewMode
  // If not mobile -> Desktop
  // If mobile and landscape -> Desktop (Auto switch requirement)
  // If mobile and portrait -> Check preference (Default to mobile if null/mobile, Desktop if desktop)
  const viewMode = (!isMobile || isLandscape || userPreference === 'desktop') ? 'desktop' : 'mobile';

  return (
    <ViewModeContext.Provider value={{ viewMode, isMobile, isLandscape, userPreference, setUserPreference }}>
      {children}
    </ViewModeContext.Provider>
  );
}

export function useViewMode() {
  return useContext(ViewModeContext);
}
