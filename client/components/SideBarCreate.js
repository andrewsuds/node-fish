import Link from "next/link";

export default function SideBarCreate() {
  return (
    <div className="mt-4">
      <Link href="/">
        <button className="bg-blue-400 hover:bg-blue-500 w-[225px] py-3 font-bold text-white shadow-md rounded-full">
          Tweet
        </button>
      </Link>
    </div>
  );
}
