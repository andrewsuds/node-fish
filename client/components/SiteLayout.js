import { UserContext } from "../lib/UserContext";
import { useEffect, useContext } from "react";
import Axios from "axios";
import SideBar from "./SideBar";
import SideBarIcon from "./SideBarIcon";
import SideBarCreate from "./SideBarCreate";

export default function SiteLayout({ children }) {
  const { user, setUser } = useContext(UserContext);
  Axios.defaults.withCredentials = true;

  useEffect(() => {
    Axios.get("http://localhost:3001/auth/login").then((response) => {
      console.log(response);
      setUser(response.data.username);
    });
  });

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex">
        <div className="flex-col hidden sm:block sm:w-[75px] xl:w-[275px]">
          <div className="px-3">
            <SideBarIcon />
            <SideBar name="Home" url="/" />
            <SideBar name="Notifications" url="/create" />
            <SideBar name="Profile" url="/login" />
            <SideBarCreate />
          </div>
        </div>

        <div className="flex-1 border-x border-gray-300 min-h-screen">
          {children}
        </div>

        <div className="hidden lg:block lg:w-[250px]">
          <div className="">
            <p>Hi</p>
            <p>Hi</p>
            <p>Hi</p>
            <p>Hi</p>
            <p>Hi</p>
            <p>Hi</p>
            <p>Last one</p>
          </div>
          <br />
          <br />
          <div className="top-0 sticky">
            <p>Copyright info</p>
          </div>
        </div>
        <div className="sm:invisible w-full fixed bottom-0 bg-yellow-200">
          Yo
        </div>
      </div>
    </div>
  );
}
