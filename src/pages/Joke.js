import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Joke() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(1);
  //   const limit = 2;
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
      <button onClick={fetchData}>Randomize</button>
      <br />
      <br />
      <input
        value={limit}
        onChange={(e) => setLimit(e.target.value)}
        type="text"
      />
      <br />
      {loading ? (
        <h1>Joke Loading...</h1>
      ) : (
        <>
          <div>
            <br />
            <br />
            {data.map((joke, index) => (
              <div key={index}>
                <p>{joke.joke}</p>
                {/* <br /> */}
              </div>
            ))}
          </div>
          <table class="table table-hover table-dark table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td colspan="2">Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </>
      )}
      <br />
    </>
  );
}
