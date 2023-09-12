import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Joke() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(1);
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
      <br />
      
      <div class="input-group has-validation">
        <button class="btn btn-outline-primary" onClick={fetchData}>Randomize Jokes</button> 
        <div></div>
        <div class="form-floating is-invalid">
          <input
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            type="number"
            class="form-control is-invalid"
            id="floatingInputGroup2"
            placeholder="Username"
            required
          />
          <label for="floatingInputGroup2">Number Of Jokes</label>
        </div>
        {limit ? ("") : (<div class="invalid-feedback">Please Enter A Number.</div>)}
      </div>
      <br />
      <br />
      {loading ? (
        <h1>Joke Loading...</h1>
      ) : (
        <>
          <table class="table table-hover table-dark table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Joke</th>
                <th scope="col">Punch</th>
              </tr>
            </thead>
            <tbody>
              {data.map((joke, index) => {
                const parts = joke.joke.split("?");
                let jokePart = parts[0]?.trim() || "";
                const punchPart = parts[1]?.trim() || "";
                
                // Add a question mark to the end of jokePart if it doesn't end with a period
                if (jokePart && !jokePart.endsWith(".")) {
                  jokePart += "?";
                }
                
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <th>{jokePart}</th>
                    <th>{punchPart}</th>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
      <br />
    </>
  );
}
