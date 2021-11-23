import axois from 'axios';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router';
import ArticleListItem from '../components/article-list-item';

const Home = () => {
  const [cookies] = useCookies(['auth']);
  const history = useHistory();
  const [articles, setArticles] = useState([]);
  console.log(`cookies`, cookies);
  if (!cookies.auth) {
    history.push('/login');
  }

  useEffect(() => {
    const loadData = async () => {
      const { data } = await axois.get(`http://localhost:1337/articles`);
      if (data) {
        setArticles(data);
      }
    };
    loadData();
  }, []);

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

export default Home;
