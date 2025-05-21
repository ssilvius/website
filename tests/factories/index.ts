import { Factory } from 'fishery';
import { faker } from '@faker-js/faker';
import { ContentFile, ContentTree, ContentPostingSchema } from '@/types/content';

export const contentPostingSchemaFactory = Factory.define<ContentPostingSchema>(() => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: faker.lorem.sentence(),
  description: faker.lorem.paragraph(),
  author: {
    '@type': 'Person' as const,
    name: faker.person.fullName(),
    image: faker.image.avatar(),
  },
  datePublished: faker.date.past().toISOString(),
  dateModified: faker.date.recent().toISOString(),
  image: faker.image.url(),
  mainEntityOfPage: {
    '@type': 'WebPage' as const,
    '@id': faker.internet.url(),
    additionalType: 'Article',
  },
  publisher: {
    '@type': 'Organization' as const,
    name: faker.company.name(),
    logo: {
      '@type': 'ImageObject' as const,
      url: faker.image.urlLoremFlickr(),
    },
  },
  keywords: faker.lorem.words(3).split(' ').join(', '),
  articleBody: faker.lorem.paragraphs(3),
  articleSection: 'Blog',
  wordcount: faker.number.int({ min: 100, max: 2000 }),
  featured: faker.datatype.boolean(),
  draft: faker.datatype.boolean(),
}));

export const contentFileFactory = Factory.define<ContentFile>(() => ({
  path: faker.system.filePath(),
  slug: faker.lorem.slug(),
  schema: contentPostingSchemaFactory.build(),
  readingTime: `${faker.number.int({ min: 1, max: 10 })} min read`,
  rawContent: `---
id: ${faker.string.alphanumeric(6)}
slug: ${faker.lorem.slug()}
featured: ${faker.datatype.boolean()}
draft: ${faker.datatype.boolean()}
title: "${faker.lorem.sentence()}"
date: "${faker.date.past().toISOString()}"
excerpt: "${faker.lorem.paragraph()}"
tags:
  - ${faker.lorem.word()}
  - ${faker.lorem.word()}
author:
  name: ${faker.person.fullName()}
  picture: ${faker.image.avatar()}
---\n${faker.lorem.paragraphs(3)}`,
}));

export const contentTreeFactory = Factory.define<ContentTree>(() => ({
  path: faker.system.directoryPath(),
  type: 'dir',
  name: faker.system.fileName(),
  children: [
    {
      path: faker.system.filePath(),
      type: 'file',
      name: faker.system.fileName(),
      content: contentFileFactory.build(),
    },
  ],
}));
