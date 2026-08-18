"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Menu } from 'lucide-react';
import styles from './Header.module.css';
import Navigation from '../Navigation/Navigation';

interface HeaderProps {
  latestNews: { headline: string; slug: string }[];
}

const Header: React.FC<HeaderProps> = ({ latestNews }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000); // Update every second
    return () => clearInterval(timer);
  }, []);

  // Format date like 25.SEPTEMBER.20XX
  const formattedDate = currentTime 
    ? `${currentTime.getDate()}.${currentTime.toLocaleString('en-US', { month: 'long' }).toUpperCase()}.${currentTime.getFullYear()}`
    : '';
    
  const formattedTime = currentTime
    ? currentTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : '';

  return (
    <header className={styles.header}>
      <div className={styles.flashNewsContainer}>
        <div className={styles.flashNewsTicker}>
          <div className={styles.tickerContent}>
            {latestNews.map((item, i) => (
              <span key={`first-${i}`} className={styles.newsItem}>
                <Link href={`/article/${item.slug}`} className={styles.newsLink}>
                  {item.headline}
                </Link>
                <span className={styles.bullet}>&bull;</span>
              </span>
            ))}
          </div>
          <div className={styles.tickerContent}>
            {latestNews.map((item, i) => (
              <span key={`second-${i}`} className={styles.newsItem}>
                <Link href={`/article/${item.slug}`} className={styles.newsLink}>
                  {item.headline}
                </Link>
                <span className={styles.bullet}>&bull;</span>
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.container}>
        
        <div className={styles.logoContainer}>
          <div className={styles.timeDisplay}>{formattedTime}</div>
          <Link href="/" className={styles.logo}>
            NEWS TIMES
          </Link>
          <div className={styles.dateDisplay}>{formattedDate}</div>
        </div>

        <nav className={styles.categoriesNav}>
          <Link href="/">Home</Link>
          <span className={styles.separator}>|</span>
          <Link href="/search?q=finance">Finance</Link>
          <span className={styles.separator}>|</span>
          <Link href="/search?q=technology">Technology</Link>
          <span className={styles.separator}>|</span>
          <Link href="/search?q=market">Market</Link>
          <span className={styles.separator}>|</span>
          <Link href="/search?q=sports">Sports</Link>
          <span className={styles.separator}>|</span>
          <Link href="/search?q=business">Business</Link>
        </nav>
        
      </div>
    </header>
  );
};

export default Header;
