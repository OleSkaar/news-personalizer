import React from 'react';
import './app/app.scss';
import './header/header.scss';
import './cardbox/cardbox.scss';
import './card/card.scss';
import './button/button.scss';
import './footer/footer.scss';
import './modal/modal.scss';
import DummyData from './dummydata.js';
import Header from './header/header.jsx';
import Footer from './footer/footer.jsx';
import Modal from './modal/modal.jsx';
import { Cardbox, LoadMore } from './cardbox/cardbox.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastQueryResult: [],
      preferredPublishers: {},
      searchBarInput: '',
      searchQuery: '',
      topArticles: [],
      allArticlesRead: false,
      mode: 'light',
      modalRead: false
    }
    this.maxArticles = 6;
    this.dislikeThreshold = -5;
  }

  fetchDummyArticles() {
    // Fetches articles and sorts based on publisher preference
    return DummyData.articles;
  }

  componentDidMount() {
    const storedState = JSON.parse(localStorage.getItem('state'));
    if (storedState === null) {
      // Get new articles from API
      /*
      const articles = this.fetchDummyArticles();
      const topArticles = getTopArticles(articles, this.maxArticles);

      this.setState({lastQueryResult: articles, topArticles: topArticles})
      */
      this.loadMoreArticles();

    } else {
      const storedTopArticles = storedState.topArticles;
      for (let a of storedTopArticles) {a = addTopArticleMethods(a)}

      this.setState({...storedState})
    }
  }

  handleLikeClick(value, articleIndex) {
    const topArticles = this.state.topArticles;
    const article = topArticles[articleIndex];

    // Set publisher rating and button state value
    let rating = value ? 1 : -1;

    if (article.isUsed()) {
      if (article.buttonState === value) {
        rating *= -1;
        article.clear();
      } else {
        rating *= 2;
        article.setValue(value);
      }
    } else {
      article.setValue(value);
    }

    // Update publisher preference
    const preferredPublishers = this.state.preferredPublishers;
    const publisher = article.data.source.name;

    if (!preferredPublishers.hasOwnProperty(article.data.source.name)) {
      preferredPublishers[publisher] = 0;
    }

    preferredPublishers[publisher] += rating;

    // Check if all articles are liked/disliked
    let allArticlesRead = true;
    for (const article of this.state.topArticles) {
      if (!article.isUsed()) {
        allArticlesRead = false;
        break;
      }
    }

    this.setState({
      topArticles: topArticles,
      preferredPublishers: preferredPublishers,
      allArticlesRead: allArticlesRead
    }, () => {this.saveState()});
  }

  loadMoreArticles() {
    // Remove top articles from state
    this.setState({topArticles: []});

    let newArticles;
    let newTopArticles;
    // If there are more articles in lastQuery, sort and load into top articles
    if (this.state.lastQueryResult.length > 0) {
      newArticles = sortByPublisher(this.state.lastQueryResult, this.state.preferredPublishers, this.dislikeThreshold);
      newTopArticles = getTopArticles(newArticles, this.maxArticles);

      this.setState({
        allArticlesRead: false,
        lastQueryResult: newArticles,
        topArticles: newTopArticles
      }, () => {this.saveState()});
    } else {
      // else load articles from API and load into top articles
      const apiKey = process.env.REACT_APP_API_KEY
      const url = `https://newsapi.org/v2/top-headlines?country=us`
      const myHeaders = new Headers({ 'x-api-key': apiKey })

      fetch(url, {headers: myHeaders})
        .then((response) =>  {return response.json()})
        .catch((error) => console.log(error))
        .then((responseObject) => {
            newArticles = sortByPublisher(responseObject.articles, this.state.preferredPublishers, this.dislikeThreshold);
            newTopArticles = getTopArticles(newArticles, this.maxArticles);
            this.setState({
              allArticlesRead: false,
              lastQueryResult: newArticles,
              topArticles: newTopArticles
            }, () => {this.saveState()});
          });
      }
  }

  saveState() { localStorage.setItem('state', JSON.stringify(this.state)); }

  toggleMode() {
    const newState = (this.state.mode === 'light' ? 'dark' : 'light');
    this.setState({
      mode: newState
    }, () => {this.saveState()});
  }

  toggleModal() {
    const newState = (this.state.modalRead === true ? false : true);
    this.setState({
      modalRead: newState
    }, () => {this.saveState()});
  }

  render() {
    return (
    <div>
      <Modal
        dislikeThreshold={this.dislikeThreshold}
        mode={this.state.mode}
        modalRead={this.state.modalRead}
        onClick={() => this.toggleModal()}
      />
      <div className={"app " + this.state.mode + (this.state.modalRead ? "" : " app--blur")}>
        <Header />
        <div className="cardbox__wrapper">
          <Cardbox
            topArticles={this.state.topArticles}
            onClick={(value, articleIndex) => this.handleLikeClick(value, articleIndex)}
          />
          <LoadMore
            allArticlesRead={this.state.allArticlesRead}
            loadMoreClick={() => this.loadMoreArticles()}
          />
        </div>
        <Footer
          onClick={() => this.toggleMode()}
          toggleModal={() => this.toggleModal()}
          mode={this.state.mode}
        />
      </div>
    </div>
    );
  }
}

function getTopArticles(articles, maxArticles) {
  const topArticles = [];
  while (topArticles.length < maxArticles && articles.length !== 0) {
    const article = articles.pop(-1);
    let topArticle = {
      data: article,
      buttonState: -1
    }
    topArticle = addTopArticleMethods(topArticle);
    topArticles.push(topArticle);
  }

  return topArticles;
}

function addTopArticleMethods(topArticle) {

    const article = topArticle;
    article.isUsed = function() {return this.buttonState === 0 || this.buttonState === 1};
    article.setValue = function(value) {this.buttonState = value};
    article.clear = function() {this.buttonState = -1}

    return article;
}

function sortByPublisher(articles, publishers, limit) {
  const eligibleArticles = articles.filter(article => publishers[article.source.name]  == null || publishers[article.source.name] > limit);
  const sortedList = eligibleArticles;


  sortedList.sort(function (a, b) {
    const aValue = publishers[a.source.name] ? publishers[a.source.name] : 0;
    const bValue = publishers[b.source.name] ? publishers[b.source.name] : 0;
    const comparison = aValue - bValue;


    return comparison;
  });

  return sortedList;
}

export default App;
