import SideBar from "./SideBar";
import SideBarIcon from "./SideBarIcon";
import SideBarCreate from "./SideBarCreate";

export default function SiteLayout({ children }) {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex">
        <div className="flex-col fixed top-0 bottom-0 hidden overflow-y-auto sm:block sm:w-[75px] xl:w-[275px] px-3">
          <SideBarIcon />
          <SideBar name="Home" url="/" />
          <SideBar name="Search" url="/search" />
          <SideBar name="Leaderboard" url="/leaderboard" />
          <SideBar name="Map" url="/map" />
          <SideBar name="Activity" url="/activity" />
          <SideBarCreate />
        </div>

        <div className="sm:ml-[75px] xl:ml-[275px] flex-1 border-x border-gray-300 min-h-screen">
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
        <div className="sm:hidden w-full fixed bottom-0 bg-yellow-200">Yo</div>
      </div>
    </div>
  );
}
