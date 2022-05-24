import Head from "next/head";
import Image from "next/image";
import NavBar from "../components/NavBar";
import Axios from "axios";
import { useState, useEffect } from "react";

export default function Home() {
  Axios.defaults.withCredentials = true;

  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/post/all").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <>
      <NavBar />
      <h1 className="text-3xl font-bold">Feed View</h1>

      {listOfPosts.map((value) => {
        return (
          <>
            <p>
              {value.username} {value.location}
            </p>
            <p>
              Weight: {value.weight} Length: {value.length}
            </p>
            <p>{value.species}</p>
            <p>{value.caption}</p>
            <br />
          </>
        );
      })}
    </>
  );
}
