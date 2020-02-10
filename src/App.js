import React from 'react';
import './App.scss';
import './app/app.scss';
import './header/header.scss';
import './cardbox/cardbox.scss';
import './card/card.scss';
import './button/button.scss';
import './footer/footer.scss';

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
      mode: 'light'
    }
    this.maxArticles = 6;
  }

  fetchArticles() {
    // Fetches articles and sorts based on publisher preference
    const dummyData = {
  "status": "ok",
  "totalResults": 38,
  "articles": [
    {
      "source": {
        "id": null,
        "name": "Marketwatch.com"
      },
      "author": "Leslie Albrecht",
      "title": "How to get Disney+, Apple TV+, Amazon Prime Video or Netflix for ‘free’ — and what to know before you sign up - MarketWatch",
      "description": "Your cellphone plan or new TV could come with discounted or free video streaming.",
      "url": "https://www.marketwatch.com/story/how-to-get-disney-apple-tv-amazon-prime-video-or-netflix-for-free-and-what-to-know-before-you-sign-up-2019-12-16",
      "urlToImage": "http://s.marketwatch.com/public/resources/MWimages/MW-HW945_stream_ZG_20191213153931.jpg",
      "publishedAt": "2019-12-16T14:20:00Z",
      "content": "TV and movie fans are floating on a sea of streaming video subscription services. Thats good news for binge watchers, but not-so-good news for their budgets.\r\nWhile prices can be as low as $4.99 a month (for Apple TV+), a households monthly streaming expenses… [+8477 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Youtube.com"
      },
      "author": null,
      "title": "Gleamlight - Announcement Trailer - Nintendo Switch - Nintendo",
      "description": "A rich, terrifying, sad, but heartwarming tale set in a beautifully drawn stained-glass world, Gleamlight is a game that features no UI for an enhanced immer...",
      "url": "https://www.youtube.com/watch?v=aZQJFvVJJ0k",
      "urlToImage": "https://i.ytimg.com/vi/aZQJFvVJJ0k/maxresdefault.jpg",
      "publishedAt": "2019-12-16T14:00:01Z",
      "content": "A rich, terrifying, sad, but heartwarming tale set in a beautifully drawn stained-glass world, Gleamlight is a game that features no UI for an enhanced immersive gameplay experience. Play as a sword, and help the young boys advance to the heart of the world. … [+491 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Slate.com"
      },
      "author": "Matthew Dessem",
      "title": "Watchmen timeline: Here are the events of HBO's Watchmen, in chronological order. - Slate",
      "description": "Who watches Watchmen's watches?",
      "url": "https://slate.com/culture/2019/12/watchmen-timeline-chronological-hbo-lindelof.html",
      "urlToImage": "https://compote.slate.com/images/240f6682-337c-4d44-861e-7a04ac39dd12.jpeg?width=780&height=520&rect=1560x1040&offset=0x0",
      "publishedAt": "2019-12-16T13:38:00Z",
      "content": "Now that Watchmen has come to its conclusion, we can finally pry open the back of Damon Lindelofs newest show and study the intricate clockwork that powers it. Like the comic books its modeled after, Lindelofs Watchmen is built around a central mystery that t… [+13595 chars]"
    },
    {
      "source": {
        "id": "the-washington-post",
        "name": "The Washington Post"
      },
      "author": "Joanna Slater, Niha Masih",
      "title": "Delhi protest: India citizenship law sparks new demonstrations - The - The Washington Post",
      "description": "A fresh wave of unrest gripped campuses as opposition to the law continued to build.",
      "url": "https://www.washingtonpost.com/world/asia_pacific/protests-erupt-across-india-against-new-citizenship-law-after-police-storm-university-campus/2019/12/16/9ebbeae6-1ff0-11ea-b034-de7dc2b5199b_story.html",
      "urlToImage": "https://www.washingtonpost.com/resizer/m46TTSLgOWhsVnM7Zawuc1pM1Kc=/1440x0/smart/arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/JBI5JAA77MI6VPWVRABGJTERVE.jpg",
      "publishedAt": "2019-12-16T13:23:00Z",
      "content": "New demonstrations took place in at least 17 cities on Monday. The protests are part of a wave of unrest that has gripped India following the passage of the citizenship law on Dec. 11. The measure was a priority for Indian Prime Minister Narendra Modi, who wo… [+5164 chars]"
    },
    {
      "source": {
        "id": "fox-news",
        "name": "Fox News"
      },
      "author": "David Montanaro",
      "title": "Pelosi's 'nightmare': Gingrich says Dems' 'anti-constitutional gimmick' is helping Trump - Fox News",
      "description": "The House Democrats' impeachment push has turned into a \"bizarre anti-constitutional gimmick\" that is now helping President Trump's standing with voters, former House Speaker Newt Gingrich told “Fox & Friends,” on Monday.",
      "url": "https://www.foxnews.com/media/newt-gingrich-nancy-pelosi-nightmare-trump-impeachment",
      "urlToImage": "https://static.foxnews.com/foxnews.com/content/uploads/2019/12/pelosi-gingrich-nadler.jpg",
      "publishedAt": "2019-12-16T13:20:57Z",
      "content": "The House Democrats' impeachment push has turned into a \"bizarre anti-constitutional gimmick\" that is now helping President Trump's standing with voters, former House Speaker Newt Gingrich told “Fox &amp; Friends” on Monday.\r\nGingrich said he believes Democra… [+3135 chars]"
    },
    {
      "source": {
        "id": "fox-news",
        "name": "Fox News"
      },
      "author": "Travis Fedschun",
      "title": "Utah snowboarder killed after triggering 'significant' avalanche that buried him alive - Fox News",
      "description": "A 45-year-old snowboarder was killed Sunday after he triggered an avalanche that buried him under feet of snow, according to officials.",
      "url": "https://www.foxnews.com/us/utah-avalanche-snowboarder-killed-trapped-snow-buried",
      "urlToImage": "https://static.foxnews.com/foxnews.com/content/uploads/2019/12/utah-avalanche-utah-avalanche-center.jpg",
      "publishedAt": "2019-12-16T13:16:31Z",
      "content": "A 45-year-old snowboarder in Utah was killed Sunday after he triggered an avalanche that buried him under several feet of snow, according to officials.\r\nThe Utah Avalanche Center said the male snowboarder left Canyons Village in Park City through a backcountr… [+2768 chars]"
    },
    {
      "source": {
        "id": "ars-technica",
        "name": "Ars Technica"
      },
      "author": "Eric Berger",
      "title": "SpaceX to cap transitional year with launch, poised for big things in 2020 - Ars Technica",
      "description": "Fairing reuse, Starlink trains, and Starship testing marked big moments in 2019.",
      "url": "https://arstechnica.com/science/2019/12/spacex-to-cap-transitional-year-with-launch-poised-for-big-things-in-2020/",
      "urlToImage": "https://cdn.arstechnica.net/wp-content/uploads/2019/12/48380511492_5e952630af_k-760x380.jpg",
      "publishedAt": "2019-12-16T13:15:00Z",
      "content": "Enlarge/ The Falcon 9 rocket launching Monday has flown twice previously, including this July launch to the International Space Station.\r\n17 with 14 posters participating\r\nBy some measures, SpaceX has had a relatively sedate 2019. After all, the company has l… [+5785 chars]"
    },
    {
      "source": {
        "id": "cnn",
        "name": "CNN"
      },
      "author": "Jordan Valinsky, CNN Business",
      "title": "The 737 Max is in deeper trouble than Boeing thought, and its stock is sinking - CNN",
      "description": "Boeing's stock fell roughly 3% in premarket trading Monday following a report that the company was considering curbing production of the troubled 737 Max.",
      "url": "https://www.cnn.com/2019/12/16/business/boeing-stock-737-max-curb-production/index.html",
      "urlToImage": "https://cdn.cnn.com/cnnnext/dam/assets/191216122733-03-boeing-737-max-file-super-tease.jpg",
      "publishedAt": "2019-12-16T13:14:00Z",
      "content": null
    },
    {
      "source": {
        "id": null,
        "name": "Mmafighting.com"
      },
      "author": "Jed Meshew",
      "title": "Morning Report: Jorge Masvidal, Ben Askren bond in the wake of Colby Covington’s KO loss at UFC 245 - MMA Fighting",
      "description": "Perhaps more so than anything else this year, 2019 will be remembered as the year of Ben Askren and Jorge Masvidal. The two had remarkable and noteworthy years, albeit for very different reasons,...",
      "url": "https://www.mmafighting.com/2019/12/16/21023373/morning-report-jorge-masvidal-and-ben-askren-bond-in-the-wake-of-colby-covingtons-ko-loss-at-ufc-245",
      "urlToImage": "https://cdn.vox-cdn.com/thumbor/jfe9BgS_mIe2oTtWPM_aDcRmXo8=/0x0:2880x1508/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/18284208/134_Jorge_Masvidal_x_Ben_Askren.jpg",
      "publishedAt": "2019-12-16T13:00:00Z",
      "content": "Perhaps more so than anything else this year, 2019 will be remembered as the year of Ben Askren and Jorge Masvidal. The two had remarkable and noteworthy years, albeit for very different reasons, and both were highlighted (or lowlighted in the case of Askren)… [+5571 chars]"
    },
    {
      "source": {
        "id": "politico",
        "name": "Politico"
      },
      "author": null,
      "title": "How Andrew Yang would improve health care - POLITICO",
      "description": "“I support the spirit of Medicare for All,” Yang said in rolling out his new plan.",
      "url": "https://www.politico.com/news/2019/12/16/andrew-yang-2020-election-health-care-plan-085881",
      "urlToImage": "https://static.politico.com/5e/c4/b02ba27a44bfa82bbe70356113fd/19118-yang-gty-773.jpg",
      "publishedAt": "2019-12-16T12:59:00Z",
      "content": "I support the spirit of Medicare for All, Yang said in rolling out his new plan on Dec. 16, adding that he feels eliminating private insurance for millions of Americans is not a realistic strategy. \r\nInstead, Yang is calling for a set of policies to bring dow… [+4900 chars]"
    },
    {
      "source": {
        "id": "ars-technica",
        "name": "Ars Technica"
      },
      "author": "Timothy B. Lee",
      "title": "I created my own deepfake—it took two weeks and cost $552 - Ars Technica",
      "description": "I learned a lot from creating my own deepfake video.",
      "url": "https://arstechnica.com/science/2019/12/how-i-created-a-deepfake-of-mark-zuckerberg-and-star-treks-data/",
      "urlToImage": "https://cdn.arstechnica.net/wp-content/uploads/2019/12/zuckdata_listing-1-760x380.png",
      "publishedAt": "2019-12-16T12:50:00Z",
      "content": "45 with 39 posters participating, including story author\r\nDeepfake technology uses deep neural networks to convincingly replace one face with another in a video. The technology has obvious potential for abuse and is becoming ever more widely accessible. Many … [+3218 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Bbc.com"
      },
      "author": "https://www.facebook.com/bbcnews",
      "title": "General election 2019: MPs' vote on Brexit bill planned for Friday - BBC News",
      "description": "No 10 says the government wants to begin the legislation process before Christmas.",
      "url": "https://www.bbc.com/news/election-2019-50811026",
      "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/2932/production/_110164501_brexitflagsgetty.jpg",
      "publishedAt": "2019-12-16T12:43:20Z",
      "content": "Image copyrightGetty Images\r\nThe government plans to ask MPs to vote on Boris Johnson's Brexit bill on Friday, Downing Street has said.\r\nThe PM's spokesman said the government planned to start the process in Parliament before Christmas in the \"proper constitu… [+6358 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Anandtech.com"
      },
      "author": "Andrei Frumusanu",
      "title": "The Snapdragon 865 Performance Preview: Setting the Stage for Flagship Android 2020 - AnandTech",
      "description": null,
      "url": "https://www.anandtech.com/show/15207/the-snapdragon-865-performance-preview-setting-the-stage-for-flagship-android-2020",
      "urlToImage": "https://images.anandtech.com/doci/15207/image_2019_12_06T08_14_41_773Z_678x452.jpg",
      "publishedAt": "2019-12-16T12:30:00Z",
      "content": "Earlier this month we had the pleasure to attend Qualcomm’s Maui launch event of the new Snapdragon 865 and 765 mobile platforms. The new chipsets promise to bring a lot of new upgrades in terms of performance and features, and undoubtedly will be the silicon… [+8437 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Youtube.com"
      },
      "author": null,
      "title": "Bloomberg pulling support away from Biden, CBS News poll finds - CBS This Morning",
      "description": "Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube.",
      "url": "https://www.youtube.com/watch?v=ASWEsnphQ-I",
      "urlToImage": null,
      "publishedAt": "2019-12-16T12:26:04Z",
      "content": "[[getSimpleString(data.title)]]\r\n[[getSimpleString(data.description)]]\r\n[[getSimpleString(data.videoCountText)]]"
    },
    {
      "source": {
        "id": null,
        "name": "Nj.com"
      },
      "author": "Matt Dowling | NJ Advance Media for NJ.com",
      "title": "N.J. weather: Dangerous combo of ice, snow to turn roads treacherous as wintry mix hits state - NJ.com",
      "description": "The National Weather Service has issued a winter weather advisory for most of New Jersey starting Monday and continuing into Tuesday with snow, freezing rain and ice in the forecast.",
      "url": "https://www.nj.com/weather/2019/12/nj-weather-dangerous-combo-of-ice-snow-to-turn-roads-treacherous-as-wintry-mix-hits-state.html",
      "urlToImage": "https://www.nj.com/resizer/o22Ybj0acvhVfVbnKPvHBopl-uI=/1280x0/smart/arc-anglerfish-arc2-prod-advancelocal.s3.amazonaws.com/public/WNDNWOLV2BDN3CQ2PPMA5I72N4.jpg",
      "publishedAt": "2019-12-16T12:25:00Z",
      "content": "While most of New Jersey can expect to see some combination of a wintry mix of snow and freezing rain at some point Monday, the evening commute today and the morning drive on Tuesday in the northern half of the state could be treacherous from a layer of ice t… [+2909 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Cosmopolitan.com"
      },
      "author": "Mehera  Bonner",
      "title": "Kourtney Kardashian's Impression of Kim Kardashian Is Truly Ruthless - Cosmopolitan.com",
      "description": "\"Did my butt get smaller?\"",
      "url": "https://www.cosmopolitan.com/entertainment/celebs/a30239915/kourtney-kardashian-impression-kim-kardashian-kuwtk/",
      "urlToImage": "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/screen-shot-2019-12-16-at-6-40-52-am-1576496612.png?crop=1.00xw:0.677xh;0,0&resize=1200:*",
      "publishedAt": "2019-12-16T12:24:00Z",
      "content": "<ul><li>Kourtney Kardashian did a truly spot-on impression of Kim Kardashian last night on Keeping Up with the Kardashians.</li><li>Kourtney mocked Kim for always wearing Yeezy and having a gazillion stylists who just put her in sweats.</li></ul><ol></ol>\r\nLa… [+1218 chars]"
    },
    {
      "source": {
        "id": null,
        "name": "Espn.com"
      },
      "author": null,
      "title": "NBA Power Rankings Week 9 - The Bucks can't stop winning; James Harden can't stop scoring - ESPN",
      "description": "For Giannis Antetokounmpo and the Bucks, winners of 18 straight, their biggest battle of the season is coming to town.",
      "url": "https://www.espn.com/nba/story/_/id/28304701/nba-power-rankings-week-9-bucks-stop-winning-james-harden-stop-scoring",
      "urlToImage": "https://a2.espncdn.com/combiner/i?img=%2Fphoto%2F2019%2F1215%2Fnba_pwrrank_16x9.jpg",
      "publishedAt": "2019-12-16T12:18:32Z",
      "content": "The Milwaukee Bucks and the Los Angeles Lakers have separated themselves as the top two teams in the league. With identical 24-3 records, the juggernauts are on a collision course ... for Thursday night.\r\nIn a potential NBA Finals preview and, much more impor… [+16374 chars]"
    },
    {
      "source": {
        "id": "cnn",
        "name": "CNN"
      },
      "author": "Julia Horowitz, CNN Business",
      "title": "'Still a lot of uncertainty': Investors react to initial US-China trade deal - CNN",
      "description": "Happy Monday. A version of this story first appeared in CNN Business' Before the Bell newsletter. Not a subscriber? You can sign up right here.",
      "url": "https://www.cnn.com/2019/12/16/investing/premarket-stocks-trading/index.html",
      "urlToImage": "https://cdn.cnn.com/cnnnext/dam/assets/191125093538-01-trump-xi-file-super-tease.jpg",
      "publishedAt": "2019-12-16T12:13:00Z",
      "content": null
    },
    {
      "source": {
        "id": null,
        "name": "Space.com"
      },
      "author": "Meghan Bartels",
      "title": "Another Day, Another Exoplanet, and Scientists Just Can't Keep Up - Space.com",
      "description": "",
      "url": "https://www.space.com/so-many-exoplanets-discovery-pace.html",
      "urlToImage": "https://cdn.mos.cms.futurecdn.net/WtypmHmaxEteShpGRGcT3G-1200-80.jpg",
      "publishedAt": "2019-12-16T12:12:00Z",
      "content": "As finding alien worlds\r\n has gotten easier, learning every single detail scientists can has become, perhaps surprisingly, a bit of a waste of precious time of instruments and computers alike.\r\nTo date, scientists have discovered 4,104 confirmed exoplanets. B… [+5568 chars]"
    },
    {
      "source": {
        "id": "cnn",
        "name": "CNN"
      },
      "author": "Jacqueline Howard, CNN",
      "title": "Vaping linked with long-term risk of respiratory disease in new study - CNN",
      "description": "Vaping or using e-cigarettes for a long period of time may be associated with an increased risk of respiratory diseases, including chronic obstructive pulmonary disease or COPD, chronic bronchitis and asthma, according to a new study.",
      "url": "https://www.cnn.com/2019/12/16/health/vaping-respiratory-disease-study/index.html",
      "urlToImage": "https://cdn.cnn.com/cnnnext/dam/assets/190918111837-01-e-cigs-super-tease.jpg",
      "publishedAt": "2019-12-16T12:09:00Z",
      "content": null
    }
  ]
};
    let articles = dummyData.articles;
    articles = sortByPublisher(articles, this.state.preferredPublishers);

    return articles;
  }

  getTopArticles(articles) {
    const topArticles = [];
    while (topArticles.length < this.maxArticles && articles.length !== 0) {
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

  componentDidMount() {
    const storedState = JSON.parse(localStorage.getItem('state'));
    if (storedState === null) {
      // Get new articles from API
      const articles = this.fetchArticles();
      const topArticles = this.getTopArticles(articles);
      this.setState({
        lastQueryResult: articles,
        topArticles: topArticles
      })
    } else {
      const storedTopArticles = storedState.topArticles;
      for (let a of storedTopArticles) {a = addTopArticleMethods(a)}

      this.setState({
        allArticlesRead: storedState.allArticlesRead,
        lastQueryResult: storedState.lastQueryResult,
        preferredPublishers: storedState.preferredPublishers,
        searchBarInput: storedState.searchBarInput,
        searchQuery: storedState.searchQuery,
        topArticles: storedTopArticles,
        mode: storedState.mode
      })
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
      newArticles = sortByPublisher(this.state.lastQueryResult, this.state.preferredPublishers);
      newTopArticles = this.getTopArticles(newArticles);

      this.setState({
        allArticlesRead: false,
        lastQueryResult: newArticles,
        topArticles: newTopArticles
      }, () => {this.saveState()});
    } else {
      // else load articles from API and load into top articles
      
      const url = `https://newsapi.org/v2/top-headlines?country=us`

      fetch(url, {
        headers: {'x-api-key': apiKey}
      })
        .then((response) =>  {return response.json()})
        .catch((error) => console.log(error))
        .then((responseObject) => {
            newArticles = sortByPublisher(responseObject.articles, this.state.preferredPublishers);
            newTopArticles = this.getTopArticles(newArticles);
            this.setState({
              allArticlesRead: false,
              lastQueryResult: newArticles,
              topArticles: newTopArticles
            }, () => {this.saveState()});
          });
    }
  }

  saveState() {
    localStorage.setItem('state', JSON.stringify(this.state));
  }

  toggleMode() {
    console.log(this.state.mode)
    const newState = (this.state.mode === 'light' ? 'dark' : 'light');
    this.setState({
      mode: newState
    }, () => {this.saveState()});

  }

  render() {
    return (
      <div className={"app " + this.state.mode}>
        <Header />
        <div className="cardbox__wrapper">
          <LoadMore
            allArticlesRead={this.state.allArticlesRead}
            loadMoreClick={() => this.loadMoreArticles()}
          />
          <Cardbox
            topArticles={this.state.topArticles}
            onClick={(value, articleIndex) => this.handleLikeClick(value, articleIndex)}
          />
        </div>
        <Footer onClick={() => this.toggleMode()} />
      </div>
    );
  }
}

function LoadMore(props) {
    return (
      <div className={"cardbox__load-more-wrapper " + (props.allArticlesRead ? '' : ' cardbox__load-more-wrapper--collapsed')}>
        <button className="button button--spacing" onClick={props.loadMoreClick}>➕ Load More</button>
      </div>
    )
}


function Header() {
  return (
    <header className="header">
      <h1 className="header__text">📰 News Personalizer</h1>
    </header>
  );
}

function SearchBar() {
  const inputPlaceholder = '🔍 Search';
  return (
    <React.Fragment>
      <label htmlFor="searchBar" aria-label="Search bar"></label>
      <input
        id="searchBar"
        placeholder={inputPlaceholder}
        className="App-searchbar"
        onFocus={(e) => e.target.placeholder = ""}
        onBlur={(e) => e.target.placeholder = inputPlaceholder}>
      </input>
    </React.Fragment>
  );
}
function Cardbox(props) {
  const cards = [];
  let articleIndex = 0;
  for (const articleObject of props.topArticles) {
      cards.push(
        <Card
          key={articleIndex}
          index={articleIndex}
          article={articleObject}
          onClick={props.onClick}
        />);
      articleIndex++;
  }

  return (
    <section className="cardbox">
      {cards}
    </section>
  );
}

class Card extends React.Component {
  render() {
    const articleData = this.props.article.data;
    return (
      <div className={"card " + (this.props.article.isUsed() ? 'card--used' : '')}>
        <CardImage img={articleData.urlToImage} />
        <Headline
          title={articleData.title}
          url={articleData.url}
          />
        <ActionArea
          index={this.props.index}
          publisher={articleData.source.name}
          onClick={this.props.onClick}
          isUsed={this.props.article.isUsed()}
          buttonState={this.props.article.buttonState}
        />
      </div>
    );
  }
}

function CardImage(props) {
  return (
    <div className="card__image">
      <img height="100%" src={props.img}></img>
    </div>
  );
}

function Headline(props) {
  return (
      <div className="card__headline-area">
          <a className="card__headline-area--link" href={props.url} target="blank">
            <h2 className="card__headline-area-text">{props.title}</h2>
          </a>
      </div>

  );
}

class ActionArea extends React.Component {
  renderActionAreaButton(value, content, index) {
    return (
      <ActionAreaButton
        value={value}
        content={content}
        onClick={() => this.props.onClick(value, index)}
        buttonState={this.props.buttonState}
      />
    );
  }
  render() {
    return (
      <div className="card__action-area">
        {this.renderActionAreaButton(1, "👍", this.props.index)}

        <div className="card__publisher">
          <p className="card__publisher-name">{this.props.publisher.toUpperCase()}</p>
        </div>
        {this.renderActionAreaButton(0, "👎", this.props.index)}
      </div>
    );
  }
}

function ActionAreaButton(props) {
  return(
    <button className={"button card__action-button " + ((props.buttonState === props.value) ? "card__action-button-clicked" : '')} value={props.value} onClick={props.onClick}>
      <p className="card__action-button--text">{props.content}</p>
    </button>
  )
}

function Footer(props) {
  return (
    <footer className="footer">
      <p>Built with <a className="footer--links" href="https://create-react-app.dev/">create-react-app</a> and <a className="footer--links" href="https://newsapi.org/">NewsAPI</a>.</p>
      <button className="button button--spacing" onClick={ () => localStorage.clear()}><strong>Clear local storage</strong></button>
      <button className="button button--spacing" onClick={props.onClick}>Toggle Mode</button>
    </footer>
  );
}

function sortByPublisher(articles, publishers) {
  const sortedList = articles;

  sortedList.sort(function (a, b) {
    const aValue = publishers[a.source.name] ? publishers[a.source.name] : 0;
    const bValue = publishers[b.source.name] ? publishers[b.source.name] : 0;
    const comparison = aValue - bValue;


    return comparison;
  });

  return sortedList;
}



function addTopArticleMethods(topArticle) {

    const article = topArticle;
    article.isUsed = function() {return this.buttonState === 0 || this.buttonState === 1};
    article.setValue = function(value) {this.buttonState = value};
    article.clear = function() {this.buttonState = -1}

    return topArticle;
}


export default App;
