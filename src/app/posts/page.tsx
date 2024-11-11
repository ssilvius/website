import { notFound } from 'next/navigation';
import { getContentTree, getAllPosts } from '@/lib/content';
import Link from 'next/link';
import { ContentFile } from '@/types/content';
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: 'Content Index',
  description: 'Collection of things I\'ve written down for some reason or another — mostly because I can\'t believe I had to say it in the first place.',
};

export async function generateStaticParams() {
  const contentTree = getContentTree();
  const posts = getAllPosts(contentTree);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Pages() {
  const contentTree = getContentTree();
  const pages: ReadonlyArray<ContentFile> = getAllPosts(contentTree);

  if (!pages.length) {
    notFound();
  }

  return (
    <div>
      <div className="pt-32 px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-4xl">
          <h2 className="mb-4 text-3xl font-thin tracking-tight text-primary md:text-5xl">
            index
          </h2>
          <p className="-mt-2 leading-8 text-muted-foreground">
            collection of things I&apos;ve written down for some reason or another &mdash; mostly because I can&apos;t believe I had to say it in the first place.
          </p>
          <div className="mt-16 space-y-20 lg:mt-16 lg:space-y-16">
            {pages.map((page: ContentFile) => (
              <article
                key={page.slug}
                className="relative isolate flex flex-col gap-8 lg:flex-row transition-all"
              >
                <div className="flex items-center gap-x-4 text-xs lg:place-self-start">
                  <time 
                    dateTime={page.schema.datePublished}
                    className="text-muted-foreground"
                  >
                    {new Date(page.schema.datePublished).toLocaleDateString()}
                  </time>
                  <Badge 
                    variant="secondary"
                    className="min-w-32 justify-center bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    {page.schema.keywords.split(',')[0]}
                  </Badge>
                </div>
                <div className="group relative max-w-xl">
                  <Link href={`/posts/${page.slug}`}>
                    <h3 className="text-xl font-semibold leading-6 tracking-loose group-hover:text-muted-foreground transition-colors">
                      <span className="absolute inset-0" />
                      {page.schema.headline}
                    </h3>
                    <p className="mt-5 leading-6 text-muted-foreground">
                      {page.schema.description}
                    </p>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}