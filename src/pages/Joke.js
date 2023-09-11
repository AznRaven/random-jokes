import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Joke() {
    const [data, setData] = useState([]);
    const [random, setRandom] = useState(0);
    const limit = 1;
    const apiKey = process.env.REACT_APP_KEY;
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`https://api.api-ninjas.com/v1/jokes?limit=${limit}`, {
            headers: { "X-Api-Key": apiKey },
            responseType: "json",
          });
          setData(response.data);
        } catch (error) {
          if (error.response) {
            console.error("Error: ", error.response.data);
          } else {
            console.error("Error: ", error.message);
          }
        }
      };
  
      fetchData();
    }, [apiKey, limit, random]);
  
    console.log(data);
  
    return (
      <>
        <h1>{data[0]?.joke}</h1>
        <br />
        <button onClick={() => setRandom(random + 1)}>Random</button>
      </>
    );
}
