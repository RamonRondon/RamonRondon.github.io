import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://ramonrondon.com';
const rootDir = path.resolve();
const distDir = path.join(rootDir, 'dist');
const postsListFile = path.join(rootDir, 'public/posts.json');

// Static pages with their priority and change frequency
const staticPages = [
  { url: '/',            changefreq: 'monthly',  priority: '1.0' },
  { url: '/about.html',  changefreq: 'monthly',  priority: '0.8' },
  { url: '/blog.html',   changefreq: 'weekly',   priority: '0.9' },
];

function escapeXml(str) {
  return str.replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&apos;');
}

function toW3CDate(dateStr) {
  // Convert YYYY-MM-DD to W3C format
  return dateStr || new Date().toISOString().split('T')[0];
}

function main() {
  try {
    const today = new Date().toISOString().split('T')[0];

    // Build static page entries
    const entries = staticPages.map(page => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`);

    // Build dynamic blog post entries
    if (fs.existsSync(postsListFile)) {
      const postsList = JSON.parse(fs.readFileSync(postsListFile, 'utf-8'));

      for (const post of postsList) {
        const lastmod = toW3CDate(post.date);
        entries.push(`  <url>
    <loc>${SITE_URL}/posts/${escapeXml(post.slug)}.html</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>`);
      }
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join('\n')}
</urlset>
`;

    // Write to dist/
    const outputPath = path.join(distDir, 'sitemap.xml');
    fs.writeFileSync(outputPath, sitemap, 'utf-8');
    console.log(`Sitemap generated: dist/sitemap.xml (${entries.length} URLs)`);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

main();
