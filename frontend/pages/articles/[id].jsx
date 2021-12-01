import axios from "axios";
import nookies from "nookies";
import { API_URL } from "../../config";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { useStore } from "../../store";

import Link from "next/link";
import { TrashIcon, PencilIcon } from "@heroicons/react/solid";
import ArticleItem from "../../components/articleItem";
import ArticleListItem from "../../components/articleListItem";

const Article = ({ user, cookies }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { id } = router.query;

  const { articles, setArticles, deleteArticle } = useStore((state) => state);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data } = await axios.get(`${API_URL}/articles`, {
        headers: {
          Authorization: `Bearer ${cookies.jwt}`,
        },
      });
      setArticles(data);
    };

    if (!articles.length) {
      fetchArticles();
    }
  }, [articles]);

  //get article by id
  const article = useStore(
    useCallback((state) => state.articles.find((a) => a.id === id), [id])
  );

  // handle deletes
  const handleDeleteClick = async () => {
    setLoading(true);
    try {
      const { data: newArticle } = await axios.delete(
        `${API_URL}/articles/${id}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.jwt}`,
          },
        }
      );

      deleteArticle(id);
      setLoading(false);
      router.push("/articles");
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <div className="m-4 p-4">
      <div className="flex flex-row justify-between">
        <h1 className="my-5 text-3xl">{article?.name}</h1>
        <div>
          {user.role.type !== "student" ? (
            <div className="flex">
              <Link href={`/articles/edit/${article?.id}`}>
                <a
                  className="flex items-center justify-center h-10 px-4 mt-5 mr-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  href={`articles/edit/${article?.id}`}
                >
                  <PencilIcon className="w-4 h-4" />
                </a>
              </Link>
              {user.role.type === "administrator" ? (
                <button
                  onClick={handleDeleteClick}
                  className="flex items-center justify-center h-10 px-4 mt-5 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

      <ArticleItem article={article} />
    </div>
  );
};

export default Article;

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
