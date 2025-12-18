import Image from "next/image";
import { notFound } from "next/navigation";
import type { Game } from "../page";

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  console.log("Slug:", slug);

  let game: Game | null = null;

  try {
    const res = await fetch("https://www.mmobomb.com/api1/latestnews");

    if (!res.ok) {
      throw new Error("Failed to fetch game data");
    }

    const data = (await res.json()) as Game[];

    game = data.find((g) => g.id.toString() === slug) ?? null;
  } catch (error) {
    console.error(error);
  }

  if (!game) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-24">
      <h1 className="text-4xl font-bold mb-6">{game.title}</h1>

      {game.main_image && (
        <Image
          src={game.main_image}
          alt={game.title}
          width={800}
          height={450}
          className="rounded-lg mb-6"
        />
      )}

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
        {game.short_description}
      </p>

      <article className="prose dark:prose-invert">
        {game.article_content}
      </article>
    </main>
  );
}
