import logo from './logo.svg';
import './App.css';
import Button from './components/button';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0);
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const { data } = await axios.get(`http://localhost:1337/articles`);
      if (data) {
        setArticles(data);
      }
    };
    loadData();
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <Button text="Click Me" onClick={() => setCount(count + 1)} />
        <Button text="Click Me" onClick={() => setCount(count - 1)} />
        <p>{count}</p>
        {articles.map((article) => (
          <div>{article.name}</div>
        ))}
      </header>
    </div>
  );
}

export default App;
