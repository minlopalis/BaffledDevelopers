import { useRouter } from 'next/router';
import axios from 'axios';
import nookies from 'nookies';
import ArticleListItem from '../../components/articleListItem';
import { API_URL } from '../../config';

const Articles = (props) => {
  const router = useRouter();

  const { articles } = props;

  return (
    <div className="container mx-auto">
      <ul>
        {articles.map((article) => (
          <li className="my-4 rounded-lg shadow-lg" key={article.id}>
            <ArticleListItem article={article} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);
  let user = null;
  let articles = null;

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

  try {
    const { data: articleData } = await axios.get(
      'http://localhost:1337/articles',
      {
        headers: {
          Authorization: `Bearer ${cookies.jwt}`,
        },
      }
    );
    articles = articleData;
  } catch (e) {
    console.log(e);
  }

  return {
    props: {
      user,
      articles,
    },
  };
};

export default Articles;
