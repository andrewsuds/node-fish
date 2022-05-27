import "../styles/globals.css";
import SiteLayout from "../components/SiteLayout";
import { UserContext } from "../lib/UserContext";
import { useState, useMemo } from "react";

function App({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  const providerUser = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <UserContext.Provider value={providerUser}>
      <SiteLayout>
        <Component {...pageProps} />
      </SiteLayout>
    </UserContext.Provider>
  );
}

export default App;
