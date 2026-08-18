import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getArticleBySlug, getRelatedArticles, getAllArticles } from '@/lib/articles';
import { getAuthorBySlug } from '@/lib/authors';
import styles from './page.module.css';
import ShareButtons from '@/components/ShareButtons/ShareButtons';
import NewsCard from '@/components/NewsCard/NewsCard';
import { Metadata } from 'next';

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  
  if (!article) return { title: 'Article Not Found' };
  
  return {
    title: `${article.headline} | newsTimes`,
    description: article.excerpt,
    openGraph: {
      title: article.headline,
      description: article.excerpt,
      images: [article.photoUrl],
    }
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = getRelatedArticles(article, 4);
  
  // Find author slug for link
  // The generate script creates slug from name: name.toLowerCase().replace(/\s+/g, '-')
  const authorSlug = article.author.toLowerCase().replace(/\s+/g, '-');
  const author = getAuthorBySlug(authorSlug);

  return (
    <article className={styles.articlePage}>
      {/* Article Header */}
      <header className={styles.header}>
        <div className={styles.container}>
          <div className={styles.categoryBadge}>
            <Link href={`/search?q=${article.category.toLowerCase()}`}>{article.category}</Link>
          </div>
          
          <h1 className={styles.headline}>{article.headline}</h1>
          <p className={styles.excerpt}>{article.excerpt}</p>
          
          <div className={styles.metaRow}>
            <div className={styles.authorInfo}>
              By <Link href={`/authors/${authorSlug}`} className={styles.authorLink}>{article.author}</Link>
              {author && <span className={styles.authorRole}>{author.role}</span>}
            </div>
            <div className={styles.dateTime}>
              <span>{article.date}</span>
              <span className={styles.dot}>•</span>
              <span>{article.time}</span>
              <span className={styles.dot}>•</span>
              <span>5 min read</span>
            </div>
          </div>
        </div>
      </header>

      {/* Featured Image */}
      <div className={styles.featuredImageWrapper}>
        <Image 
          src={article.photoUrl} 
          alt={article.headline}
          fill
          className={styles.featuredImage}
          priority
        />
      </div>

      {/* Article Body Layout */}
      <div className={styles.bodyLayout}>
        <div className={styles.container}>
          <div className={styles.grid}>
            
            <aside className={styles.sidebar}>
              <ShareButtons url={`/article/${article.slug}`} title={article.headline} />
            </aside>

            <div className={styles.content}>
              {article.content.map((block, index) => {
                if (block.type === 'paragraph') {
                  // Add drop cap to first paragraph
                  return (
                    <p key={index} className={`${styles.paragraph} ${index === 0 ? styles.dropCap : ''}`}>
                      {block.text}
                    </p>
                  );
                } else if (block.type === 'h2') {
                  return <h2 key={index} className={styles.subheading}>{block.text}</h2>;
                }
                return null;
              })}
              
              <hr className={styles.endSeparator} />
              
              {author && (
                <div className={styles.authorBioBox}>
                  <Image 
                    src={author.avatarUrl} 
                    alt={author.name}
                    width={80}
                    height={80}
                    className={styles.authorAvatar}
                  />
                  <div className={styles.authorBioContent}>
                    <h4 className={styles.authorBioName}>{author.name}</h4>
                    <p className={styles.authorBioText}>{author.biography}</p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>

      {/* Related News */}
      {relatedArticles.length > 0 && (
        <section className={styles.relatedSection}>
          <div className={styles.relatedContainer}>
            <div className={styles.relatedHeader}>
              <h3 className={styles.relatedTitle}>MORE FROM {article.category.toUpperCase()}</h3>
              <div className={styles.relatedLine}></div>
            </div>
            <div className={styles.relatedGrid}>
              {relatedArticles.map((relArticle, index) => (
                <NewsCard 
                  key={relArticle.id} 
                  article={relArticle} 
                  variant="compact"
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
