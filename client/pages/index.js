import Head from "next/head";
import Image from "next/image";
import NavBar from "../components/NavBar";
import Axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FaBalanceScale,
  FaRulerHorizontal,
  FaFish,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";
import { MdOutlineBubbleChart } from "react-icons/md";

export default function Home() {
  Axios.defaults.withCredentials = true;
  const [postFeed, setPostFeed] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3001/post/all").then((response) => {
      setPostFeed(response.data);
    });
  }, []);

  const requestToggleLike = (id, isliked) => {
    Axios.post("http://localhost:3001/post/like", {
      postid: id,
      isliked: isliked,
    }).then((response) => {
      console.log(response.data);
    });
  };

  const toggleLike = (id) => {
    console.log("You passed: " + id);
    const newList = postFeed.map((item) => {
      if (item.postid == id) {
        if (item.isliked == 0) {
          requestToggleLike(id, 0);
          return {
            ...item,
            isliked: 1,
            likecount: parseInt(item.likecount) + 1,
          };
        }

        if (item.isliked == 1) {
          requestToggleLike(id, 1);
          return {
            ...item,
            isliked: 0,
            likecount: parseInt(item.likecount) - 1,
          };
        }
      }

      return item;
    });
    setPostFeed(newList);
  };

  return (
    <div>
      <NavBar title="Home" />
      {postFeed.map((value) => {
        return (
          <div className="flex px-4 py-2 border-t border-gray-300 hover:bg-gray-100">
            <div className="mr-3">
              <Image
                src="http://localhost:3001/images/ufc.jpg"
                className="rounded-full"
                width={50}
                height={50}
                layout="fixed"
              />
            </div>

            <div className="">
              <div className="flex">
                <Link href={`/${value.username}`}>
                  <div className="font-bold hover:underline hover:cursor-pointer">
                    {value.username}
                  </div>
                </Link>

                {value.location !== null && (
                  <div className="ml-1 text-gray-500">• {value.location}</div>
                )}
              </div>

              <div className="flex text-gray-500 items-center">
                <FaBalanceScale size={20} />
                <div className="ml-1 mr-4">{value.weight} lbs</div>

                {value.length !== null && (
                  <>
                    <FaRulerHorizontal size={20} />
                    <div className="ml-1 mr-4">{value.length}"</div>
                  </>
                )}

                <FaFish size={20} />
                <div className="ml-1">{value.species}</div>
              </div>

              {value.caption !== null && (
                <div className="my-1">{value.caption}</div>
              )}

              {value.picture != null && (
                <div className="my-2">
                  <Image
                    className="rounded-xl"
                    src={`http://localhost:3001/images/${value.picture}`}
                    width={500}
                    height={500}
                    objectFit="cover"
                  />
                </div>
              )}

              <div className="flex items-center text-gray-500 text-sm ml-[-7px]">
                <div className="flex items-center hover:text-red-500 hover:cursor-pointer">
                  <div className="hover:bg-red-100 rounded-full p-2">
                    <FaRegHeart size={16} />
                  </div>
                  <div className="ml-1 mr-6">{value.likecount} Likes</div>
                </div>

                <div className="flex items-center hover:text-blue-500 hover:cursor-pointer">
                  <div className="hover:bg-blue-100 rounded-full p-2">
                    <MdOutlineBubbleChart size={18} />
                  </div>
                  <div className="ml-1">{value.commentcount} Comments</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
