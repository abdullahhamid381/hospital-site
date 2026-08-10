import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/primitives";
import { Reveal, StaggerGroup } from "@/components/ui/reveal";
import { BlogCard } from "@/components/cards/misc-cards";
import { BLOG_POSTS } from "@/lib/data/blog";

export const metadata: Metadata = {
  title: "Health Blog",
  description: "Health tips, medical news, and updates from our specialists.",
};

export default function BlogPage() {
  const [featured, ...rest] = BLOG_POSTS;

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Health Tips & Medical News"
        description="Practical, doctor-written guidance on heart health, nutrition, children's health, and more."
      />
      <section className="py-24 md:py-32">
        <Container>
          <Reveal>
            <BlogCard post={featured} featured />
          </Reveal>

          <StaggerGroup className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
            {rest.map((p) => (
              <Reveal key={p.slug}>
                <BlogCard post={p} />
              </Reveal>
            ))}
          </StaggerGroup>
        </Container>
      </section>
    </>
  );
}
