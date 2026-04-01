import React, { Component } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

  static defaultProps = {
    country : 'us',
    pageSize : 5,
    category : 'science'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category : PropTypes.string
  }
  SetUppercase = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }


  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults:0
    };
      document.title = `${this.SetUppercase(this.props.category)} - NewsMonkey`;
  }

  async updateNews(page = 1){
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${page}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true})
    let data = await fetch(url);
     this.props.setProgress(30);
    let parsedData = await data.json();
     this.props.setProgress(70);
    console.log(parsedData);

    if (parsedData.status !== "ok") {
    this.setState({ articles: [], loading: false });
    return;
  }
    this.setState({
      articles: parsedData.articles  || [],
      totalResults: parsedData.totalResults || 0,
      loading:false,
      page: page
    });
    this.props.setProgress(100);

  }
  async componentDidMount() {
    this.updateNews();
  }

  // hadleonPrev = async () => {
  //   this.setState({page:this.state.page - 1})
  //   this.updateNews();
  // };

  // handleonNext = async () => {
  //       this.setState({page:this.state.page + 1})
  //       this.updateNews();
  // };

      fetchData = async () => {  
        const nextPage = this.state.page + 1;
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${nextPage}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
         
         if (!parsedData.articles || parsedData.articles.length === 0) {
          this.setState({ totalResults: this.state.articles.length });
          return;
        }
        
        
        this.setState({
            articles: this.state.articles.concat(parsedData.articles ),
            page:nextPage,
            loading:false
          });
      };


  render() {
    return (
        <>
        <h2 className="text-center"  style={{marginTop:"90px"}}> NewsMonkey - Top  {this.SetUppercase(this.props.category)} headlines </h2>
        {this.state.loading && <Spinner />}
        
            <InfiniteScroll
              dataLength={this.state.articles.length}
              next={this.fetchData}
              hasMore={this.state.articles.length !== this.state.totalResults}
              loader={<Spinner/>}
              >
              <div className="container">
                <div className="row ">
                {!(this.state.loading) && this.state.articles.map((element,index) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItems
                  title={element.title}
                  description={element.description}
                  imageUrl={element.urlToImage}
                  newsurl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>
              );
          })}
          </div>
          </div>
            </InfiniteScroll>
      </>
    );
  }
}

export default News;
