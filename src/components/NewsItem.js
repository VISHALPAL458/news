import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date } = this.props;
    return (
      <div>
        <div className="card">
          <img
            src={
              !imageUrl
                ? "https://i0.wp.com/9to5google.com/wp-content/uploads/sites/4/2025/04/Pixel-9a-Display-Bezel-Google-Logo.jpg?resize=1200%2C628&quality=82&strip=all&ssl=1"
                : imageUrl
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">{title}... </h5>
            <p className="card-text">{description}...</p>
            <p className="card-text">
              <small className="text-muted">
                {" "}
                By {!author ? "Unknown" : author} on{" "}
                {new Date(date).toGMTString()}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsUrl}
              target="_blank"
              className="btn btn-small    btn-dark"
            >
              read more
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;
