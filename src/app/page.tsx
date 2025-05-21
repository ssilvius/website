import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Suspense } from 'react';
import { getContentTree, getFeaturedPosts } from '@/lib/content';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/featured-card"

export const metadata = {
  title: 'sean.silvius.me',
  description: 'Explore the latest articles, tutorials, and insights from Sean Silvius.',
};

export default async function HomePage() {
  const contentTree = await getContentTree();
  const latestPosts = await getFeaturedPosts(contentTree);

  return (
    <main className='w-full'>
      <div className='container mx-auto max-w-5xl px-4 pt-16 pb-4 lg:py-32'>
        <header role="banner">
          <h1
            className="animate-in fade-in font-heading text-center font-semibold text-2xl md:text-4xl lg:text-7xl mb-4 lg:mb-8 text-blue-900 mx-auto max-w-7xl duration-300 ease-in delay-100 fill-mode-forwards"
          >
            Hi. I build complex things in a simple manner. With bits and bytes, with wood.
          </h1>
          <h2 
            className="animate-in fade-in font-medium text-slate-600 lg:text-2xl max-w-7xl mx-auto duration-600 ease-in delay-100 fill-mode-forwards"
          >
            I log the things that have interested me, hopefully someone will find some of what I&apos;ve learned useful in their own endevors. I tend to make mistakes and adjust just as any student of life does. Those mistakes are really the important things.
          </h2>
        </header>
      </div>
      <Suspense fallback={<div className="container mx-auto px-4 md:px-8 lg:px-16">Loading...</div>}>
        <section className='bg-slate-200 py-16' id="featured" role="feed">
          <div className='container mx-auto px-4 md:px-8 lg:px-16'>
            <h2 className="text-2xl md:text-3xl font-heading font-black text-blue-900 mb-8 uppercase max-w-7xl mx-auto">
              Featured Articles
            </h2>
            <div role="grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {latestPosts.map((post) => (
                <section key={post.slug}>
                    <Card role="article" tabIndex={0}>
                      <Link href={`/posts/${post.slug}`}>
                        <div className='relative aspect-video'>
                          <Image
                            src={`/images/${post.slug}.png`}
                            alt={`Image for ${post.schema.headline}`}
                            fill
                            className="object-cover shadow-sm"
                          />
                        </div>
                        <CardHeader>
                          <CardTitle>
                              {post.schema.headline}
                          </CardTitle>
                          <CardDescription>
                            <time dateTime={post.schema.datePublished}>
                              {new Date(post.schema.datePublished).toLocaleDateString()}
                            </time>
                            <span> • </span>
                            <span>{post.readingTime}</span>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className='mt-2 md:mt-4 lg:mt-8 transition-all'>{post.schema.description}</p>
                        </CardContent>
                      </Link>
                      <CardFooter>
                        <Link 
                          href={`/posts/${post.slug}`} 
                          className="bg-blue-600 text-white px-4 py-2 font-bold uppercase hover:bg-blue-700 transition-all duration-200"
                        >
                          READ MORE
                        </Link>
                      </CardFooter>
                    </Card>
                </section>
              ))}
            </div>
            <div className='mt-12 text-right'>
              <Link 
                className="inline-block bg-white border border-blue-600 text-blue-600 px-6 py-3 font-bold uppercase hover:bg-blue-50 transition-all duration-200" 
                href='/posts'
              >
                MORE ARTICLES <ArrowRight className="inline ml-2" />
              </Link>
            </div>
          </div>
        </section>
      </Suspense>
    </main>
  );
}
