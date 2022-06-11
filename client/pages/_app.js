import "../styles/globals.css";
import SiteLayout from "../components/SiteLayout";
import { UserContext } from "../lib/UserContext";
import { HomeFeedContext } from "../lib/HomeFeedContext";
import { useState, useMemo } from "react";

function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const [homeFeed, setHomeFeed] = useState([]);
  const providerUser = useMemo(() => ({ user, setUser }), [user, setUser]);
  const providerHomeFeed = useMemo(
    () => ({ homeFeed, setHomeFeed }),
    [homeFeed, setHomeFeed]
  );

  return (
    <UserContext.Provider value={providerUser}>
      <HomeFeedContext.Provider value={providerHomeFeed}>
        <SiteLayout>
          <Component {...pageProps} />
        </SiteLayout>
      </HomeFeedContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
