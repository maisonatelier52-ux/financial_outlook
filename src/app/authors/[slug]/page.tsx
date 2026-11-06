import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Mail, Globe } from 'lucide-react';
import { getAllAuthors, getAuthorWithArticles } from '@/lib/authors';
import NewsCard from '@/components/NewsCard/NewsCard';
import styles from './page.module.css';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const authors = getAllAuthors();
  return authors.map((author) => ({
    slug: author.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = getAuthorWithArticles(slug);
  
  if (!data) return { title: 'Author Not Found' };
  
  return {
    title: `${data.author.name} | Financial Outlook`,
    description: data.author.biography,
  };
}

export default async function AuthorProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = getAuthorWithArticles(slug);

  if (!data) {
    notFound();
  }

  const { author, articles } = data;

  return (
    <div className={styles.authorPage}>
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.profileGrid}>
            <div className={styles.imageColumn}>
              <div className={styles.imageWrapper}>
                <Image 
                  src={author.avatarUrl} 
                  alt={author.name}
                  fill
                  className={styles.image}
                  priority
                />
              </div>
            </div>
            
            <div className={styles.infoColumn}>
              <h1 className={styles.name}>{author.name}</h1>
              <p className={styles.role}>{author.role}</p>
              
              <div className={styles.contact}>
                <a href={`mailto:${author.email}`} className={styles.contactLink}>
                  <Mail size={16} />
                  <span>Email</span>
                </a>
                <a href={author.website} target="_blank" rel="noopener noreferrer" className={styles.contactLink}>
                  <Globe size={16} />
                  <span>Website</span>
                </a>
              </div>
              
              <div className={styles.bio}>
                <p>{author.biography}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>LATEST FROM {author.name.toUpperCase()}</h2>
          <div className={styles.divider}></div>
          
          {articles.length > 0 ? (
            <div className={styles.articlesGrid}>
              {articles.map((article, index) => (
                <NewsCard 
                  key={article.id} 
                  article={article} 
                  variant={index === 0 ? 'featured' : 'standard'} 
                />
              ))}
            </div>
          ) : (
            <p className={styles.noArticles}>This author has not published any articles yet.</p>
          )}
        </div>
      </main>
    </div>
  );
}
