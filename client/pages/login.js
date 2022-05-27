import Axios from "axios";
import { UserContext } from "../lib/UserContext";
import { useState, useContext } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  Axios.defaults.withCredentials = true;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const Router = useRouter();

  const login = () => {
    Axios.post("http://localhost:3001/auth/login", {
      username: username,
      password: password,
    }).then((response) => {
      console.log(response.data);
      if (response.data.loggedIn === true) {
        setUser(response.data.username);
        Router.push("/");
      }
    });
  };

  return (
    <div>
      <div>
        <input
          type="text"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          value={username}
          placeholder="Username"
        />
      </div>

      <div>
        <input
          type="text"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          value={password}
          placeholder="Password"
        />
      </div>

      <button onClick={login}>Login</button>
    </div>
  );
}
