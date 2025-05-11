import { Card, CardContent } from '@/components/ui/card';
import { MDXComponents } from 'mdx/types';
import { DetailedHTMLProps, AnchorHTMLAttributes, HTMLAttributes } from 'react';

const components: MDXComponents = {
  // Headings
  h1: ({ className = '', ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h1 
      className={`scroll-m-20 text-7xl font-heading lg:text-5xl mb-8 ${className}`}
      {...props}
    />
  ),
  h2: ({ className = '', ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h2 
      className={`scroll-m-20 text-3xl font-heading mt-10 mb-4 ${className}`}
      {...props}
    />
  ),
  h3: ({ className = '', ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h3 
      className={`scroll-m-20 text-2xl font-heading tracking-tight mt-8 mb-4 ${className}`}
      {...props}
    />
  ),
  h4: ({ className = '', ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h4 
      className={`scroll-m-20 text-xl font-heading mt-6 mb-4 ${className}`}
      {...props}
    />
  ),
  
  // Paragraph and text elements
  p: ({ className = '', ...props }: HTMLAttributes<HTMLParagraphElement>) => (
    <p 
      className={`leading-7 text-slate-700 [&:not(:first-child)]:mt-6 mb-4 ${className}`}
      {...props}
    />
  ),
  strong: ({ className = '', ...props }: HTMLAttributes<HTMLElement>) => (
    <strong 
      className={`font-semibold text-blue-900 ${className}`}
      {...props}
    />
  ),
  em: ({ className = '', ...props }: HTMLAttributes<HTMLElement>) => (
    <em 
      className={`italic text-slate-700 ${className}`}
      {...props}
    />
  ),
  
  // Lists
  ul: ({ className = '', ...props }: HTMLAttributes<HTMLUListElement>) => (
    <ul 
      className={`my-6 ml-6 list-disc text-slate-700 [&>li]:mt-2 ${className}`}
      {...props}
    />
  ),
  ol: ({ className = '', ...props }: HTMLAttributes<HTMLOListElement>) => (
    <ol 
      className={`my-6 ml-6 list-decimal text-slate-700 [&>li]:mt-2 ${className}`}
      {...props}
    />
  ),
  li: ({ className = '', ...props }: HTMLAttributes<HTMLLIElement>) => (
    <li 
      className={`leading-7 ${className}`}
      {...props}
    />
  ),
  
  // Code blocks
  pre: ({ className = '', ...props }: HTMLAttributes<HTMLPreElement>) => (
    <Card className="my-6">
      <CardContent className="p-0">
        <pre 
          className={`overflow-x-auto p-4 text-sm leading-6 ${className}`}
          {...props}
        />
      </CardContent>
    </Card>
  ),
  code: ({ className = '', ...props }: HTMLAttributes<HTMLElement>) => (
    <code 
      className={`${className}`}
      {...props}
    />
  ),
  
  // Block quotes
  blockquote: ({ className = '', ...props }: HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote 
      className={`mt-6 border-l-2 border-border pl-6 italic ${className}`}
      {...props}
    />
  ),
  
  // Links
  a: ({ className = '', ...props }: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>) => (
    <a 
      className={`font-medium underline underline-offset-4 hover:text-primary ${className}`}
      {...props}
    />
  ),
  
  // Tables
  table: ({ className = '', ...props }: HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table 
        className={`w-full ${className}`}
        {...props}
      />
    </div>
  ),
  thead: ({ className = '', ...props }: HTMLAttributes<HTMLTableSectionElement>) => (
    <thead 
      className={`border-b ${className}`}
      {...props}
    />
  ),
  tbody: ({ className = '', ...props }: HTMLAttributes<HTMLTableSectionElement>) => (
    <tbody 
      className={`[&_tr:last-child]:border-0 ${className}`}
      {...props}
    />
  ),
  tr: ({ className = '', ...props }: HTMLAttributes<HTMLTableRowElement>) => (
    <tr 
      className={`border-b transition-colors hover:bg-muted/50 ${className}`}
      {...props}
    />
  ),
  th: ({ className = '', ...props }: HTMLAttributes<HTMLTableCellElement>) => (
    <th 
      className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground ${className}`}
      {...props}
    />
  ),
  td: ({ className = '', ...props }: HTMLAttributes<HTMLTableCellElement>) => (
    <td 
      className={`p-4 align-middle ${className}`}
      {...props}
    />
  ),
  
  // Horizontal rule
  hr: ({ className = '', ...props }: HTMLAttributes<HTMLHRElement>) => (
    <hr 
      className={`my-8 border-border ${className}`}
      {...props}
    />
  ),
};

export default components;