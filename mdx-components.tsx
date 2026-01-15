import React, { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';
import { highlight } from 'sugar-high';

type AnchorProps = ComponentPropsWithoutRef<'a'>;

function mergeClassName(baseClassName: string, className?: string): string {
  return [baseClassName, className].filter(Boolean).join(' ');
}

const components = {
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
};

declare global {
  type MDXProvidedComponents = typeof components;
}

export function useMDXComponents(): MDXProvidedComponents {
  return components;
}
