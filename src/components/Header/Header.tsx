import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Menu, X } from 'lucide-react';
import styles from './Header.module.css';
import Navigation from '../Navigation/Navigation';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  const formattedDate = currentTime 
    ? currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
    : '';
    
  const formattedTime = currentTime
    ? currentTime.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', second: '2-digit' })
    : '';

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
        <div className={styles.container}>
          <div className={styles.left}>
            <button 
              className={styles.menuButton}
              onClick={() => setIsNavOpen(true)}
              aria-label="Open Navigation Menu"
            >
              <Menu size={20} />
              <span className={styles.menuText}>MENU</span>
            </button>
          </div>

          <div className={styles.center}>
            <Link href="/" className={styles.logo}>
              <span className={styles.news}>news</span>
              <span className={styles.times}>Times</span>
            </Link>
          </div>

          <div className={styles.right}>
            <div className={`${styles.searchContainer} ${isSearchOpen ? styles.searchOpen : ''}`}>
              <form onSubmit={handleSearchSubmit} className={styles.searchForm}>
                <input 
                  type="text" 
                  placeholder="Search newsTimes..."
                  className={styles.searchInput}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onBlur={() => !searchQuery && setIsSearchOpen(false)}
                  ref={(input) => isSearchOpen && input?.focus()}
                />
              </form>
              <button 
                className={styles.searchButton}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            </div>
            <div className={styles.dateTime}>
              <span className={styles.date}>{formattedDate}</span>
              <span className={styles.time}>{formattedTime}</span>
            </div>
          </div>
        </div>
      </header>

      <Navigation isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
    </>
  );
};

export default Header;
