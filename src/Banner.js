import React, { useEffect, useState } from 'react';
import axios from './axios';
import requests from './request';

function Banner(props) {
   const [movie, setMovie] = useState([]);

   useEffect(() => {
      async function fetchData() {
         const request = await axios.get(requests.fetchNetflixOrginals);
      }
      fetchData();
   }, [])

   return (
      <header> {/* backgrounfd image */}
         {/* title */}
         {/* <div> -> 2 buttons */}
         {/* descriptions */}
      </header>
   );
}

export default Banner;