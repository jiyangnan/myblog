import React, { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';
import { highlight } from 'sugar-high';

type HeadingProps = ComponentPropsWithoutRef<'h1'>;
type ParagraphProps = ComponentPropsWithoutRef<'p'>;
type ListProps = ComponentPropsWithoutRef<'ul'>;
type ListItemProps = ComponentPropsWithoutRef<'li'>;
type AnchorProps = ComponentPropsWithoutRef<'a'>;
type BlockquoteProps = ComponentPropsWithoutRef<'blockquote'>;

function mergeClassName(
  baseClassName: string,
  className?: string
): string {
  return [baseClassName, className].filter(Boolean).join(' ');
}

const components = {
  h1: ({ className, ...props }: HeadingProps) => (
    <h1
      className={mergeClassName(
        'font-serif text-4xl md:text-5xl tracking-tight text-zinc-900 pt-10 mb-6',
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props }: HeadingProps) => (
    <h2
      className={mergeClassName(
        'text-2xl md:text-3xl font-serif text-zinc-900 mt-10 mb-4',
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props }: HeadingProps) => (
    <h3
      className={mergeClassName(
        'text-xl md:text-2xl font-serif text-zinc-900 mt-8 mb-3',
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props }: HeadingProps) => (
    <h4
      className={mergeClassName(
        'text-lg font-serif text-zinc-900 mt-6 mb-2',
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: ParagraphProps) => (
    <p
      className={mergeClassName(
        'text-zinc-600 leading-relaxed text-lg',
        className
      )}
      {...props}
    />
  ),
  ol: ({ className, ...props }: ListProps) => (
    <ol
      className={mergeClassName(
        'text-zinc-600 text-lg list-decimal pl-6 space-y-2',
        className
      )}
      {...props}
    />
  ),
  ul: ({ className, ...props }: ListProps) => (
    <ul
      className={mergeClassName(
        'text-zinc-600 text-lg list-disc pl-6 space-y-2',
        className
      )}
      {...props}
    />
  ),
  li: ({ className, ...props }: ListItemProps) => (
    <li className={mergeClassName('pl-1', className)} {...props} />
  ),
  em: ({ className, ...props }: ComponentPropsWithoutRef<'em'>) => (
    <em className={mergeClassName('font-medium', className)} {...props} />
  ),
  strong: ({ className, ...props }: ComponentPropsWithoutRef<'strong'>) => (
    <strong className={mergeClassName('font-medium', className)} {...props} />
  ),
  a: ({ href, children, className, ...props }: AnchorProps) => {
    const baseClassName =
      'text-amber-700 hover:text-amber-900 underline underline-offset-4 decoration-amber-200';
    if (href?.startsWith('/')) {
      return (
        <Link
          href={href}
          className={mergeClassName(baseClassName, className)}
          {...props}
        >
          {children}
        </Link>
      );
    }
    if (href?.startsWith('#')) {
      return (
        <a
          href={href}
          className={mergeClassName(baseClassName, className)}
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={mergeClassName(baseClassName, className)}
        {...props}
      >
        {children}
      </a>
    );
  },
  code: ({ children, ...props }: ComponentPropsWithoutRef<'code'>) => {
    const codeHTML = highlight(children as string);
    return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
  },
  img: ({ className, ...props }: ComponentPropsWithoutRef<'img'>) => (
    <img
      className={mergeClassName(
        'rounded-2xl border border-zinc-100 shadow-sm my-6',
        className
      )}
      {...props}
    />
  ),
  Table: ({ data }: { data: { headers: string[]; rows: string[][] } }) => (
    <table>
      <thead>
        <tr>
          {data.headers.map((header, index) => (
            <th key={index}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.rows.map((row, index) => (
          <tr key={index}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex}>{cell}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ),
  blockquote: ({ className, ...props }: BlockquoteProps) => (
    <blockquote
      className={mergeClassName(
        'ml-[0.075em] border-l-4 border-amber-200 pl-6 text-zinc-500 italic text-lg',
        className
      )}
      {...props}
    />
  ),
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
