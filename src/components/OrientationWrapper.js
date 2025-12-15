"use client";
import { useViewMode } from "./ViewModeContext";
import { useEffect, useState } from "react";

export default function OrientationWrapper({ children }) {
  const { isMobile, isLandscape, viewMode } = useViewMode();
  
  // We rotate ONLY if:
  // 1. It is a mobile device
  // 2. We are in Portrait mode (!isLandscape)
  // 3. User specifically requested "Desktop View"
  const shouldRotate = isMobile && !isLandscape && viewMode === 'desktop';

  if (shouldRotate) {
    return (
      <div 
        style={{
            transform: 'rotate(90deg)',
            transformOrigin: 'bottom left',
            position: 'absolute',
            top: '-100vw', 
            left: '0',
            width: '100vh',
            height: '100vw',
            overflowX: 'hidden',
            overflowY: 'auto',
            background: 'black' // Match theme
        }}
        className="force-landscape"
      >
        {children}
      </div>
    );
  }

  return <>{children}</>;
}
