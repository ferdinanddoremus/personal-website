export interface SEOProps {
  title?: string;
  description?: string;
  url?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  siteName?: string;
}

const DEFAULT_SEO = {
  siteName: 'Groremus',
  author: 'Ferdinand Dorémus',
  baseUrl: 'https://grorem.us',
  defaultImage: '/og-image.png',
  defaultDescription: 'Ferdinand Dorémus - Senior React Native Developer, cyclist, and specialty coffee lover. Writing about code, bikes, and coffee.',
};

export function SEO({
  title,
  description = DEFAULT_SEO.defaultDescription,
  url,
  image = DEFAULT_SEO.defaultImage,
  type = 'website',
  publishedTime,
  modifiedTime,
  author = DEFAULT_SEO.author,
  siteName = DEFAULT_SEO.siteName,
}: SEOProps) {
  const fullTitle = title ? `${title} - ${siteName}` : siteName;
  const fullUrl = url ? `${DEFAULT_SEO.baseUrl}${url}` : DEFAULT_SEO.baseUrl;
  const fullImage = image.startsWith('http') ? image : `${DEFAULT_SEO.baseUrl}${image}`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:site_name" content={siteName} />

      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {type === 'article' && <meta property="article:author" content={author} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
    </>
  );
}
