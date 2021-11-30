import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";

function NavButton({ href, text }) {
  const router = useRouter();

  return (
    <Disclosure.Button
      as="div"
      className={`block w-full py-2 pl-3 pr-4 text-base font-medium ${
        router.pathname.includes(href)
          ? "bg-indigo-50 border-indigo-500 text-indigo-700"
          : "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700"
      }  border-l-4 `}
    >
      <div className="flex justify-items-start">
        <Link href={href}>
          <a>{text}</a>
        </Link>
      </div>
    </Disclosure.Button>
  );
}

export default NavButton;
