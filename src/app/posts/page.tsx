import React from 'react';
import { notFound } from 'next/navigation';
import { getContentTree, getAllPosts } from '@/lib/content';
import Link from 'next/link';
import Image from 'next/image';
import { ContentFile } from '@/types/content';
import {
  RefinedCard,
  RefinedCardContent,
  RefinedCardDescription,
  RefinedCardFooter,
  RefinedCardHeader,
  RefinedCardTitle
} from "@/components/ui/refined-card"

export const metadata = {
  title: 'Articles | Sean Silvius',
  description: 'Collection of things I\'ve written down for some reason or another — mostly because I can\'t believe I had to say it in the first place.',
};

export async function generateStaticParams() {
  const contentTree = getContentTree();
  const posts = getAllPosts(contentTree);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Group posts by year
function groupPostsByYear(posts: ReadonlyArray<ContentFile>) {
  const groupedPosts: Record<string, ContentFile[]> = {};
  
  posts.forEach(post => {
    const year = new Date(post.schema.datePublished).getFullYear().toString();
    if (!groupedPosts[year]) {
      groupedPosts[year] = [];
    }
    groupedPosts[year].push(post);
  });
  
  // Sort years in descending order
  return Object.entries(groupedPosts)
    .sort(([yearA], [yearB]) => Number(yearB) - Number(yearA));
}

export default async function Pages(): Promise<React.ReactElement> {
  const contentTree = getContentTree();
  const pages: ReadonlyArray<ContentFile> = getAllPosts(contentTree);

  if (!pages.length) {
    notFound();
  }

  // Group posts by year for organized display
  const postsByYear = groupPostsByYear(pages);

  return (
    <div className='mt-16 md:mt-32 lg:mt-48'>
      <div className="px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-6 text-4xl font-heading font-black text-slate-900 md:text-5xl uppercase">
            Articles
          </h1>
          <p className="mb-8 text-lg text-slate-600 leading-relaxed w-full">
            Collection of things I&apos;ve written down for some reason or another &mdash; mostly because I can&apos;t believe I had to say it in the first place.
          </p>
          
          {postsByYear.map(([year, posts]) => (
            <div key={year} className="mb-16">
              <h2 className="text-2xl font-heading font-bold text-slate-900 mb-8 uppercase border-b-2 border-slate-200 pb-2">
                {year}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <RefinedCard key={post.slug}>
                    <div className='relative aspect-video'>
                      <Image
                        src={`/images/${post.slug}.png`}
                        alt={`Image for ${post.schema.headline}`}
                        fill
                        className="object-cover shadow-sm"
                      />
                    </div>
                    <RefinedCardHeader>
                      <RefinedCardTitle>
                        <Link href={`/posts/${post.slug}`} className="hover:underline">
                          {post.schema.headline}
                        </Link>
                      </RefinedCardTitle>
                      <RefinedCardDescription>
                        <time dateTime={post.schema.datePublished}>
                          {new Date(post.schema.datePublished).toLocaleDateString()}
                        </time>
                        <span> • </span>
                        <span>{post.readingTime}</span>
                      </RefinedCardDescription>
                    </RefinedCardHeader>
                    <RefinedCardContent>
                      <p className="mt-2">{post.schema.description}</p>
                    </RefinedCardContent>
                    <RefinedCardFooter>
                      <Link 
                        href={`/posts/${post.slug}`} 
                        className="bg-slate-900 text-white px-4 py-2 font-bold uppercase hover:bg-slate-800 transition-all duration-200"
                      >
                        READ MORE
                      </Link>
                    </RefinedCardFooter>
                  </RefinedCard>
                ))}
                
                {/* Add placeholder card for current year (2025) if less than 3 articles */}
                {year === "2025" && posts.length < 3 && (
                  <RefinedCard>
                    <div className='relative aspect-video bg-amber-50 flex items-center justify-center'>
                      <svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
                        <path d="M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4"/>
                        <path d="M2 6h4"/>
                        <path d="M2 10h4"/>
                        <path d="M2 14h4"/>
                        <path d="M2 18h4"/>
                        <path d="M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"/>
                      </svg>
                    </div>
                    <RefinedCardHeader>
                      <RefinedCardTitle>
                        <span className="animate-pulse">Something New in the Works</span>
                      </RefinedCardTitle>
                      <RefinedCardDescription>
                        <time dateTime={new Date().toISOString()}>
                          {new Date().toLocaleDateString()}
                        </time>
                        <span> • </span>
                        <span>Coming soon</span>
                      </RefinedCardDescription>
                    </RefinedCardHeader>
                    <RefinedCardContent>
                      <p className="mt-2">I&apos;m writing something that matters. No fluff, no filler; just honest thoughts that might help you see things differently. Worth the wait.</p>
                    </RefinedCardContent>
                    <RefinedCardFooter>
                      <div 
                        className="bg-slate-300 text-slate-600 px-4 py-2 font-bold uppercase cursor-not-allowed"
                      >
                        STAY TUNED
                      </div>
                    </RefinedCardFooter>
                  </RefinedCard>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
