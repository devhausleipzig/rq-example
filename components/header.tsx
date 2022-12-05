import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-purple-500 text-white py-4 px-8">
      <Link href="/" className="font-semibold text-xl">
        My awesome Blog
      </Link>
    </header>
  );
}
