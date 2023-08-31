import News from "./components/News";
import React, { useRef } from "react";
import axios from "axios";

function App() {
    const [data, setData] = React.useState([]);
    const [subreddit, setSubreddit] = React.useState("news");

    let inputRef = React.useRef();
    let btnRef = useRef();

    React.useEffect(() => {
        const api_url =
            "https://www.reddit.com/r/" + subreddit + "/hot.json?limit=15";
        axios
            .get(api_url)
            .then((response) => {
                setData(response.data.data.children);
                btnRef.current.removeAttribute("disabled");
                btnRef.current.classList.remove("btn--loading");
            })
            .catch((err) => {
                console.log(err);
                btnRef.current.removeAttribute("disabled");
                btnRef.current.classList.remove("btn--loading");
            });
    }, [subreddit]);

    function changeSub() {
        if (subreddit == inputRef.current.value) {
            alert("You are already on this subreddit.");
            return;
        }
        // setSubreddit to change the subreddit which calls useEffect to get data for this new subreddit
        btnRef.current.setAttribute("disabled", "disabled");
        btnRef.current.classList.add("btn--loading");
        setSubreddit(inputRef.current.value);
    }

    return (
        <div className="App container">
            <h1>Reddit News </h1>
            <div className="sub">
                <ul className="tags">
                    <li>
                        <a
                            onClick={() => {
                                setSubreddit("worldnews");
                            }}
                        >
                            World
                        </a>
                    </li>
                    <li>
                        <a
                            onClick={() => {
                                setSubreddit("canada");
                            }}
                        >
                            Canada
                        </a>
                    </li>
                    <li>
                        <a
                            onClick={() => {
                                setSubreddit("sports");
                            }}
                        >
                            Sports
                        </a>
                    </li>
                    <li>
                        <a
                            onClick={() => {
                                setSubreddit("technology");
                            }}
                        >
                            Technology
                        </a>
                    </li>
                    <li>
                        <a
                            onClick={() => {
                                setSubreddit("politics");
                            }}
                        >
                            Politics
                        </a>
                    </li>
                </ul>
                <input
                    className="inputField"
                    type="text"
                    placeholder="type subreddit"
                    name="subReddit"
                    ref={inputRef}
                />
                <button className="btn" ref={btnRef} onClick={changeSub}>
                    Change
                </button>
            </div>
            <div className="cards">
                {data.map((item, index) =>
                    !item.data.stickied ? (
                        <div key={item.data.url}>
                            <News data={item.data} />
                            {/* {console.log(item)} */}
                        </div>
                    ) : (
                        ""
                    )
                )}
            </div>
            <div className="footer_text">
                <p>
                    Made by{" "}
                    <a href="https://arashveer.com" target="_blank">
                        Arashveer Garaya
                    </a>
                </p>
            </div>
        </div>
    );
}

export default App;
