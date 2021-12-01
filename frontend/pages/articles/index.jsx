import axios from "axios";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import nookies from "nookies";
import { useEffect } from "react";
import ArticleListItem from "../../components/articleListItem";
import { API_URL } from "../../config";
import { useStore } from "../../store";

function Articles({ user, cookies }) {
  const router = useRouter();

  const { setArticles, articles, setSubjects, filter, setTopics } = useStore(
    (state) => state
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: articleData } = await axios.get(`${API_URL}/articles`, {
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
        });
        const { data: subjectData } = await axios.get(`${API_URL}/subjects`, {
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
        });
        const { data: topicData } = await axios.get(`${API_URL}/topics`, {
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
        });
        setArticles(articleData);
        setSubjects(subjectData);
        setTopics(topicData);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      <div className="mt-4">
        <div className="flex flex-row justify-between items-evenly">
          <h2 className="mt-5 text-2xl font-medium tracking-wide text-gray-900 uppercase">
            Articles
          </h2>
          {user.role.type !== "student" ? (
            <Link href="/articles/add/">
              <a className="flex items-center justify-center h-10 px-4 mt-5 mr-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <PlusIcon className="w-4 h-4" />
              </a>
            </Link>
          ) : null}
        </div>
      </div>

      {articles.length ? (
        <ul>
          {articles
            .filter(
              ({ topic, subject, about }) =>
                topic?.name.toLowerCase().includes(filter.toLowerCase()) ||
                subject?.name.toLowerCase().includes(filter.toLowerCase()) ||
                about.toLowerCase().includes(filter.toLowerCase())
            )
            .map((article) => (
              <li className="my-4 rounded-lg shadow-lg" key={article.id}>
                <ArticleListItem article={article} />
              </li>
            ))}
        </ul>
      ) : null}
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

export default Articles;
