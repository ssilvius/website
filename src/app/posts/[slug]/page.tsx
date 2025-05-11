import { Suspense } from 'react';
import { Mdx } from '@/components/ui/mdx';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Metadata } from 'next';
import { SchemaMetadata, SchemaJsonLd } from '@/lib/metadata';
import { Skeleton } from '@/components/ui/skeleton';
import { getContentTree, getAllPosts, findPostBySlug } from '@/lib/content';

export async function generateStaticParams() {
  const contentTree = getContentTree();
  const posts = getAllPosts(contentTree);
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

async function getPost(slug: string) {
  const contentTree = getContentTree();
  const post = findPostBySlug(contentTree, slug);
  
  if (!post) {
    notFound();
  }
  
  return post;
}

export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const post = await getPost(params.slug);
  return SchemaMetadata(post.schema);
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  const { schema } = post;
  return (
    <Suspense fallback={<Skeleton />}>
      <SchemaJsonLd schema={schema} />
      <article className="container mx-auto mt-16 md:mt-24 px-4 py-8 max-w-7xl">
        <section className="mb-12">
          <div className="flex flex-row gap-4">
            <div className="mb-6">
              <div className="text-slate-900 mb-4 uppercase">{schema.headline}</div>
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <time dateTime={schema.datePublished}>
                  {new Date(schema.datePublished).toLocaleDateString()}
                </time>
                <span>•</span>
                <span>{post.readingTime}</span>
              </div>
            </div>
          </div>
        </section>

        <p className="mb-8 font-heading font-semibold text-5xl text-slate-900 tracking-wide">
          {schema.description}
        </p>
        <div className="mb-12 relative aspect-video">
          <Image
            src={`/images/${params.slug}.png`}
            alt={`Image for ${schema.headline}`}
            fill
            className="object-cover shadow-md"
          />
        </div>

        <div className="prose prose-lg prose-slate max-w-none prose-headings:font-heading prose-headings:text-slate-900 prose-headings:uppercase prose-strong:text-slate-900">
          <Mdx source={schema.articleBody} />
        </div>
      </article>
    </Suspense>
  );
}