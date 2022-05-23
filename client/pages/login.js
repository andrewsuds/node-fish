import Axios from "axios";
import { useState } from "react";

export default function LoginPage() {
  Axios.defaults.withCredentials = true;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    Axios.post("http://localhost:3001/auth/login", {
      username: username,
      password: password,
    }).then((response) => {
      console.log(response.data);
      if (response.data.loggedIn === true) {
        alert("Logged In");
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
