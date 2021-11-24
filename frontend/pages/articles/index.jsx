import { useRouter } from 'next/router';
import axios from 'axios';
import nookies from 'nookies';
import ArticleListItem from '../../components/articleListItem';
import { API_URL } from '../../config';
import { useStore } from '../../store';
import { useEffect } from 'react';

const Articles = (props) => {
  const router = useRouter();

  const { setArticles, articles, filter } = useStore((state) => state);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: articleData } = await axios.get(`${API_URL}/articles`, {
          headers: {
            Authorization: `Bearer ${props.cookies.jwt}`,
          },
        });
        setArticles(articleData);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto">
      {articles.length ? (
        <ul>
          {articles
            .filter(
              ({ topic, subject, about }) =>
                topic.name.toLowerCase().includes(filter.toLowerCase()) ||
                subject.name.toLowerCase().includes(filter.toLowerCase()) ||
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
};

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

export default Articles;
