import axios from "axios";
import Link from "next/link";
import nookies from "nookies";
import { useEffect } from "react";
import { API_URL } from "../../config";
import { useStore } from "../../store";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function Subjects({ user, cookies }) {
  const { subjects } = useStore((state) => state);

  return (
    <div className="mt-4">
      <h2 className="text-xs font-medium tracking-wide text-gray-500 uppercase">
        Subjects
      </h2>
      <ul
        role="list"
        className="grid min-h-full grid-cols-1 gap-5 mt-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {subjects.map((subject) => (
          <li
            key={subject?.name}
            className="flex col-span-1 rounded-md shadow-sm"
          >
            <div
              className={classNames(
                "bg-indigo-500 flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md"
              )}
            >
              {subject.name[0]}
            </div>
            <div className="flex items-center justify-between flex-1 truncate bg-white border-t border-b border-r border-gray-200 rounded-r-md">
              <div className="flex-1 px-4 py-2 text-sm truncate">
                <Link href={`/subjects/${subject.id}`}>
                  <a className="font-medium text-gray-900 hover:text-gray-600">
                    {subject.name}
                  </a>
                </Link>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);

  let user = null;

  if (cookies?.jwt) {
    try {
      const { data } = await axios.get(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${cookies.jwt}`,
        },
      });
      user = data;
    } catch (e) {
      console.log(e);
    }
  }

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }

  return {
    props: {
      user,
      cookies,
    },
  };
};

export default Subjects;
