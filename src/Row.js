import React, { useState, useEffect } from 'react';
import axios from './axios';
import "./Row.css"

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchURL, isLarger }) {
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

   return (
      <div className="row">
         <h2>{title}</h2>

         <div className="row__posters">
            {/* sveral row__poster(s) */}

            {movies.map(movie => (
               <img
                  key={movie.id}
                  className={`row__poster ${isLarger && 'row__posterLarge'}`}
                  src={`${base_url}${isLarger ? movie.poster_path : movie?.backdrop_path}`}
                  alt={movie.name}
               />
            ))}
         </div>

      </div>
   );
}

export default Row;