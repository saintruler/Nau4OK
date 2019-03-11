import React, {Component} from 'react'
import ArticleCard from '../Components/ArticleCard'
import axios from 'axios'
import Scrollchor from 'react-scrollchor';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";


class ArticleList extends Component {
    state = {
        articles: [],
        searchText: '',
    };

    generateArticles() {
        if (this.state.searchText === null) this.state.searchText = '';
        let i = 0;
        return this.state.articles.filter(article => {
            return article.title !== null && article.description !== null &&
                (article.title.toLowerCase() + ' ' + article.description.toLowerCase())
                .indexOf(this.state.searchText.toLowerCase()) !== -1

        }).map(article => {
            i++;
            const isBigSized = (i - 4) % 7 === 0 || i % 7 === 0;
            const liClass = (isBigSized ? "cards__item--big" : "cards__item");
            return (
                <li className={liClass}>
                    <ArticleCard article={article}/>
                </li>
            )
        });
    }

    componentWillUpdate(nextProps, nextState, nextContext) {
        this.state.searchText = nextProps.searchText;
    }

    componentDidMount() {
        axios.get('http://karmanline.ddns.net:8000/api/articles').then(res => {
            this.setState({
                articles: res.data,
            });
        });
    }

    render() {
        const articleElements = this.generateArticles();


        return (
            <div>
                <header className="nau4ok-header" style={this.state.searchText === '' ? {} : {'display': 'none'}}>
                    <div className="bg-img">
                        <div className="overlay"/>
                    </div>

                    <div className="header-wrapper text-center">
                        <div className="header-content container">
                            <div className="col-md-10 offset-md-1">
                                <div className="display-4 text-center">Lorem ipsum dolor sit amet</div>
                                <p className="text-center">
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit. Morbi maximus risus at sapien dapibus, eget tempus felis tempor.
                                    Aliquam erat volutpat. Vivamus at felis diam. Aliquam fringilla odio arcu, sit
                                    amet venenatis purus commodo sit amet. Praesent tristique a justo at condimentum.
                                    Integer vitae arcu quis felis fermentum tincidunt a a ligula. Nulla pretium purus
                                    ut ante venenatis, condimentum varius sapien luctus.
                                </p>
                            </div>
                        </div>
                    </div>

                    <Scrollchor to="#articleList" className="nav-link arrow-scroll" animate={{offset: 0, duration: 600}}>
                        <div className="arrow-container mx-auto">
                            <div>
                                <div className="chevron"/>
                                <div className="chevron"/>
                                <div className="chevron"/>
                                <span className="arrow-text">Scroll to articles</span>
                            </div>
                        </div>
                    </Scrollchor>
                </header>

                <div className="container" id="articleList" style={{'minHeight': '93vh', 'paddingTop': '7vh'}}>
                    <div className="display-4 col-md-10 offset-md-1 text-center my-5" >
                        You may be interested:
                    </div>
                    <ul className="cards">
                        {articleElements}
                    </ul>
                </div>
            </div>
        )
    }
}


const mapStateToProps = state => {
    return {
        searchText: state.searchText
    };
};

export default withRouter(connect(mapStateToProps)(ArticleList));
