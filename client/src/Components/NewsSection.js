import React, { useEffect, useState } from "react";
import "./NewsSection.css";

const NewsSection = () => {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Replace with your own NewsAPI key
  const API_KEY = "74f4d86143764b2b97f857f99750b6e1";
  const API_URL = `https://newsapi.org/v2/top-headlines?category=business&country=in&apiKey=${API_KEY}`;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setNewsData(data.articles || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <section className="news-section">
      <h2>📢 Market Updates – {new Date().toLocaleDateString()}</h2>

      {loading ? (
        <p>Loading news...</p>
      ) : newsData.length === 0 ? (
        <p>No news available today.</p>
      ) : (
        <div className="news-container">
          {newsData.map((news, index) => (
            <div key={index} className="news-card">
              <h3>{news.title}</h3>
              <p>{news.description}</p>
              <a href={news.url} target="_blank" rel="noopener noreferrer" className="read-more">
                Read More →
              </a>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default NewsSection;
