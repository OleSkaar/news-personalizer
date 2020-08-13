import React from 'react';
import './app/app.scss';
import Header from './header/header.jsx';
import Footer from './footer/footer.jsx';
import Modal from './modal/modal.jsx';
import Cardbox from './cardbox/cardbox.jsx';
import LoadMore from './cardbox/loadmore.jsx';
import * as utils from './utils.js';
import { DOMStrings, StateKey } from './constants.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastQueryResult: [],
      preferredPublishers: {},
      topArticles: [],
      allArticlesRead: false,
      mode: DOMStrings.light,
      modalRead: false
    }
    this.maxArticles = 6;
    this.dislikeThreshold = -5;
  }

  componentDidMount() {
    const storedState = JSON.parse(localStorage.getItem(StateKey));
    console.log(storedState)
    if (storedState === null) {
      this.loadMoreArticles();

    } else {
      const storedTopArticles = storedState.topArticles;
      for (let a of storedTopArticles) {a = utils.addTopArticleMethods(a)}

      this.setState({...storedState})
    }
  }

  handleLikeClick(value, articleIndex) {
    const topArticles = this.state.topArticles;
    const article = topArticles[articleIndex];

    // Set article liked/disliked value
    let rating = utils.setArticleLikedValue(article, value)

    // Update publisher preference
    const preferredPublishers = this.state.preferredPublishers;
    utils.updatePublisherValue(preferredPublishers, article.data.source.name, rating)

    // Check if all articles are liked/disliked
    let allArticlesRead = utils.checkReadStatus(this.state.topArticles);
    
    this.setState({
      topArticles: topArticles,
      preferredPublishers: preferredPublishers,
      allArticlesRead: allArticlesRead
    }, () => {this.saveState()});
  }

  loadMoreArticles() {
    // Remove top articles from state
    this.setState({topArticles: []});
    const currentArticles = this.state.lastQueryResult;
    const publishers = this.state.preferredPublishers;
    const dislikes = this.dislikeThreshold;
    const max = this.maxArticles;

    // If there are more articles in lastQuery, sort and load into top articles
    if (currentArticles.length > 0) {
      let newArticles = utils.sortByPublisher(currentArticles, publishers, dislikes);
      let newTopArticles = utils.getTopArticles(newArticles, max);

      this.updateArticleState(false, newArticles, newTopArticles)
    } else {
      // else load articles from API and load into top articles
      utils.fetchArticles(this, publishers, dislikes, max)
    }
  }

  updateArticleState(readStatus, newArticles, newTopArticles) {
    this.setState({
      allArticlesRead: readStatus,
      lastQueryResult: newArticles,
      topArticles: newTopArticles
    }, () => {this.saveState()});
  }

  saveState() { localStorage.setItem(StateKey, JSON.stringify(this.state)); }

  toggleMode() {
    const newState = (this.state.mode === DOMStrings.light ? DOMStrings.dark : DOMStrings.light);
    this.setState({ mode: newState }, () => {this.saveState()});
  }

  toggleModal() {
    const newState = (this.state.modalRead === true ? false : true);
    this.setState({ modalRead: newState }, () => {this.saveState()});
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
      <div className={DOMStrings.appRoot + ' ' + this.state.mode + (this.state.modalRead ? "" : ' ' + DOMStrings.appRootBlur)}>
        <Header />
        <div className={DOMStrings.cardboxWrapper}>
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

export default App;