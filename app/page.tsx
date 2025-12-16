// Define the structure of a single game object
export interface Game {
  id: number;
  title: string;
  short_description: string;
  thumbnail: string;
  main_image: string;
  article_content: string;
}


// The API returns an array of Game objects
export type GameData = Game[];


// This is a Server Component
export default async function Home() {
  let data: GameData | null = null;
  let error: string | null = null;
 
  // Define the limit
  const limit = 20;


  try {
    const response = await fetch('https://www.mmobomb.com/api1/latestnews');


    if (!response.ok) {
      const errorText = response.statusText || 'Unknown API error';
      throw new Error(`Failed to fetch data: ${response.status} - ${errorText}`);
    }


    data = (await response.json()) as GameData;


  } catch (e) {
    console.error('Server Fetch Error:', e);
    error = e instanceof Error ? e.message : 'An unknown error occurred.';
  }
 
  // Slice the data to the desired limit (20) before rendering
  const gamesToShow = data ? data.slice(0, limit) : [];
 
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="w-full">
          <h1 className="text-3xl font-bold mb-4">Server-Side Data Fetching (Limited)</h1>
          <p className="mb-6">Hello World</p>
         
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded" role="alert">
              <p className="font-bold">Error loading data:</p>
              <p>{error}</p>
            </div>
          )}


          {gamesToShow.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mt-4 mb-2">Game Titles (First 20)</h3>
              <ul className="list-disc ml-5 space-y-1">
                {gamesToShow.map((game) => (
                  <li key={game.id} className="text-sm">
                    **{game.title}** *({game.short_description})*
                  </li>
                ))}
              </ul>
            </div>
          )}


          {!gamesToShow.length && !error && <p>No data available after filtering.</p>}
         
        </div>
      </main>
    </div>
  );
}
