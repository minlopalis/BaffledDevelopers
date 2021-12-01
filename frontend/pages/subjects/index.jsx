import { PlusIcon } from '@heroicons/react/solid';
import axios from 'axios';
import Link from 'next/link';
import nookies from 'nookies';
import { useEffect } from 'react';
import { API_URL } from '../../config';
import { useStore } from '../../store';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Subjects({ user, cookies }) {
  const { subjects, setSubjects } = useStore((state) => state);

  useEffect(() => {
    const fetchSubjects = async () => {
      const { data } = await axios.get(`${API_URL}/subjects`, {
        headers: {
          Authorization: `Bearer ${cookies.jwt}`,
        },
      });
      setSubjects(data);
    };

    if (!subjects.length) {
      fetchSubjects();
    }
  }, [subjects]);

  return (
    <div className="mt-4">
      <div className="flex flex-row justify-between items-evenly">
        <h2 className="mt-5 text-2xl font-medium tracking-wide text-gray-900 uppercase">
          Subjects
        </h2>
        {user.role.type !== 'student' ? (
          <Link href="/subjects/add/">
            <a className="flex items-center justify-center h-10 px-4 mt-5 mr-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <PlusIcon className="w-4 h-4" />
            </a>
          </Link>
        ) : null}
      </div>
      <div>
        <ul
          role="list"
          className="grid min-h-full grid-cols-1 gap-5 mt-3 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {subjects.map((subject) => (
            <Link href={`/subjects/${subject.id}`}>
              <a>
                <li
                  key={subject?.id}
                  className="flex h-12 col-span-1 rounded-md shadow-sm"
                >
                  <div
                    className={classNames(
                      'bg-indigo-500 flex-shrink-0 flex items-center justify-center w-16 text-white text-sm font-medium rounded-l-md'
                    )}
                  >
                    {subject.name[0]}
                  </div>
                  <div className="flex items-center justify-between flex-1 truncate bg-white border-t border-b border-r border-gray-200 rounded-r-md">
                    <div className="flex-1 px-4 py-2 text-sm truncate">
                      <span className="font-medium text-gray-900 hover:text-gray-600">
                        {subject.name}
                      </span>
                    </div>
                  </div>
                </li>
              </a>
            </Link>
          ))}
        </ul>
      </div>
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
        destination: '/',
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
