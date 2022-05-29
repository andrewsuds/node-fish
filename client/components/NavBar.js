import Link from "next/link";
import { UserContext } from "../lib/UserContext";
import { useEffect, useContext } from "react";
import Axios from "axios";

export default function NavBar() {
  const { user, setUser } = useContext(UserContext);
  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("http://localhost:3001/auth/login").then((response) => {
      setUser(response.data.username);
    });
  });

  return (
    <div className="w-full border-b border-red-300">
      <div className="flex justify-between mx-5">
        <div className="flex">
          <div className="mr-5">
            <Link href="/">Home</Link>
          </div>
          <div>
            <Link href="/create">Create Post</Link>
          </div>
        </div>
        <div>{user}</div>
        <div>
          <Link href="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
