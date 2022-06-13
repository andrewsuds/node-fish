import "../styles/globals.css";
import SiteLayout from "../components/SiteLayout";
import { UserContext } from "../lib/UserContext";
import { PostContext } from "../lib/PostContext";
import { useState, useMemo } from "react";

function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [postList, setPostList] = useState([]);
  const providerUser = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <UserContext.Provider value={providerUser}>
      <PostContext.Provider value={{ postList, setPostList }}>
        <SiteLayout>
          <Component {...pageProps} />
        </SiteLayout>
      </PostContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
