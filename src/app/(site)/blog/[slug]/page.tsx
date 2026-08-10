import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CalendarDays, Clock3, User, Share2 } from "lucide-react";
import { Container, Badge } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { unsplash } from "@/lib/unsplash";
import { BLOG_POSTS, getBlogPostBySlug } from "@/lib/data/blog";
import { BlogCard } from "@/components/cards/misc-cards";

export function generateStaticParams() {
  return BLOG_POSTS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((b) => b.slug !== post.slug).slice(0, 3);

  return (
    <>
      <section className="border-b border-border py-16 md:py-24">
        <Container className="max-w-3xl">
          <Reveal>
            <Badge>{post.category}</Badge>
            <h1 className="section-headline text-balance mt-5 font-bold text-text">{post.title}</h1>
            <div className="mt-6 flex flex-wrap items-center gap-5 text-xs text-text-muted">
              <span className="flex items-center gap-1.5"><User className="h-3.5 w-3.5 text-primary" /> {post.author}</span>
              <span className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5 text-primary" /> {new Date(post.date).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
              <span className="flex items-center gap-1.5"><Clock3 className="h-3.5 w-3.5 text-primary" /> {post.readingTime}</span>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-14">
        <Container className="max-w-3xl">
          <Reveal className="relative aspect-[16/9] overflow-hidden rounded-[24px] border border-border">
            <Image src={unsplash(post.image, 1200)} alt={post.title} fill className="object-cover" />
          </Reveal>

          <Reveal delay={0.1} className="prose-content mt-10 space-y-5">
            {post.content.map((para, i) => (
              <p key={i} className="text-base leading-relaxed text-text-muted">
                {para}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.15} className="mt-10 flex items-center gap-3 border-t border-border pt-8">
            <span className="text-xs font-semibold text-text-muted">Share:</span>
            <button className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text hover:border-primary hover:text-primary transition-colors">
              <Share2 className="h-4 w-4" />
            </button>
          </Reveal>
        </Container>
      </section>

      <section className="bg-bg-secondary py-24 md:py-32">
        <Container>
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-text">Related Articles</h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {related.map((p) => (
              <Reveal key={p.slug}>
                <BlogCard post={p} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
