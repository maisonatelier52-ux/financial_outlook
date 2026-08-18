"use client";

import React, { useEffect, useState } from 'react';
import styles from './ReadingProgress.module.css';

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      
      if (winHeightPx > 0) {
        const scrolled = (scrollPx / winHeightPx) * 100;
        setProgress(scrolled);
      } else {
        setProgress(0);
      }
    };

    window.addEventListener('scroll', updateProgress);
    // Initial check
    updateProgress();

    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  if (progress === 0) return null;

  return (
    <div className={styles.progressContainer}>
      <div 
        className={styles.progressBar} 
        style={{ width: `${progress}%` }} 
      />
    </div>
  );
};

export default ReadingProgress;
