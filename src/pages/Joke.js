import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Joke() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(1);
  const [category, setCategory] = useState("age");
  const apiKey = process.env.REACT_APP_JOKES_KEY;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://api.api-ninjas.com/v1/quotes?category=${category}&limit=${limit}`,
        {
          headers: { "X-Api-Key": apiKey },
          responseType: "json",
        }
      );
      setData(response.data);
      console.log(response.data)
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
  }, [apiKey, limit, category]);

  return (
    <>
      <h1>Random "{category.charAt(0).toUpperCase() + category.slice(1)}" Quotes</h1>
      <br />
      <br />

      <div class="input-group has-validation">
        <button class="btn btn-outline-primary" onClick={fetchData}>
          Randomize {category.charAt(0).toUpperCase() + category.slice(1)} Quotes
        </button>
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
          <label for="floatingInputGroup2">Number Of {category.charAt(0).toUpperCase() + category.slice(1)} Quotes (Limit 10)</label>
        </div>
        {limit ? (
          ""
        ) : (
          <div class="invalid-feedback">Please Enter A Number.</div>
        )}
        <div></div>
        <div class="form-floating">
          <select
            class="form-select"
            id="floatingSelect"
            aria-label="Floating label select example"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option selected>Age</option>
            {/* <option value="age">Age</option> */}
            <option value="alone">Alone</option>
            <option value="amazing">Amazing</option>
            <option value="anger">Anger</option>
            <option value="architecture">Architecture</option>
            <option value="art">Art</option>
            <option value="attitude">Attitude</option>
            <option value="beauty">Beauty</option>
            <option value="best">Best</option>
            <option value="birthday">Birthday</option>
            <option value="business">Business</option>
            <option value="car">Car</option>
            <option value="change">Change</option>
            <option value="communications">Communications</option>
            <option value="computers">Computers</option>
            <option value="cool">Cool</option>
            <option value="courage">Courage</option>
            <option value="dad">Dad</option>
            <option value="dating">Dating</option>
            <option value="death">Death</option>
            <option value="design">Design</option>
            <option value="dreams">Dreams</option>
            <option value="education">Education</option>
            <option value="environmental">Environmental</option>
            <option value="equality">Equality</option>
            <option value="experience">Experience</option>
            <option value="failure">Failure</option>
            <option value="faith">Faith</option>
            <option value="family">Family</option>
            <option value="famous">Famous</option>
            <option value="fear">Fear</option>
            <option value="fitness">Fitness</option>
            <option value="food">Food</option>
            <option value="forgiveness">Forgiveness</option>
            <option value="freedom">Freedom</option>
            <option value="friendship">Friendship</option>
            <option value="funny">Funny</option>
            <option value="future">Future</option>
            <option value="god">God</option>
            <option value="good">Good</option>
            <option value="government">Government</option>
            <option value="graduation">Graduation</option>
            <option value="great">Great</option>
            <option value="happiness">Happiness</option>
            <option value="health">Health</option>
            <option value="history">History</option>
            <option value="home">Home</option>
            <option value="hope">Hope</option>
            <option value="humor">Humor</option>
            <option value="imagination">Imagination</option>
            <option value="inspirational">Inspirational</option>
            <option value="intelligence">Intelligence</option>
            <option value="jealousy">Jealousy</option>
            <option value="knowledge">Knowledge</option>
            <option value="leadership">Leadership</option>
            <option value="learning">Learning</option>
            <option value="legal">Legal</option>
            <option value="life">Life</option>
            <option value="love">Love</option>
            <option value="marriage">Marriage</option>
            <option value="medical">Medical</option>
            <option value="men">Men</option>
            <option value="mom">Mom</option>
            <option value="money">Money</option>
            <option value="morning">Morning</option>
            <option value="movies">Movies</option>
            <option value="success">Success</option>
          </select>

          <label for="floatingSelect">Select a category</label>
        </div>
      </div>

      <br />
      <br />
      {loading ? (
        <h1>{category.charAt(0).toUpperCase() + category.slice(1)} Loading...</h1>
      ) : (
        <>
          <table class="table table-hover table-dark table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Quote</th>
                <th scope="col">Author</th>
              </tr>
            </thead>
            <tbody>
              {data.map((quote, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <th>{quote.quote}</th>
                    <th>{quote.author}</th>
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
