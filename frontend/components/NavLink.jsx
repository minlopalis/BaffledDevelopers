import { useRouter } from "next/router";
import Link from "next/link";

function NavLink({ href, text, format = "desktop" }) {
  const router = useRouter();

  return (
    <Link href={href}>
      <a
        className={`inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 ${
          router.pathname.includes(href)
            ? "border-indigo-500 text-gray-900"
            : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
        } `}
      >
        {text}
      </a>
    </Link>
  );
}

export default NavLink;
