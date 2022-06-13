import { useRouter } from "next/router";
import Image from "next/image";
import { useContext, useEffect } from "react";
import Axios from "axios";
import PostCard from "../../components/PostCard";
import { PostContext } from "../../lib/PostContext";

export default function ProfilePage() {
  Axios.defaults.withCredentials = true;
  const Router = useRouter();

  const { postList, setPostList } = useContext(PostContext);

  const { username } = Router.query;
  useEffect(() => {
    if (!Router.isReady) return;
    Axios.get(`http://localhost:3001/post/profile/${username}`).then(
      (response) => {
        setPostList(response.data);
      }
    );
  }, [Router.isReady]);

  return (
    <div>
      <div className="top-0 sticky text-black backdrop-blur-lg bg-white/80 h-14 z-[1] flex items-center px-4">
        <div className="w-[35px] h-[35px]" onClick={() => Router.back()}>
          <Image
            src="http://localhost:3001/images/ufc.jpg"
            className="rounded-full"
            width={35}
            height={35}
          />
        </div>
        <div className="font-bold text-xl ml-[26px]">Profile</div>
      </div>

      {postList.map((value) => {
        return (
          <PostCard
            postid={value.postid}
            username={value.username}
            image={value.picture}
            location={value.location}
            weight={value.weight}
            length={value.length}
            fish={value.species}
            caption={value.caption}
            likecount={value.likecount}
            commentcount={value.commentcount}
            isliked={value.isliked}
          />
        );
      })}
    </div>
  );
}
