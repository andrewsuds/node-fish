import Image from "next/image";
import { UserContext } from "../lib/UserContext";
import { useEffect, useContext } from "react";
import Axios from "axios";
import { IoArrowBack } from "react-icons/io5";
import { useRouter } from "next/router";

export default function NavBar(props) {
  const { user, setUser } = useContext(UserContext);
  Axios.defaults.withCredentials = true;
  const Router = useRouter();

  useEffect(() => {
    Axios.get("http://localhost:3001/auth/login").then((response) => {
      console.log("Logged In: " + response.data.username);
      setUser(response.data.username);
    });
  });

  return (
    <div className="top-0 sticky text-black backdrop-blur-lg bg-white/80 h-14 z-[1] flex items-center px-4">
      {props.back === true ? (
        <div
          className="p-[7.5px] rounded-full hover:bg-gray-200 cursor-pointer"
          onClick={() => Router.back()}
        >
          <IoArrowBack size={20} />
        </div>
      ) : (
        <div>
          <Image
            src="http://localhost:3001/images/ufc.jpg"
            className="rounded-full"
            width={35}
            height={35}
          />
        </div>
      )}

      <div className="font-bold text-xl ml-[26px]">{props.title}</div>
    </div>
  );
}
