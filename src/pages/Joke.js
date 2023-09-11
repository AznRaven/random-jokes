import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Joke() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const limit = 1;
  const apiKey = process.env.REACT_APP_JOKES_KEY;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/jokes?limit=${limit}`,
        {
          headers: { "X-Api-Key": apiKey },
          responseType: "json",
        }
      );
      setData(response.data);
      setLoading(false); 
    } catch (error) {
      if (error.response) {
        console.error("Error: ", error.response.data);
      } else {
        console.error("Error: ", error.message);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [apiKey, limit]); 

  return (
    <>
      <h1>Random Jokes</h1>
      <br />
      {loading ? <h1>Joke Loading...</h1> : <h1>{data[0]?.joke}</h1>}
      <br />
      <button onClick={fetchData}>Random</button> 
    </>
  );
}
