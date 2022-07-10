
import './App.css';
import logo from './logo.svg';
import React, { useState } from "react";



function App() {

  const [rssUrl, setRssUrl] = useState("");
  const [items, setItems] = useState([]);

  const getRss = async (e) => {
    e.preventDefault();

    const res = await fetch(`https://api.allorigins.win/get?url=${rssUrl}`);
    const { contents } = await res.json();
    const feed = new window.DOMParser().parseFromString(contents, "text/xml");
    const items = feed.querySelectorAll("item");
    const feedItems = [...items].map((el) => ({
      link: el.querySelector("link").innerHTML,
      title: el.querySelector("title").innerHTML,
      description: el.querySelector("description").innerHTML.replace("<![CDATA[", "").replace("]]>", "").replace("<p>", "").replace("</p", ""),
      mp3link: el.querySelector("enclosure").getAttribute('url')

    }));
    setItems(feedItems);

  };


  return (
    <div className="App">
      <div>
        <header className='App-header'>
          <h1>
            Podcast Parser
          </h1>
          <img src={logo} className='App-logo' alt='logo'></img>
        </header>
      </div>
      <div>
        <form onSubmit={getRss}>
          <div>
            <label> Enter Rss URL</label>
            <br />
            <input onChange={(e) => setRssUrl(e.target.value)} value={rssUrl} />
          </div>
          <input type="submit" />
        </form>
        {items.map((item) => {
          return (
            <div>
              <h1>{item.title}</h1>
              <p>{item.description}</p>
              <a href={item.link}>{item.link}</a>
              <br />
              <a href={item.mp3link}>{item.mp3link}</a>


            </div>
          );

        })}
      </div>
    </div>
  );
}
export default App;
