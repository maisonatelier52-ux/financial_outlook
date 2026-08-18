import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import styles from './StoryRail.module.css';
import { Article } from '@/lib/articles';

interface StoryRailProps {
  title: string;
  articles: Article[];
}

const StoryRail: React.FC<StoryRailProps> = ({ title, articles }) => {
  if (!articles || articles.length === 0) return null;

  return (
    <section className={styles.railSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.line}></div>
        </div>
        
        <div className={styles.railContainer}>
          <div className={styles.rail}>
            {articles.map((article) => (
              <Link href={`/article/${article.slug}`} key={article.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <Image 
                    src={article.photoUrl} 
                    alt={article.headline}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 80vw, 25vw"
                  />
                </div>
                <div className={styles.content}>
                  <div className={styles.meta}>
                    <span className={styles.category}>{article.category}</span>
                    <span className={styles.separator}></span>
                    <span className={styles.time}>{article.time}</span>
                  </div>
                  <h3 className={styles.headline}>{article.headline}</h3>
                  <div className={styles.arrowIcon}>
                    <ArrowRight size={18} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryRail;
