import PropTypes from "prop-types";
import axios from "axios";
import React, { useRef } from "react";

const News = (props) => {
    const [metaData, setmetaData] = React.useState([]);
    function timeSince(epoch) {
        var date = parseInt(String(epoch));
        date = date * 1000;
        date = Date.now() - date;
        var seconds = date / 1000;

        var interval = seconds / 31536000;

        if (interval > 1) {
            return Math.floor(interval) + " years ago";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " months ago";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " days ago";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " hours ago ";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " mins ago";
        }
        return Math.floor(seconds) + " secs ago";
    }
    if (metaData.length < 1) {
        axios
            .get(`https://jsonlink.io/api/extract?url=${props.data.url}`)
            .then((response) => {
                setmetaData(response.data);
                // console.log(metaData.title);
            })
            .catch((err) => {
                console.log("Hello", err);
            });
    }

    return (
        <div className="news">
            {metaData.images && metaData.images[0] ? (
                <div className="news_picture">
                    <img src={metaData.images[0]} alt="" />
                </div>
            ) : (
                ""
            )}

            <div className="news_content">
                <p className="news_time">{timeSince(props.data.created_utc)}</p>
                <h3>
                    <a href={props.data.url} target="_blank">
                        {props.data.title}
                    </a>
                </h3>
                {metaData.description ? (
                    <p className="news_desc">{metaData.description}</p>
                ) : (
                    ""
                )}
                <p className="domain">From: {props.data.domain}</p>
            </div>
        </div>
    );
};

News.defaultProps = {
    data: [],
    subReddit: "",
};

News.propTypes = {
    data: PropTypes.any,
    subReddit: PropTypes.any,
};

export default News;
