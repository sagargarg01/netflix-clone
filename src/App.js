import React, { Component } from 'react';
import Row from './Row';
import requests from './request';
import Banner from './Banner';
import Nav from './Nav';
import movieTrailer from 'movie-trailer';

class App extends Component {
  constructor() {
    super();
    this.state = {
      playing_id: '-1',
      playingMovieName: '',
      trailerUrl: ''
    }
  }

  handleClick = (movie, p_id) => {
    const movieName = movie.name || movie.original_name || movie.title || movie.original_title;

    if (movieName === this.state.playingMovieName) {
      console.log('same movie');
      this.setState({
        playing_id: '-1',
        playingMovieName: '',
        trailerUrl: ''
      })
    }
    else {
      console.log('different movie')
      movieTrailer(movieName)
        .then(url => {
          const urlParams = new URLSearchParams(new URL(url).search);
          this.setState({
            playing_id: p_id,
            playingMovieName: movieName,
            trailerUrl: urlParams.get('v')
          })
        })
        .catch(error => console.log(error));
    }
  }

  render() {
    console.log(this.state)
    const { trailerUrl, playing_id } = this.state;
    return (
      <div className="App">
        <Nav />
        <Banner />
        <Row
          set_id="0"
          title="NETFLIX ORIGINALS"
          fetchURL={requests.fetchNetflixOrginals}
          isLarger
          trailerUrl={playing_id === "0" ? trailerUrl : ''}
          handleClick={this.handleClick}
        />
        <Row
          set_id="1"
          title="Trending Now"
          fetchURL={requests.fetchTrending}
          trailerUrl={playing_id === "1" ? trailerUrl : ''}
          handleClick={this.handleClick}
        />
        <Row
          set_id="2"
          title="Top Rated"
          fetchURL={requests.fetchTopRated}
          trailerUrl={playing_id === "2" ? trailerUrl : ''}
          handleClick={this.handleClick}
        />
        <Row
          set_id="3"
          title="Action Movies"
          fetchURL={requests.fetchActionMovies}
          trailerUrl={playing_id === "3" ? trailerUrl : ''}
          handleClick={this.handleClick}
        />
        <Row
          set_id="4"
          title="Comedy Movies"
          fetchURL={requests.fetchComedyMovies}
          trailerUrl={playing_id === "4" ? trailerUrl : ''}
          handleClick={this.handleClick}
        />
        <Row
          set_id="5"
          title="Horror Movies"
          fetchURL={requests.fetchHorrorMovies}
          trailerUrl={playing_id === "5" ? trailerUrl : ''}
          handleClick={this.handleClick}
        />
        <Row
          set_id="6"
          title="Romance Movies"
          fetchURL={requests.fetchRomanceMovies}
          trailerUrl={playing_id === "6" ? trailerUrl : ''}
          handleClick={this.handleClick}
        />
        <Row
          set_id="7"
          title="Documentaries"
          fetchURL={requests.fetchDocumentaries}
          trailerUrl={playing_id === "7" ? trailerUrl : ''}
          handleClick={this.handleClick}
        />
      </div>
    );
  }
}

export default App;
