import { writeFileSync } from 'fs';
import { join } from 'path';
import { getAllPosts } from '../src/lib/markdown.js';

const DOMAIN = 'https://grorem.us';

const staticPages = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/writings', priority: 0.8, changefreq: 'weekly' },
  { path: '/projects', priority: 0.7, changefreq: 'monthly' },
  { path: '/dubsiren', priority: 0.6, changefreq: 'monthly' },
];

function generateSitemap() {
  const posts = getAllPosts();

  const urls = [
    ...staticPages.map(page => ({
      loc: `${DOMAIN}${page.path}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: page.changefreq,
      priority: page.priority,
    })),
    ...posts.map(post => ({
      loc: `${DOMAIN}/writings/${post.slug}`,
      lastmod: post.date ? new Date(post.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.7,
    })),
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  const publicDir = join(process.cwd(), 'public');
  const sitemapPath = join(publicDir, 'sitemap.xml');

  writeFileSync(sitemapPath, sitemap);
  console.log(`✓ Generated sitemap with ${urls.length} URLs at ${sitemapPath}`);
}

generateSitemap();
