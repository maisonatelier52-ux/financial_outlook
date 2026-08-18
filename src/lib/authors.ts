import fs from 'fs';
import path from 'path';
import { getArticlesByAuthor, Article } from './articles';

export interface Author {
  id: string;
  name: string;
  slug: string;
  role: string;
  biography: string;
  email: string;
  website: string;
  avatarUrl: string;
}

export function getAllAuthors(): Author[] {
  const dataPath = path.join(process.cwd(), 'public', 'data', 'authors.json');
  try {
    const fileContents = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Failed to read authors data', error);
    return [];
  }
}

export function getAuthorBySlug(slug: string): Author | undefined {
  const authors = getAllAuthors();
  return authors.find((author) => author.slug === slug);
}

export function getAuthorWithArticles(slug: string): { author: Author; articles: Article[] } | null {
  const author = getAuthorBySlug(slug);
  if (!author) return null;
  
  const articles = getArticlesByAuthor(author.name);
  return { author, articles };
}
