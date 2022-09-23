import News from './components/News';
import React from 'react';
import axios from 'axios';

function App() {

  const api_url = 'https://www.reddit.com/r/news/hot.json?limit=10';
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    console.log("called");
    axios.get(api_url)
    .then((response) => {
        setData(response.data.data.children);
    })
    .catch((err) => {
        console.log(err)
    });
  }, [null]);

  return (
    <div className="App">
      <h1>Reddit News </h1>
      <div className="cards">
        {data.map((item, index) => (
          <div key={index}>
            <News data={item.data} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
