import Link from 'next/link';
import ProgressBar from './progress-bar';

export default function NotesLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const year = new Date().getFullYear();

  return (
    <div className="bg-[#fcfcfc] text-[#1a1a1a]">
      <ProgressBar />
      <nav className="max-w-5xl mx-auto px-6 py-10 flex justify-between items-center">
        <Link
          href="/"
          className="group flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-zinc-400 hover:text-black transition-colors"
        >
          <span className="group-hover:-translate-x-1 transition-transform">
            ←
          </span>
          返回首页
        </Link>
        <div className="text-[10px] font-mono text-zinc-300 uppercase tracking-[0.3em]">
          ARIES_WARRIOR / {year}
        </div>
      </nav>
      <main className="w-full max-w-3xl min-w-0 mx-auto px-6 pt-12 pb-28 overflow-x-hidden">
        <article className="article-content w-full min-w-0 max-w-full">
          {children}
        </article>
      </main>
    </div>
  );
}
