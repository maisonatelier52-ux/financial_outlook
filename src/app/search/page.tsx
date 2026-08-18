import React from 'react';
import { searchArticles } from '@/lib/articles';
import NewsCard from '@/components/NewsCard/NewsCard';
import styles from './page.module.css';
import { Search } from 'lucide-react';

// Required for Next.js App Router when using searchParams
export const dynamic = 'force-dynamic';

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.q || '';
  const results = query ? searchArticles(query) : [];

  return (
    <div className={styles.searchPage}>
      <header className={styles.header}>
        <div className={styles.container}>
          <h1 className={styles.title}>SEARCH newsTimes</h1>
          
          <form className={styles.searchForm} action="/search" method="GET">
            <input 
              type="text" 
              name="q"
              defaultValue={query}
              placeholder="Search by keyword, author, or category..."
              className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>
              <Search size={24} />
            </button>
          </form>

          {query && (
            <p className={styles.resultsCount}>
              {results.length} RESULT{results.length !== 1 ? 'S' : ''} FOR &quot;{query.toUpperCase()}&quot;
            </p>
          )}
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.container}>
          {query && results.length > 0 ? (
            <div className={styles.resultsList}>
              {results.map(article => (
                <NewsCard key={article.id} article={article} variant="horizontal" />
              ))}
            </div>
          ) : query ? (
            <div className={styles.noResults}>
              <h2 className={styles.noResultsTitle}>NOTHING FOUND</h2>
              <p className={styles.noResultsText}>We couldn&apos;t find stories matching your search.</p>
              <p className={styles.noResultsText}>Try another keyword.</p>
            </div>
          ) : (
            <div className={styles.noResults}>
              <p className={styles.noResultsText}>Enter a keyword above to start searching.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
