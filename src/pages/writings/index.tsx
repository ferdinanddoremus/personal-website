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
        <div className="space-y-[calc(var(--line-height)*2)]">
          {posts.map((post, index) => (
            <article key={post.slug}>
              <div className="flex items-center justify-between">
                <h2 className="text-sm">
                  #{String(index + 1).padStart(2, '0')}{' '}
                  <a 
                    href={`/writings/${post.slug}`}
                    className="font-bold underline hover:no-underline"
                  >
                    {post.title}
                  </a>
                </h2>
                {post.date && (
                  <time className="text-sm">
                    {new Date(post.date).toLocaleDateString()}
                  </time>
                )}
              </div>
              
              {post.excerpt && (
                <p className="text-sm border-l-2 pl-ch my-[calc(var(--line-height)/2)]">
                  {post.excerpt}
                </p>
              )}
              
              <div className="mt-[calc(var(--line-height)/2)] text-xs">
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