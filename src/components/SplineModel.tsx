'use client';

import { useEffect } from 'react';

export const SplineModel = () => {
  useEffect(() => {
    // Load the Spline viewer script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@splinetool/viewer@1.10.99/build/spline-viewer.js';
    script.type = 'module';
    script.async = true;
    
    // Create the Spline viewer element
    const splineViewer = document.createElement('spline-viewer');
    splineViewer.setAttribute('url', 'https://prod.spline.design/zChGX7xTEslLRtDy/scene.splinecode');
    
    // Add to the container
    const container = document.getElementById('spline-container');
    if (container) {
      container.appendChild(splineViewer);
    }
    
    // Add the script to the document
    document.body.appendChild(script);
    
    // Cleanup
    return () => {
      if (container && container.contains(splineViewer)) {
        container.removeChild(splineViewer);
      }
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <div 
      id="spline-container"
      className="w-full h-full min-h-[60vh] relative z-10"
    />
  );
};

export default SplineModel;
