import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import components from '@/app/mdx-components';

const options = {
  theme: 'github-light',
  keepBackground: true,
};

export function Mdx({ source }: { source: string }) {
  return (
    <article className="max-w-none">
      <MDXRemote
        source={source}
        components={components}
        options={{
          mdxOptions: {
            rehypePlugins: [[rehypePrettyCode, options]],
          },
        }}
      />
    </article>
  );
}