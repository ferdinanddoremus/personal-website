import { getPost, getAllPosts } from '../../lib/markdown';
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
  
  return (
    <article>
      <title>{post.title}</title>
      
      <div className="border px-2ch py-[var(--line-height)] mb-[var(--line-height)]">
        <header>
          <div className="flex items-center justify-between mb-ch text-sm">
            <span>~/writings/{slug}</span>
            {post.date && (
              <time>{new Date(post.date).toLocaleDateString()}</time>
            )}
          </div>
          <h1 className="font-bold mb-2ch">
            {post.title}
          </h1>
        </header>
      </div>
      
      <div className="mb-3ch">
        <div 
          className="prose prose-sm max-w-none"
          style={{ 
            lineHeight: '1.4',
          }}
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
