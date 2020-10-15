import React, { useState, useEffect } from 'react';
import YouTube from 'react-youtube';
import axios from './axios';
import "./Row.css"

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchURL, isLarger, handleClick, trailerUrl, set_id }) {
   const [movies, setMovies] = useState([]); // hooks

   //  A snippet of code which runs based on a specific condition/variable
   useEffect(() => {
      // if [], run once when the row loads and then dont run again
      async function fetchData() {
         const request = await axios.get(fetchURL);
         setMovies(request.data.results)
         return request;
      }
      fetchData();
   }, [fetchURL]);

   const opts = {
      height: "390",
      width: "100%",
      playerVars: {
         autoplay: 1
      }
   }

   return (
      <div className="row">
         <h2>{title}</h2>

         <div className="row__posters">
            {movies.map(movie => (
               <img
                  key={movie.id}
                  onClick={() => handleClick(movie, set_id)}
                  className={`row__poster ${isLarger && 'row__posterLarge'}`}
                  src={`${base_url}${isLarger ? movie.poster_path : movie?.backdrop_path}`}
                  alt={movie.name || movie.original_name || movie.title || movie.original_title}
               />
            ))}
         </div>

         {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
      </div>
   );
}

export default Row;