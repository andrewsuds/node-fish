import Image from "next/image";
import { UserContext } from "../lib/UserContext";
import { useEffect, useContext } from "react";
import Axios from "axios";

export default function NavBar(props) {
  const { user, setUser } = useContext(UserContext);
  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("http://localhost:3001/auth/login").then((response) => {
      console.log("Logged In: " + response.data.username);
      setUser(response.data.username);
    });
  });

  return (
    <div className="top-0 sticky text-black backdrop-blur-lg bg-white/80 h-14 z-[1] flex items-center px-4">
      <div className="w-[35px] h-[35px]">
        <Image
          src="http://localhost:3001/images/ufc.jpg"
          className="rounded-full"
          width={35}
          height={35}
        />
      </div>
      <div className="font-bold text-xl ml-[26px]">{props.title}</div>
    </div>
  );
}
