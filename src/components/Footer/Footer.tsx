import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

const EXPLORE_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Authors', href: '/authors' },
  { name: 'Search', href: '/search' }
];

const SECTIONS = [
  { name: 'Finance', href: '/search?q=finance' },
  { name: 'Technology', href: '/search?q=technology' },
  { name: 'Market', href: '/search?q=market' },
  { name: 'Sports', href: '/search?q=sports' },
  { name: 'Business', href: '/search?q=business' }
];

const STANDARDS_LINKS = [
  { name: 'Editorial Policy', href: '/info/editorial-policy' },
  { name: 'Corrections Policy', href: '/info/corrections-policy' },
  { name: 'Source Methodology', href: '/info/source-methodology' },
  { name: 'Right of Reply', href: '/info/right-of-reply' }
];

const COMPANY_LINKS = [
  { name: 'About Us', href: '/info/about-us' },
  { name: 'Contact Us', href: '/info/contact-us' },
  { name: 'Ownership & Funding', href: '/info/ownership-funding' },
  { name: 'Advertising Policy', href: '/info/advertising-policy' },
  { name: 'Privacy Policy', href: '/info/privacy-policy' },
  { name: 'Terms & Conditions', href: '/info/terms-conditions' },
  { name: 'Legal', href: '/info/legal' }
];

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              NEWS TIMES
            </Link>
            <p className={styles.quote}>Independent journalism for a world in motion.</p>
          </div>
        </div>
        
        <div className={styles.navigationSection}>
          <div className={styles.navColumn}>
            <h4 className={styles.columnTitle}>EXPLORE</h4>
            <ul className={styles.navList}>
              {EXPLORE_LINKS.map(link => (
                <li key={link.name}><Link href={link.href}>{link.name}</Link></li>
              ))}
            </ul>
          </div>
          
          <div className={styles.navColumn}>
            <h4 className={styles.columnTitle}>SECTIONS</h4>
            <ul className={`${styles.navList} ${styles.twoColumns}`}>
              {SECTIONS.map(link => (
                <li key={link.name}><Link href={link.href}>{link.name}</Link></li>
              ))}
            </ul>
          </div>
          
          <div className={styles.navColumn}>
            <h4 className={styles.columnTitle}>STANDARDS</h4>
            <ul className={styles.navList}>
              {STANDARDS_LINKS.map(link => (
                <li key={link.name}><Link href={link.href}>{link.name}</Link></li>
              ))}
            </ul>
          </div>
          
          <div className={styles.navColumn}>
            <h4 className={styles.columnTitle}>COMPANY</h4>
            <ul className={styles.navList}>
              {COMPANY_LINKS.map(link => (
                <li key={link.name}><Link href={link.href}>{link.name}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.bottomSection}>
          <p className={styles.copyright}>© 2026 newsTimes<br/>ALL RIGHTS RESERVED</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
