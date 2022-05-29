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
    <div>
      <div className="max-w-7xl mx-auto">
        <div className="flex">
          <div className="flex flex-col w-[250px] overflow-hidden">
            <SideBarIcon />
            <SideBar name="Home" url="/" />
            <SideBar name="Create" url="/create" />
            <SideBar name="Profile" url="/login" />
            <SideBarCreate />
          </div>

          <div className="grow overflow-hidden border-x border-gray-300 h-screen">
            {children}
          </div>

          <div className="w-0 overflow-hidden bg-blue-200">Right</div>
        </div>
      </div>

      <div className="sm:invisible w-full fixed bottom-0 bg-yellow-200">Yo</div>
    </div>
  );
}
