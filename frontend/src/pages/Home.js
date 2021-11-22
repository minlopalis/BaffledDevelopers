import React, { useEffect, useState } from 'react';
import axois from 'axios';
import { Link } from 'react-router-dom';
import ArticleListItem from '../components/article-list-item';

const Home = () => {
  const [articles, setArticles] = useState([]);

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
      <Link to="/article/1">To article</Link>
    </div>
  );
};

export default Home;
