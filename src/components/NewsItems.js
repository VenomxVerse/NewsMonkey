import React, { Component } from "react";

export class NewsItems extends Component {
  
  render() {
    let {title,description,imageUrl,newsurl,author,date,source} = this.props;
    return (
    <div className="container my-3">
        <div className="card">
          <div style={{
            display : 'flex',
            justifyContent : 'flex-end',
            position:"absolute",
            right:0
           }}  >
           <span className="badge rounded-pill bg-danger">{source}
  </span>
          </div>
        <img
            src={imageUrl || "/no-image.png"}
            className="card-img-top"
            alt="news"
            style={{ height: "200px", objectFit: "cover" }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/no-image.png";
            }}
          />
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{description}</p>
              <p className="card-text"><small className="text-body-secondary"> By {author} on {new 
              Date(date).toUTCString()}</small></p>
              <a href={newsurl} target="_blank" rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
           </div>
        </div>
    </div>
 )}
}

export default NewsItems;
