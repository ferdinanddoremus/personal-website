interface WebsiteSchema {
  '@context': 'https://schema.org';
  '@type': 'WebSite';
  name: string;
  url: string;
  description: string;
  author: PersonSchema;
}

interface PersonSchema {
  '@context'?: 'https://schema.org';
  '@type': 'Person';
  name: string;
  url: string;
  jobTitle: string;
  sameAs?: string[];
}

interface BlogPostingSchema {
  '@context': 'https://schema.org';
  '@type': 'BlogPosting';
  headline: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author: PersonSchema;
  publisher: {
    '@type': 'Person';
    name: string;
  };
  url: string;
  mainEntityOfPage: {
    '@type': 'WebPage';
    '@id': string;
  };
}

const DOMAIN = 'https://grorem.us';

export function WebsiteStructuredData() {
  const schema: WebsiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Groremus',
    url: DOMAIN,
    description: 'Ferdinand Dorémus - Senior React Native Developer, cyclist, and specialty coffee lover. Writing about code, bikes, and coffee.',
    author: {
      '@type': 'Person',
      name: 'Ferdinand Dorémus',
      url: DOMAIN,
      jobTitle: 'Senior Frontend Engineer',
      sameAs: [
        'https://github.com/ferdinanddoremus',
        'https://www.linkedin.com/in/ferdinand-doremus',
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function BlogPostStructuredData({
  title,
  description,
  publishedTime,
  modifiedTime,
  url,
}: {
  title: string;
  description: string;
  publishedTime: string;
  modifiedTime?: string;
  url: string;
}) {
  const schema: BlogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: {
      '@type': 'Person',
      name: 'Ferdinand Dorémus',
      url: DOMAIN,
      jobTitle: 'Senior Frontend Engineer',
    },
    publisher: {
      '@type': 'Person',
      name: 'Ferdinand Dorémus',
    },
    url: `${DOMAIN}${url}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${DOMAIN}${url}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
