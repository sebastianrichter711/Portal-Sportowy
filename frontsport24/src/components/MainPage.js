import React from 'react';
import Expo from './Home';
import '../style.css'
import fb from '../images/fb.png'
import insta from '../images/insta.png'
import twit from '../images/twit.png'
import logo from '../images/logo.png'

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newestMatches: [],
      newestArticles: [],
      newestArticle: [],
      sections: [],
      quote: []
    }
    this.fetchTasks = this.fetchTasks.bind(this)
  };

  componentWillMount() {
    this.fetchTasks()
  }

  fetchTasks() {
    console.log("Fetching...")

    fetch('http://127.0.0.1:8000/newest_matches')
      .then(response => response.json())
      .then(data =>
        this.setState({
          newestMatches: data
        })
      )

      fetch('http://127.0.0.1:8000/newest_article')
      .then(response => response.json())
      .then(data =>
        this.setState({
          newestArticle: data
        })
      )

      fetch('http://127.0.0.1:8000/section')
      .then(response => response.json())
      .then(data =>
        this.setState({
            section: data
          })
      )
      

      fetch('http://127.0.0.1:8000/newest_articles')
      .then(response => response.json())
      .then(data =>
        this.setState({
          newestArticles: data
        })
      )
    
      fetch('http://127.0.0.1:8000/quote')
      .then(response => response.json())
      .then(data =>
        this.setState({
          quote: data
        })
      )

  }

  render() {
    var matches = this.state.newestMatches
    var newArticles = this.state.newestArticles
    var section = this.state.sections
    var newArticle = this.state.newestArticle
    var q = this.state.quote
    return (
      <div className="div">
        <img className="logo" src={logo} alt="logo" />
        <Expo />
        <div class="fb">
        <a href="https://facebook.com">
          <img className="fbImg" src={fb} alt="fb" />
        </a>
        </div>
        <a href="https://twitter.com">
          <img className="twImg" src={twit} alt="twit" />
        </a>
        <a href="https://instagram.com">
          <img className="insImg" src={insta} alt="insta" />
        </a>
        <button className="registerButton">Zarejestruj się</button>
        <button className="loginButton">Zaloguj się</button>
        <button className="scoresButton">WYNIKI</button>
        <div className="newestMatches">
          {matches.map(function (task, index) {
            return (
              <div key={index}>
                <b className="matchdate">{task.match_date}</b><br/>
                <b className="team">{task.host}</b>&emsp;<b className="score">{task.host_score}</b><br/>
                <b className="team">{task.guest}</b>&emsp;<b className="score">{task.guest_score}</b><br/>
              </div>
            )
          })}
        </div>
        <div className="newestArticle">
            <img className ="mainImg" src={newArticle.big_title_photo} alt="main_img"/> 
            <div className="mainTitle">{newArticle.title}</div>
        </div>
        <div className="sections">
          {section.map(function (sct, index) {
            return (
              <div key={index}>
                <img className="sectionIcon" src={sct.icon} alt="section_img"/>
                <p className="sectionName">{sct.name}</p>
              </div>
            )
          })}
        </div>
        <h1 className="newestNews">Najnowsze</h1>
        <div className="newestArticles">
          {newArticles.map(function (article, index) {
            return (
              <div key={index}>
                <b className="articleDate">{article.date_of_create}</b>&ensp;<b className="articleTitle">{article.title}</b>
                <p>&nbsp;</p>
              </div>
            )
          })}
        </div>
        <div className="quote">
            <p className="q">{q.quote}</p><br/><br/>
            <div className="des">{q.description}</div>
        </div>
      </div>
    );
  }
}

export default MainPage;