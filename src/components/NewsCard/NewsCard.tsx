import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import styles from './NewsCard.module.css';
import { Article } from '@/lib/articles';

interface NewsCardProps {
  article: Article;
  variant?: 'featured' | 'standard' | 'compact' | 'horizontal' | 'minimal' | 'overlay' | 'masonry' | 'sidebar';
}

const NewsCard: React.FC<NewsCardProps> = ({ article, variant = 'standard' }) => {
  if (!article) return null;

  return (
    <article className={`${styles.card} ${styles[variant]}`}>
      <Link href={`/article/${article.slug}`} className={styles.link}>
        
        {variant !== 'minimal' && (
          <div className={styles.imageWrapper}>
            <Image 
              src={article.photoUrl} 
              alt={article.headline}
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}

        <div className={styles.content}>
          <div className={styles.meta}>
            <span className={styles.category}>{article.category}</span>
            {variant !== 'compact' && variant !== 'minimal' && variant !== 'masonry' && (
              <>
                <span className={styles.separator}></span>
                <span className={styles.time}>{article.time}</span>
              </>
            )}
          </div>
          
          <h2 className={styles.headline}>{article.headline}</h2>
          
          {(variant === 'featured' || variant === 'standard' || variant === 'horizontal' || variant === 'overlay') && (
            <p className={styles.excerpt}>{article.excerpt}</p>
          )}
          
          {(variant === 'featured' || variant === 'overlay' || variant === 'horizontal') && (
            <div className={styles.authorMeta}>
              <span className={styles.author}>By {article.author}</span>
            </div>
          )}

          {variant === 'horizontal' && (
            <div className={styles.arrowIcon}>
              <ArrowRight size={18} />
            </div>
          )}
        </div>
      </Link>
    </article>
  );
};

export default NewsCard;
