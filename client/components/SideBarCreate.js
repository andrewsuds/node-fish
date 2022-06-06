import Link from "next/link";

export default function SideBarCreate() {
  return (
    <div className="mt-4">
      <Link href="/create">
        <button className="flex items-center bg-blue-400 hover:bg-blue-500 font-bold text-white shadow-md rounded-full p-2.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30px"
            viewBox="0 0 24 24"
            fill="#ffffff"
            width="30px"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
          </svg>
          <span className="hidden xl:block">Tweet</span>
        </button>
      </Link>
    </div>
  );
}
