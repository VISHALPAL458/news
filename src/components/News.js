import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Loader from "./Loader";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  capitalizeFirstLetter(str) {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 0,
      error: null,
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsMonkey`;
  }

  fetchNews = async (page) => {
    try {
      const { country, category, pageSize } = this.props;
      const url = `/api/news?country=${country}&category=${category}&page=${page}&pageSize=${pageSize}`;
      this.setState({ loading: true, error: null });

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
      }

      const data = await res.json();

      this.setState({
        articles: data.articles || [],
        totalResults: data.totalResults || 0,
        loading: false,
        page,
      });
    } catch (error) {
      console.error("Failed to fetch news:", error.message);
      this.setState({ loading: false, error: error.message });
    }
  };

  componentDidMount() {
    this.fetchNews(1);
  }

  handlePrevClick = () => {
    if (this.state.page > 1) {
      this.fetchNews(this.state.page - 1);
    }
  };

  handleNextClick = () => {
    const maxPages = Math.ceil(this.state.totalResults / this.props.pageSize);
    if (this.state.page + 1 <= maxPages) {
      this.fetchNews(this.state.page + 1);
    }
  };

  render() {
    const { articles, loading, page, totalResults, error } = this.state;

    return (
      <div className="container my-3">
        <h2 className="text-center my-5">NewsApp - Top Headlines</h2>

        {loading && <Loader />}

        {error && (
          <div className="alert alert-danger text-center">
            Failed to load news: {error}
          </div>
        )}

        <div className="row my-3">
          {!loading && articles?.length > 0
            ? articles.map((element) => (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title || ""}
                    description={element.description || ""}
                    imageUrl={element.urlToImage}
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                  />
                </div>
              ))
            : !loading &&
              !error && (
                <div className="text-center">
                  No articles found for this category.
                </div>
              )}
        </div>

        <div className="container d-flex justify-content-between">
          <button
            disabled={page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; Previous
          </button>
          <button
            disabled={page + 1 > Math.ceil(totalResults / this.props.pageSize)}
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
