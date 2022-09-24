import PropTypes from "prop-types";

const News = ({ data }) => {
  return (
    <div className="news">
      <h3>
        <a href={data.url}>{data.title}</a>
      </h3>
      <p className="des">From: {data.domain}</p>
    </div>
  );
};

News.defaultProps = {
  title: "News Article",
};

News.propTypes = {
  title: PropTypes.string,
};

export default News;
