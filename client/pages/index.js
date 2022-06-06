import Head from "next/head";
import Image from "next/image";
import NavBar from "../components/NavBar";
import Axios from "axios";
import { useState, useEffect } from "react";
import PostCard from "../components/PostCard";

export default function Home() {
  Axios.defaults.withCredentials = true;

  const [listOfPosts, setListOfPosts] = useState([]);

  useEffect(() => {
    Axios.get("http://10.0.0.202:3001/post/all").then((response) => {
      setListOfPosts(response.data);
    });
  }, []);

  return (
    <div>
      <div className="top-0 sticky text-black backdrop-blur-lg bg-white/80 h-14 z-[1] flex items-center px-4">
        <div className="w-[35px] h-[35px]">
          <Image
            src="http://localhost:3001/images/ufc.jpg"
            className="rounded-full"
            width={35}
            height={35}
          />
        </div>
        <div className="font-bold text-xl ml-[26px]">Home</div>
      </div>

      {listOfPosts.map((value) => {
        return (
          <PostCard
            username={value.username}
            image={value.picture}
            location={value.location}
            weight={value.weight}
            length={value.length}
            fish={value.species}
            caption={value.caption}
          />
        );
      })}
    </div>
  );
}
