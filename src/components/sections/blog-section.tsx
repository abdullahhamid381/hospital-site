import { Container, SectionHeading } from "@/components/ui/primitives";
import { Reveal, StaggerGroup } from "@/components/ui/reveal";
import { BlogCard } from "@/components/cards/misc-cards";
import { Button } from "@/components/ui/button";
import { BLOG_POSTS } from "@/lib/data/blog";
import { ArrowRight } from "lucide-react";

export function BlogSection({ limit = 3 }: { limit?: number }) {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal>
            <SectionHeading eyebrow="Health Articles" title="From Our Blog" />
          </Reveal>
          <Reveal delay={0.1}>
            <Button href="/blog" variant="outline" icon={<ArrowRight className="h-4 w-4" />}>
              All Articles
            </Button>
          </Reveal>
        </div>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {BLOG_POSTS.slice(0, limit).map((p) => (
            <Reveal key={p.slug}>
              <BlogCard post={p} />
            </Reveal>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
