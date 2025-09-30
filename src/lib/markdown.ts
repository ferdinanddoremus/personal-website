import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

export interface Post {
  slug: string;
  title: string;
  date?: string;
  excerpt?: string;
  content: string;
  [key: string]: any;
}

const postsDirectory = path.join(process.cwd(), './private/content/writings');

export async function getPost(slug: string): Promise<Post | null> {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    
    const { data, content } = matter(fileContents);
    
    // Convert markdown to HTML
    const processedContent = await remark()
      .use(remarkHtml)
      .process(content);
    
    return {
      slug,
      content: processedContent.toString(),
      title: data.title || slug,
      date: data.date,
      excerpt: data.excerpt,
      ...data
    };
  } catch (error) {
    return null;
  }
}

export function getAllPosts(): Post[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      console.error(`Posts directory does not exist: ${postsDirectory}`);
      return [];
    }
    
    const fileNames = fs.readdirSync(postsDirectory);
    const posts: Post[] = [];
    
    for (const fileName of fileNames) {
      if (fileName.endsWith('.md')) {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        
        posts.push({
          slug,
          content: content,
          title: data.title || slug,
          date: data.date,
          excerpt: data.excerpt,
          ...data
        });
      }
    }
    
    // Sort posts by date (newest first)
    return posts.sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      return 0;
    });
  } catch (error) {
    return [];
  }
}