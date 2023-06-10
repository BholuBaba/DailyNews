import React, { Component } from 'react'
import NewsItems from './NewsItems'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {

    static defaultProps = {
        url: "https://newsapi.org/v2/top-headlines?",
        country: "in",
        category: "general",
        apikey: process.env.REACT_APP_NEWSMONKEY_API_KEY,   //Key present in .env.local file
        pageSize: 6
    }
    static propTypes = {
        url: PropTypes.string,
        country: PropTypes.string,
        category: PropTypes.string,
        apikey: PropTypes.string,
        pageSize: PropTypes.number
    }

    capitalizeFirstLetter =(string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            btnStatus: this.btnStatus
        }
        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
    }

    async UpdateNews(page) {
        this.props.setProgress(10);
        const url = `${this.props.url}country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);        
        this.props.setProgress(40);
        let parseData = await data.json();
        this.props.setProgress(80);
        this.setState({
            articles: parseData.articles,
            loading: false
        })
        this.props.setProgress(100);
    }
    async componentDidMount() {
        this.UpdateNews();
    }

    HandlePrevClick = async () => {
        await this.setState({ page: this.state.page - 1 })
        this.UpdateNews(this.state.page)
    }

    HandleNextClick = async () => {
        await this.setState({ page: this.state.page + 1 })
        this.UpdateNews(this.state.page)
    }

    render() {
        return (
            <div className="container my-3">
                <h3 className="text-center" style={{ margin: '20px', marginTop: '70px' }}>News Monkey Top {this.capitalizeFirstLetter(this.props.category)} HeadLines</h3>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading && this.state.articles.map((element) => {
                        return <div className="col-md-4 my-3" key={element.url}>
                            <NewsItems title={element.title ? element.title : ""} description={element.description ? element.description.slice(0, 70) + "..." : ""}
                                imageUrl={element.urlToImage ? element.urlToImage : ""} newsUrl={element.url} author={element.author} date={element.publishedAt}
                                source={element.source.name} />
                        </div>
                    })}
                </div>
                <div className="container d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1} className="btn btn-dark" onClick={this.HandlePrevClick}>&larr; Previous</button>
                    <button type="button" disabled={this.state.page >= Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.HandleNextClick}>Next &rarr; </button>
                </div>
            </div>
        )
    }
}

export default News
