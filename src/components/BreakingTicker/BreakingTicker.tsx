import React from 'react';
import styles from './BreakingTicker.module.css';

interface BreakingTickerProps {
  items: string[];
}

const BreakingTicker: React.FC<BreakingTickerProps> = ({ items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className={styles.tickerContainer}>
      <div className={styles.label}>BREAKING</div>
      <div className={styles.tickerWrapper}>
        <div className={styles.tickerTrack}>
          {/* Duplicate items for seamless infinite scroll */}
          {[...items, ...items, ...items].map((item, index) => (
            <div key={index} className={styles.tickerItem}>
              <span className={styles.bullet}>•</span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BreakingTicker;
