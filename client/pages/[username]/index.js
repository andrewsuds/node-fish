import { useRouter } from "next/router";
import Image from "next/image";
import Axios from "axios";

export default function ProfilePage() {
  Axios.defaults.withCredentials = true;
  const Router = useRouter();

  const { username } = Router.query;

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
    </div>
  );
}
