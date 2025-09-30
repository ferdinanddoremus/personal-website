import { getAllPosts } from "../../lib/markdown"

export default function Writings() {
  const posts = getAllPosts()

  return (
    <div>
      <title>Writings</title>
      {posts.length === 0 ? (
        <div>
          <p>No writings found. Add some markdown files to the content/writings directory.</p>
        </div>
      ) : (
        <div className="space-y-[var(--line-height)]">
          {posts.map((post, index) => (
            <article 
              key={post.slug} 
              className="border p-2ch"
            >
              <div className="flex items-center justify-between mb-ch">
                <span className="text-sm font-mono">#{String(index + 1).padStart(2, '0')}</span>
                {post.date && (
                  <time className="text-sm">
                    {new Date(post.date).toLocaleDateString()}
                  </time>
                )}
              </div>
              
              <h2 className="font-bold mb-ch">
                <a 
                  href={`/writings/${post.slug}`}
                  className="underline hover:no-underline"
                >
                  {post.title}
                </a>
              </h2>
              
              {post.excerpt && (
                <p className="text-sm border-l-2 pl-ch ml-ch">
                  {post.excerpt}
                </p>
              )}
              
              <div className="mt-ch text-sm">
                → <a href={`/writings/${post.slug}`} className="underline hover:no-underline">
                  Read more
                </a>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}