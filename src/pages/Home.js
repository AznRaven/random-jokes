import React, { useEffect, useState } from "react";
import Joke from "./Joke";

export default function Home() {
  const [data, setData] = useState([]);
  const [random, setRandom] = useState(0);

  return (
    <>
      <Joke/>
    </>
  );
}
