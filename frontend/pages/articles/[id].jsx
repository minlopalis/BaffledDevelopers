import axios from "axios";
import nookies from "nookies";
import { API_URL } from "../../config";
import { useRouter } from "next/router";
import { useCallback, useEffect}  from "react";
import { useStore } from "../../store";

import ArticleItem from "../../components/articleItem";
import ArticleListItem from "../../components/articleListItem";

const Article = ({user,cookies}) => {
  const router = useRouter()
  const { id } = router.query

  const { articles, setArticles } = useStore((state) => state);


   // will fetch subjects if not already in store
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
  
  return <div className="m-4">
    <ArticleItem article={article}/>
    </div>;
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
      cookies
    },
  };
};
