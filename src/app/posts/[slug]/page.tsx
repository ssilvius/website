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
      <article className="container mx-auto px-4 py-8">
      <section className="mb-8">
        <div className="flex items-center justify-between">
          <div className="text-xs font-medium mb-2 flex-grow">{schema.headline}</div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <time dateTime={schema.datePublished}>
              {new Date(schema.datePublished).toLocaleDateString()}
            </time>
            <span>•</span>
            <span>{post.readingTime}</span>
          </div>
        </div>
      </section>

        <h1 className="mb-8 text-2xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
          {schema.description}
        </h1>
        <div className="mb-8 relative aspect-video">
          <Image
            src={`/images/${params.slug}.png`}
            alt={`Image for ${schema.headline}`}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <Mdx source={schema.articleBody} />
      </article>
    </Suspense>
  );
}