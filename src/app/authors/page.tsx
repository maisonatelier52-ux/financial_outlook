import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Globe } from 'lucide-react';
import { getAllAuthors } from '@/lib/authors';
import styles from './page.module.css';

export const metadata = {
  title: 'Our Columnists | newsTimes',
  description: 'The editorial board, reporting, and shaping the stories behind newsTimes.',
};

export default function AuthorsPage() {
  const authors = getAllAuthors();

  return (
    <div className={styles.authorsPage}>
      <header className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroLine}></div>
          <h1 className={styles.heroTitle}>OUR COLUMNISTS</h1>
          <div className={styles.heroLineThick}></div>
          <p className={styles.heroSubtitle}>
            The editorial board, reporting, investigating and shaping the stories behind newsTimes.
          </p>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.authorList}>
          {authors.map((author) => (
            <article key={author.id} className={styles.authorCard}>
              <div className={styles.authorHeader}>
                <div className={styles.imageWrapper}>
                  <Image 
                    src={author.avatarUrl} 
                    alt={author.name}
                    fill
                    className={styles.image}
                    sizes="120px"
                  />
                </div>
                <div className={styles.authorTitleInfo}>
                  <Link href={`/authors/${author.slug}`}>
                    <h2 className={styles.name}>{author.name}</h2>
                  </Link>
                  <p className={styles.role}>{author.role}</p>
                  
                  <div className={styles.contact}>
                    <a href={`mailto:${author.email}`} aria-label="Email author" className={styles.iconLink}>
                      <Mail size={16} />
                    </a>
                    <a href={author.website} target="_blank" rel="noopener noreferrer" aria-label="Author website" className={styles.iconLink}>
                      <Globe size={16} />
                    </a>
                  </div>
                </div>
              </div>
              <div className={styles.bioWrapper}>
                <p className={styles.bio}>
                  <span className={styles.dropCap}>{author.biography.charAt(0)}</span>
                  {author.biography.slice(1)}
                </p>
              </div>
            </article>
          ))}
        </div>
      </main>
    </div>
  );
}
