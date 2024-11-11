import { getContentTree, getFeaturedPosts } from '@/lib/content';
import { buttonVariants } from "@/components/ui/button"
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'sean.silvius.me',
  description: 'Explore the latest articles, tutorials, and insights from Sean Silvius.',
};



export default async function HomePage() {
  const contentTree = await getContentTree();
  const latestPosts = await getFeaturedPosts(contentTree);

  return (
    <div className="container mx-auto px-4 py-8">
      <header role="banner" className="mb-12">
      <h1
        className="animate-fade-up bg-gradient-to-br from-slate-900 to-indigo-900 bg-clip-text text-center text-5xl lg:text-8xl font-bold tracking-[-0.02em] text-transparent opacity-0 drop-shadow-md [text-wrap:balance] duration-500 transition-[font-size]"
        style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}
      >
        Hi. I build complex things in a simple manner. With bits and bytes, with wood.
      </h1>
      <h2 className="mt-4 mx-16 text-lg md:text-xl lg:text-2xl animate-fade-up" style={{ animationDelay: "0.15s", animationFillMode: "forwards" }}>
        I log the things that have interested me, hopefully someone will find some of what I&apos;ve learned useful in their own endevors. I tend to make mistakes and adjust just as any student of design thinking does. Those mistakes are really the important things. Most of the tech articles here are written for the startup founder. I also will record acomplishments in other hobbies as well.
      </h2>
      </header>
      <section id="featured" role="feed">
        <div role="grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <article key={post.slug} role="article" tabIndex={0} className="border rounded-lg p-4">
              <h3 className="text-xl font-bold mb-1">
                <Link href={`/posts/${post.slug}`}>
                  {post.schema.headline}
                </Link>
              </h3>
              <div className="mt-1 text-sm">
                <time dateTime={post.schema.datePublished}>
                  {new Date(post.schema.datePublished).toLocaleDateString()}
                </time>
                <span> • </span>
                <span>{post.readingTime}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {post.schema.description}
              </p>
            </article>
          ))}
        </div>
        <div className='mt-8 lg:mt-16 text-right'>
          <Link className={buttonVariants({ variant: "outline" })} href='/connect'>More Articles <ArrowRight /></Link>
        </div>
      </section>
    </div>
  );
}
