import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Axios from "axios";

export default function ProfilePostPage() {
  const Router = useRouter();
  const [post, setPost] = useState([]);

  const { username, postid } = Router.query;
  useEffect(() => {
    if (!Router.isReady) return;
    Axios.get(`http://localhost:3001/post/one/${postid}`).then((response) => {
      setPost(response.data);
    });
  }, [Router.isReady]);

  return (
    <div>
      <p>{username}</p>
      <p>{postid}</p>
      <p>{post.caption}</p>
    </div>
  );
}
