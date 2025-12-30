import { getPost, getAllPosts } from '../../lib/markdown';
import { SEO } from '../../components/seo';
import { BlogPostStructuredData } from '../../components/structured-data';
import type { PageProps } from 'waku/router';

export default async function WritingPage({
  slug,
}: PageProps<'/writings/[slug]'>) {
  const post = await getPost(slug);

  if (!post) {
    return (
      <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <h1>Post not found</h1>
        <p>The writing "{slug}" could not be found.</p>
        <a href="/writings">← Back to writings</a>
      </div>
    );
  }

  const publishedTime = post.date ? new Date(post.date).toISOString() : new Date().toISOString();

  return (
    <article>
      <SEO
        title={post.title}
        description={post.excerpt || `Read ${post.title} by Ferdinand Dorémus`}
        url={`/writings/${post.slug}`}
        type="article"
        publishedTime={publishedTime}
      />
      <BlogPostStructuredData
        title={post.title}
        description={post.excerpt || `Read ${post.title} by Ferdinand Dorémus`}
        publishedTime={publishedTime}
        url={`/writings/${post.slug}`}
      />
      <div className="mb-3ch">
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
      
      <div className="border p-2ch">
        <div className="flex justify-between items-center">
          <a href="/writings" className="underline hover:no-underline">
            ← Back to writings
          </a>
          <span className="text-sm">EOF</span>
        </div>
      </div>
    </article>
  );
}

export const getConfig = async () => {
  const posts = getAllPosts()
  console.log('Posts for static generation:', posts.map(p => p.slug))
  return {
    render: 'static',
    staticPaths: posts.map((post) => post.slug),
  } as const
}
