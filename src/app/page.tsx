import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAllArticles } from '@/lib/articles';
import { getAllAuthors } from '@/lib/authors';
import NewsCard from '@/components/NewsCard/NewsCard';
import styles from './page.module.css';

export default function Home() {
  const allArticles = getAllArticles();
  const allAuthors = getAllAuthors();
  
  const latest = allArticles.slice(0, 6);
  const mainArticle = latest[0];
  const sidebarArticle = latest[1];
  const historicArticle = latest[2];
  const nationalArticle = latest[3];
  const nationalSubArticle = latest[4];
  const schoolArticle = latest[5];

  // New Sections
  const opinionArticles = allArticles.slice(6, 10); // 4 articles for opinion
  const businessAnchor = allArticles[10];
  const businessList = allArticles.slice(11, 14); // 3 articles for business side
  const cultureArticles = allArticles.slice(14, 18); // 4 articles for culture
  
  // More Sections
  const sportsArticles = allArticles.slice(18, 20); // 2 articles for Sports (One big, one small)
  const scienceArticles = allArticles.slice(20, 23); // 3 articles for Science
  const worldArticles = allArticles.slice(23, 27); // 4 articles for World News

  return (
    <div className={styles.page}>
      
      {/* Full width Top Image */}
      <div className={styles.mainArticleImageWrapper}>
        <Image 
          src={mainArticle.photoUrl} 
          alt={mainArticle.headline}
          fill
          className={styles.mainArticleImage}
          priority
        />
      </div>

      <main className={styles.container}>
        
        {/* Top Section */}
        <section className={styles.topSection}>
          
          <h1 className={styles.mainHeadline}>
            <Link href={`/article/${mainArticle.slug}`}>{mainArticle.headline}</Link>
          </h1>
          
          <div className={styles.greenBanner}>
            {mainArticle.excerpt}
          </div>
          
          <div className={styles.topColumns}>
            <div className={styles.mainArticleText}>
              {/* Simulate article body with columns */}
              <p>In a surprising turn of events, experts are now predicting a massive shift in how the industry operates over the next decade. The implications are vast, affecting everything from daily operations to long-term strategic planning. The data paints a clear picture. With investment pouring in at record levels, the sector is poised for unprecedented growth.</p>
              <p>As the situation continues to unfold, one thing is certain: the landscape is changing rapidly. Those who adapt quickly will likely find themselves at a distinct advantage, while those who hesitate may struggle to keep up. Experts advise cautious optimism, as market volatility remains a constant factor.</p>
              <p className={styles.authorLine}>By {mainArticle.author}</p>
            </div>
            
            <aside className={styles.topSidebar}>
              <NewsCard article={sidebarArticle} variant="sidebar" />
            </aside>
          </div>
        </section>

        <hr className={styles.divider} />

        {/* Bottom Section */}
        <section className={styles.bottomSection}>
          <div className={styles.bottomLeft}>
            <div className={styles.historicArticle}>
              <h2 className={styles.secondaryHeadline}>
                <Link href={`/article/${historicArticle.slug}`}>{historicArticle.headline}</Link>
              </h2>
              <div className={styles.twoColumnText}>
                <p>The festival kicked off Saturday morning with a parade that filled Main Street with vibrant floats, marching bands, and costumed participants, drawing cheers from the enthusiastic crowd.</p>
                <p>Local children eagerly collected candy and waved at familiar faces on the floats. As the farmers market, vendors showcased an impressive selection of fresh, homemade goods.</p>
              </div>
              <div className={styles.historicImageWrapper}>
                <Image 
                  src={historicArticle.photoUrl} 
                  alt={historicArticle.headline}
                  fill
                  className={styles.historicImage}
                />
              </div>
            </div>

            <div className={styles.schoolBox}>
              <div className={styles.schoolLogo}>Logo</div>
              <div className={styles.schoolContent}>
                <h3 className={styles.schoolHeadline}>{schoolArticle.headline}</h3>
                <p className={styles.schoolText}>{schoolArticle.excerpt}</p>
              </div>
            </div>
          </div>

          <div className={styles.bottomRight}>
            <div className={styles.nationalBlock}>
              <div className={styles.nationalHeader}>NATIONAL NEWS / CURRENT AFFAIRS</div>
              
              <div className={styles.nationalContent}>
                <h2 className={styles.nationalHeadline}>
                  <Link href={`/article/${nationalArticle.slug}`}>{nationalArticle.headline}</Link>
                </h2>
                <div className={styles.nationalSubHeadline}>{nationalArticle.excerpt}</div>
                
                <div className={styles.nationalColumns}>
                  <div className={styles.nationalText}>
                    <p>The festival kicked off Saturday morning with a parade that filled Main Street with vibrant floats, marching bands, and costumed participants, drawing cheers from the enthusiastic crowd.</p>
                    <p>Local children eagerly collected candy and waved at familiar faces on the floats. As the farmers market, vendors showcased an impressive selection of fresh ingredients.</p>
                    <p className={styles.authorLine}>By {nationalArticle.author}</p>
                  </div>
                  <div className={styles.nationalImageWrapper}>
                    <Image 
                      src={nationalArticle.photoUrl} 
                      alt={nationalArticle.headline}
                      fill
                      className={styles.nationalImage}
                    />
                  </div>
                </div>

                <div className={styles.subArticle}>
                  <h3 className={styles.subArticleHeadline}>{nationalSubArticle.headline}</h3>
                  <div className={styles.subArticleColumns}>
                    <p>The festival kicked off Saturday morning with a parade that filled Main Street with vibrant floats, marching bands, and costumed participants, drawing cheers from the enthusiastic crowd.</p>
                    <p>Local children eagerly collected candy and waved at familiar faces on the floats. As the farmers market, vendors showcased an impressive selection of fresh ingredients.</p>
                  </div>
                  <p className={styles.authorLine}>By {nationalSubArticle.author}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className={styles.dividerThick} />

        {/* OPINION SECTION */}
        <section className={styles.opinionSection}>
          <h2 className={styles.sectionTitle}>Opinion & Editorial</h2>
          <div className={styles.opinionGrid}>
            {opinionArticles.map((article) => {
              const author = allAuthors.find(a => a.name === article.author);
              return (
                <div key={article.id} className={styles.opinionCard}>
                  <div className={styles.opinionAuthor}>
                    <div className={styles.opinionAvatarWrapper}>
                      <Image 
                        src={author?.avatarUrl || '/api/placeholder/400/400'} 
                        alt={article.author}
                        fill
                        className={styles.opinionAvatar}
                      />
                    </div>
                    <span className={styles.opinionAuthorName}>{article.author}</span>
                  </div>
                  <h3 className={styles.opinionHeadline}>
                    <Link href={`/article/${article.slug}`}>{article.headline}</Link>
                  </h3>
                </div>
              );
            })}
          </div>
        </section>

        {/* BUSINESS & MARKETS SECTION */}
        <section className={styles.businessSection}>
          <div className={styles.businessHeader}>BUSINESS & MARKETS</div>
          <div className={styles.businessGrid}>
            <div className={styles.businessAnchor}>
              <div className={styles.businessAnchorImageWrapper}>
                <Image 
                  src={businessAnchor.photoUrl} 
                  alt={businessAnchor.headline}
                  fill
                  className={styles.businessAnchorImage}
                />
              </div>
              <h2 className={styles.businessAnchorHeadline}>
                <Link href={`/article/${businessAnchor.slug}`}>{businessAnchor.headline}</Link>
              </h2>
              <p className={styles.businessAnchorExcerpt}>{businessAnchor.excerpt}</p>
            </div>
            
            <div className={styles.businessList}>
              {businessList.map((article) => (
                <div key={article.id} className={styles.businessListItem}>
                  <h3 className={styles.businessListHeadline}>
                    <Link href={`/article/${article.slug}`}>{article.headline}</Link>
                  </h3>
                  <span className={styles.businessListMeta}>{article.category} | {article.date}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ARTS & CULTURE SECTION */}
        <section className={styles.cultureSection}>
          <h2 className={styles.sectionTitle}>In Pictures: Arts & Culture</h2>
          <div className={styles.cultureGrid}>
            {cultureArticles.map((article) => (
              <div key={article.id} className={styles.cultureCard}>
                <div className={styles.cultureImageWrapper}>
                  <Image 
                    src={article.photoUrl} 
                    alt={article.headline}
                    fill
                    className={styles.cultureImage}
                  />
                </div>
                <h3 className={styles.cultureHeadline}>
                  <Link href={`/article/${article.slug}`}>{article.headline}</Link>
                </h3>
              </div>
            ))}
          </div>
        </section>

        <hr className={styles.dividerThick} />

        {/* SPORTS SECTION */}
        <section className={styles.sportsSection}>
          <h2 className={styles.sectionTitle}>Sports</h2>
          <div className={styles.sportsGrid}>
            <div className={styles.sportsMain}>
              <div className={styles.sportsImageWrapper}>
                <Image 
                  src={sportsArticles[0].photoUrl} 
                  alt={sportsArticles[0].headline}
                  fill
                  className={styles.sportsImage}
                />
              </div>
              <h3 className={styles.sportsHeadline}>
                <Link href={`/article/${sportsArticles[0].slug}`}>{sportsArticles[0].headline}</Link>
              </h3>
              <p className={styles.sportsExcerpt}>{sportsArticles[0].excerpt}</p>
            </div>
            <div className={styles.sportsSidebar}>
              <div className={styles.sportsSidebarCard}>
                <h3 className={styles.sportsSidebarHeadline}>
                  <Link href={`/article/${sportsArticles[1].slug}`}>{sportsArticles[1].headline}</Link>
                </h3>
                <p className={styles.sportsSidebarExcerpt}>{sportsArticles[1].excerpt}</p>
              </div>
            </div>
          </div>
        </section>

        {/* SCIENCE & HEALTH SECTION */}
        <section className={styles.scienceSection}>
          <div className={styles.scienceHeader}>Science & Health</div>
          <div className={styles.scienceGrid}>
            <div className={styles.scienceList}>
              {scienceArticles.map((article) => (
                <div key={article.id} className={styles.scienceListItem}>
                  <span className={styles.scienceCategory}>{article.category}</span>
                  <h3 className={styles.scienceListHeadline}>
                    <Link href={`/article/${article.slug}`}>{article.headline}</Link>
                  </h3>
                </div>
              ))}
            </div>
            <div className={styles.scienceFeatured}>
              <div className={styles.scienceImageWrapper}>
                <Image 
                  src={scienceArticles[0].photoUrl} 
                  alt="Featured Science"
                  fill
                  className={styles.scienceImage}
                />
              </div>
            </div>
          </div>
        </section>

        {/* WORLD NEWS (WEEK IN REVIEW) */}
        <section className={styles.worldSection}>
          <h2 className={styles.sectionTitleCentered}>The Week in Review</h2>
          <div className={styles.worldGrid}>
            {worldArticles.map((article) => (
              <div key={article.id} className={styles.worldCard}>
                <h3 className={styles.worldHeadline}>
                  <Link href={`/article/${article.slug}`}>{article.headline}</Link>
                </h3>
                <p className={styles.worldExcerpt}>{article.excerpt}</p>
                <div className={styles.worldAuthor}>By {article.author}</div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
