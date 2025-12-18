import Link from "next/link";
 
export default function Home() {
  return (
    <Link href={"/blog"} className="mb-6">Welcome to the blog</Link>
  )
}
