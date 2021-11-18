import React, { useEffect, useState } from 'react';
import axois from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const { data } = await axois.get(`http://localhost:1337/articles`);
      if (data) {
        console.log(data);
        setArticles(data);
      }
    };
    loadData();
  }, []);

  return (
    <div>
      <ul>
        {articles.map((article) => (
          <li key={article.id}>
            {article.name}-{article.about}
          </li>
        ))}
      </ul>
      <Link to="/article/1">To article</Link>
    </div>
  );
};

export default Home;
