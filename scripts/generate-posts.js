import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

const isDev = process.argv.includes('--dev');

const rootDir = path.resolve();
const postsDir = path.join(rootDir, 'public/posts');
const postsListFile = path.join(rootDir, 'public/posts.json');

// En desarrollo usamos el post.html original; en producción, el dist/post.html compilado por Vite
const postTemplateFile = isDev 
  ? path.join(rootDir, 'post.html') 
  : path.join(rootDir, 'dist/post.html');

const outputDir = isDev 
  ? path.join(rootDir, 'posts') 
  : path.join(rootDir, 'dist/posts');

async function main() {
  try {
    if (!fs.existsSync(postTemplateFile)) {
      if (isDev) {
        console.error('Error: El archivo post.html de origen no existe.');
      } else {
        console.error('Error: dist/post.html no existe. Por favor, corre vite build primero.');
      }
      process.exit(1);
    }

    const template = fs.readFileSync(postTemplateFile, 'utf-8');
    const postsList = JSON.parse(fs.readFileSync(postsListFile, 'utf-8'));

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    for (const postInfo of postsList) {
      const slug = postInfo.slug;
      const postJsonFile = path.join(postsDir, `${slug}.json`);
      if (!fs.existsSync(postJsonFile)) {
        console.warn(`Advertencia: Archivo JSON no encontrado para el post: ${postJsonFile}`);
        continue;
      }

      const postData = JSON.parse(fs.readFileSync(postJsonFile, 'utf-8'));
      const contentHtml = await marked.parse(postData.content || '');

      // Formatear fecha al estilo español
      const dateObj = new Date(postData.date + 'T00:00:00');
      const formattedDate = dateObj.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      let html = template;

      // 1. Reemplazar título
      html = html.replace(
        '<title>Artículo | Ramón Rondón Montañez</title>',
        `<title>${postData.title} | Blog Ramón Rondón</title>`
      );

      // 2. Reemplazar meta descripción y metadatos SEO
      const excerptText = postData.excerpt || 'Artículo en el blog de Ramón Rondón.';
      html = html.replace(
        '<meta name="description" content="Lee los últimos artículos en el blog de Ramón Rondón. Análisis sobre la intersección entre matemáticas y emprendimiento.">',
        `<meta name="description" content="${excerptText}">`
      );

      // Enlaces canónicos
      html = html.replace(
        '<link rel="canonical" href="https://ramonrondon.com/post.html">',
        `<link rel="canonical" href="https://ramonrondon.com/posts/${slug}.html">`
      );
      html = html.replace(
        '<meta property="og:url" content="https://ramonrondon.com/post.html">',
        `<meta property="og:url" content="https://ramonrondon.com/posts/${slug}.html">`
      );
      html = html.replace(
        '<meta name="twitter:url" content="https://ramonrondon.com/post.html">',
        `<meta name="twitter:url" content="https://ramonrondon.com/posts/${slug}.html">`
      );

      // Títulos OG / Twitter
      html = html.replace(
        '<meta property="og:title" content="Artículo | Blog Ramón Rondón">',
        `<meta property="og:title" content="${postData.title} | Blog Ramón Rondón">`
      );
      html = html.replace(
        '<meta name="twitter:title" content="Artículo | Blog Ramón Rondón">',
        `<meta name="twitter:title" content="${postData.title} | Blog Ramón Rondón">`
      );

      // Descripciones OG / Twitter
      html = html.replace(
        '<meta property="og:description" content="Lee los últimos artículos en el blog de Ramón Rondón. Análisis sobre la intersección entre matemáticas y emprendimiento.">',
        `<meta property="og:description" content="${excerptText}">`
      );
      html = html.replace(
        '<meta name="twitter:description" content="Lee los últimos artículos en el blog de Ramón Rondón. Análisis sobre la intersección entre matemáticas y emprendimiento.">',
        `<meta name="twitter:description" content="${excerptText}">`
      );

      // 2b. Replace JSON-LD Article structured data
      html = html.replace(
        '"headline": "Título del Artículo"',
        `"headline": "${postData.title.replace(/"/g, '\\"')}"`
      );
      html = html.replace(
        '"datePublished": "2026-01-01"',
        `"datePublished": "${postData.date}"`
      );
      html = html.replace(
        '"@id": "https://ramonrondon.com/post.html"',
        `"@id": "https://ramonrondon.com/posts/${slug}.html"`
      );

      // 3. Ocultar spinner y mostrar cuerpo del artículo
      html = html.replace(
        'style="text-align: center; padding: var(--space-12) 0;" id="loading-spinner"',
        'style="text-align: center; padding: var(--space-12) 0; display: none;" id="loading-spinner"'
      );
      html = html.replace(
        'id="article-body" style="display: none;"',
        'id="article-body" style="display: block;"'
      );

      // 4. Inyectar detalles del artículo
      let renderedContentHtml = contentHtml;
      let bodyClasses = 'post-body';
      const isAcrostic = !!postData.isAcrostic || (postData.category && postData.category.toLowerCase().includes('acrostic'));
      if (isAcrostic) {
        bodyClasses += ' is-acrostic';
        renderedContentHtml = applyAcrosticFormatting(renderedContentHtml);
      }
      if (postData.isPoem) {
        bodyClasses += ' is-poem';
      }
      html = html.replace(
        '<section class="post-body" id="article-content">',
        `<section class="${bodyClasses}" id="article-content">`
      );

      html = html.replace(
        '<span class="post-meta-tag" id="article-category">Categoría</span>',
        `<span class="post-meta-tag" id="article-category">${postData.category}</span>`
      );
      html = html.replace(
        '<h1 class="post-title" id="article-title">Título del Artículo</h1>',
        `<h1 class="post-title" id="article-title">${postData.title}</h1>`
      );
      html = html.replace(
        '<span id="article-date">Fecha</span>',
        `<span id="article-date">${formattedDate}</span>`
      );
      html = html.replace(
        '<!-- Markdown injection target -->',
        () => renderedContentHtml
      );

      // 5. Ajustar rutas relativas de assets y páginas para que apunten a la carpeta padre (../)
      if (isDev) {
        // En desarrollo, las rutas a los archivos fuente son ./src/
        html = html.replace(/src="\.\/src\//g, 'src="../src/');
        html = html.replace(/href="\.\/src\//g, 'href="../src/');
        // Las imágenes de public/assets deben apuntar a ../public/assets/ en desarrollo
        html = html.replace(/src="\.\/assets\//g, 'src="../public/assets/');
      } else {
        // En producción, las rutas compiladas son ./assets/
        html = html.replace(/src="\.\/assets\//g, 'src="../assets/');
        html = html.replace(/href="\.\/assets\//g, 'href="../assets/');
      }
      html = html.replace(/href="index\.html/g, 'href="../index.html');
      html = html.replace(/href="about\.html/g, 'href="../about.html');
      html = html.replace(/href="blog\.html/g, 'href="../blog.html');
      html = html.replace(/href="admin\.html/g, 'href="../admin.html');

      // Guardar el archivo HTML estático final
      const outputFile = path.join(outputDir, `${slug}.html`);
      fs.writeFileSync(outputFile, html, 'utf-8');
      console.log(`Generado (${isDev ? 'Dev' : 'Prod'}): ${isDev ? 'posts' : 'dist/posts'}/${slug}.html`);
    }

    console.log(`¡La pre-generación estática de posts (${isDev ? 'Dev' : 'Prod'}) ha finalizado con éxito!`);
  } catch (error) {
    console.error('Error durante la generación de posts:', error);
    process.exit(1);
  }
}

main();

function applyAcrosticFormatting(html) {
  if (!html) return html;
  return html.replace(/<p>([\s\S]*?)<\/p>/gi, (pMatch, pContent) => {
    const lines = pContent.split('\n');
    let letterCount = 0;
    const formattedLines = lines.map(line => {
      const trimmed = line.trimStart();
      if (!trimmed) return line;
      if (/^(autor|escrito|by|poeta)\b/i.test(trimmed.replace(/<[^>]*>/g, ''))) {
        return line;
      }
      const match = line.match(/^(\s*)(<[a-z0-9]+[^>]*>)?([A-Za-zÀ-ÖØ-öø-ÿ])/i);
      if (match) {
        letterCount++;
        const delay = (letterCount * 0.1).toFixed(1);
        const leadingSpaces = match[1];
        const openingTag = match[2] || '';
        const firstLetter = match[3];
        const restOfLine = line.slice(match[0].length);
        return `${leadingSpaces}${openingTag}<span class="acrostic-letter" style="animation-delay: ${delay}s">${firstLetter}</span>${restOfLine}`;
      }
      return line;
    });
    return `<p>${formattedLines.join('\n')}</p>`;
  });
}

