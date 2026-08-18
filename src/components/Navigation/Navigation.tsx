"use client";

import React, { useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import styles from './Navigation.module.css';

interface NavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const CATEGORIES = [
  "US News", "World", "Politics", "Business", "Technology",
  "Science", "Health", "Culture", "Climate", "Opinion"
];

const SECONDARY_LINKS = [
  { name: "Authors", href: "/authors" },
  { name: "About", href: "/info/about-us" },
  { name: "Editorial Standards", href: "/info/editorial-policy" },
  { name: "Contact", href: "/info/contact-us" }
];

const Navigation: React.FC<NavigationProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`}>
      <div className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.news}>news</span>
          <span className={styles.times}>Times</span>
        </div>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close Navigation">
          <span className={styles.closeText}>CLOSE</span>
          <X size={24} />
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.mainNav}>
          <div className={styles.navGrid}>
            {CATEGORIES.map((category, index) => (
              <Link 
                href={`/search?q=${encodeURIComponent(category.toLowerCase())}`} 
                key={category} 
                className={styles.navLink}
                onClick={onClose}
              >
                <span className={styles.navNumber}>{(index + 1).toString().padStart(2, '0')}</span>
                {category}
              </Link>
            ))}
          </div>
        </div>
        
        <div className={styles.secondaryNav}>
          <h3 className={styles.secondaryTitle}>EXPLORE</h3>
          <ul className={styles.secondaryList}>
            {SECONDARY_LINKS.map(link => (
              <li key={link.name}>
                <Link href={link.href} className={styles.secondaryLink} onClick={onClose}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
