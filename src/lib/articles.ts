import fs from 'fs';
import path from 'path';

export interface Article {
  id: string;
  slug: string;
  headline: string;
  excerpt: string;
  author: string;
  category: string;
  date: string;
  time: string;
  photoUrl: string;
  content: { type: string; text: string }[];
}

export function getAllArticles(): Article[] {
  const dataPath = path.join(process.cwd(), 'public', 'data', 'articles.json');
  try {
    const fileContents = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Failed to read articles data', error);
    return [];
  }
}

export function getArticleBySlug(slug: string): Article | undefined {
  const articles = getAllArticles();
  return articles.find((article) => article.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  const articles = getAllArticles();
  return articles.filter((article) => article.category === category);
}

export function getArticlesByAuthor(author: string): Article[] {
  const articles = getAllArticles();
  return articles.filter((article) => article.author === author);
}

export function searchArticles(query: string): Article[] {
  const articles = getAllArticles();
  const lowerQuery = query.toLowerCase();
  return articles.filter((article) => 
    article.headline.toLowerCase().includes(lowerQuery) ||
    article.excerpt.toLowerCase().includes(lowerQuery) ||
    article.category.toLowerCase().includes(lowerQuery) ||
    article.author.toLowerCase().includes(lowerQuery)
  );
}

export function getRelatedArticles(article: Article, limit: number = 4): Article[] {
  const articles = getArticlesByCategory(article.category);
  return articles.filter((a) => a.id !== article.id).slice(0, limit);
}
