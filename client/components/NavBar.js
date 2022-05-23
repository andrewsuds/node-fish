import Link from "next/link";

export default function NavBar() {
  return (
    <div className="border border-b-4 border-red-300">
      My NavBar <Link href="/login">Login</Link>
    </div>
  );
}
