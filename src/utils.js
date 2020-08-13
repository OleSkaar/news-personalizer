import React from 'react';
import { ApiUrl, ApiKeyHeader } from './constants.js';

export const emoji = (emoji, label) => {
  return <span role="img" aria-label={label}>{emoji}</span>
}

export const sortByPublisher = (articles, publishers, limit) => {
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

export const addTopArticleMethods = (topArticle) => {

  const article = topArticle;
  article.isUsed = function() {return this.buttonState === 0 || this.buttonState === 1};
  article.setValue = function(value) {this.buttonState = value};
  article.clear = function() {this.buttonState = -1}

  return article;
}

export const getTopArticles = (articles, maxArticles) => {
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

export const checkReadStatus = (articles) => {
  for (const article of articles) {
    if (!article.isUsed()) {
      return false;
    }
  }
  return true;
}

export const setArticleLikedValue = (article, value) => {
  let rating = value ? 1 : -1;
  if (article.isUsed()) {
    if (article.buttonState === value) {
      article.clear();

      return rating *= -1;
    } else {
      article.setValue(value);

      return rating *= 2;
    }
  } else {
    article.setValue(value);

    return rating
  }
}

export const updatePublisherValue = (publishers, publisher, rating) => {
  if (!publishers.hasOwnProperty(publisher)) {
    publishers[publisher] = 0;
  }

  publishers[publisher] += rating;
}

export const fetchArticles = (app, publishers, dislikeThreshold, maxArticles) => {
  const apiKey = `${process.env.REACT_APP_API_KEY}`
  let newArticles;
  let newTopArticles

  fetch(ApiUrl, {headers: new Headers({ [ApiKeyHeader]: apiKey })})
    .then((response) => response.json())
    .catch((error) => console.log(error))
    .then((responseObject) => {
        newArticles = sortByPublisher(responseObject.articles, publishers, dislikeThreshold);
        newTopArticles = getTopArticles(newArticles, maxArticles);
        app.updateArticleState(false, newArticles, newTopArticles)
      });
  }