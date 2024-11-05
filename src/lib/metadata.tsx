import { Metadata } from 'next';
import { ContentPostingSchema } from '@/types/content';

export function SchemaMetadata(schema: ContentPostingSchema): Metadata {
  return {
    title: schema.headline,
    description: schema.description,
    authors: [{ name: schema.author.name }],
    openGraph: {
      title: schema.headline,
      description: schema.description,
      type: 'article',
      url: schema.mainEntityOfPage['@id'],
      images: schema.image
        ? [
            {
              url: schema.image,
              alt: schema.headline,
            },
          ]
        : [],
      siteName: schema.publisher.name,
      publishedTime: schema.datePublished,
      modifiedTime: schema.dateModified,
      authors: schema.author.name,
    },
    twitter: {
      card: 'summary_large_image',
      title: schema.headline,
      description: schema.description,
      images: schema.image
        ? [
            {
              url: schema.image,
              alt: schema.headline,
            },
          ]
        : [],
    },
    alternates: {
      canonical: schema.mainEntityOfPage['@id'],
    },
  };
}

export function generateSchemaScript(schema: ContentPostingSchema): string {
  return `
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": ${JSON.stringify(schema.headline)},
      "description": ${JSON.stringify(schema.description)},
      "author": {
        "@type": "Person",
        "name": ${JSON.stringify(schema.author.name)},
        "image": ${JSON.stringify(schema.author.image)}
      },
      "publisher": {
        "@type": "Organization",
        "name": ${JSON.stringify(schema.publisher.name)},
        "logo": {
          "@type": "ImageObject",
          "url": ${JSON.stringify(schema.publisher.logo.url)}
        }
      },
      "datePublished": ${JSON.stringify(schema.datePublished)},
      "dateModified": ${JSON.stringify(schema.dateModified)},
      "image": ${JSON.stringify(schema.image)},
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": ${JSON.stringify(schema.mainEntityOfPage['@id'])},
        "additionalType": ${JSON.stringify(schema.mainEntityOfPage.additionalType)}
      },
      "keywords": ${JSON.stringify(schema.keywords)},
      "articleSection": ${JSON.stringify(schema.articleSection)},
      "wordCount": ${JSON.stringify(schema.wordcount)}
    }
  `.trim();
}

export function SchemaJsonLd({ schema }: { schema: ContentPostingSchema }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: generateSchemaScript(schema) }}
    />
  );
}