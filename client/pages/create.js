import Axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

export default function CreatePage() {
  Axios.defaults.withCredentials = true;
  const [weight, setWeight] = useState(null);
  const [length, setLength] = useState(null);
  const [location, setLocation] = useState(null);
  const [picture, setPicture] = useState(null);
  const [caption, setCaption] = useState(null);
  const [speciesID, setSpeciesID] = useState(null);
  const [message, setMessage] = useState(null);
  const Router = useRouter();

  const create = () => {
    Axios.post("http://localhost:3001/post/create", {
      weight: weight,
      length: length,
      location: location,
      picture: picture,
      caption: caption,
      speciesid: speciesID,
    }).then((response) => {
      if (response.data.posted === true) {
        Router.push("/");
      } else {
        setMessage(response.data.message);
      }
    });
  };

  return (
    <div>
      <div>
        <input
          type="text"
          onChange={(e) => {
            setWeight(e.target.value);
          }}
          value={weight}
          placeholder="Weight"
        />
      </div>

      <div>
        <input
          type="text"
          onChange={(e) => {
            setLength(e.target.value);
          }}
          value={length}
          placeholder="Length"
        />
      </div>

      <div>
        <input
          type="text"
          onChange={(e) => {
            setLocation(e.target.value);
          }}
          value={location}
          placeholder="Location"
        />
      </div>

      <div>
        <input
          type="text"
          onChange={(e) => {
            setPicture(e.target.value);
          }}
          value={picture}
          placeholder="Picture URL"
        />
      </div>

      <div>
        <input
          type="text"
          onChange={(e) => {
            setCaption(e.target.value);
          }}
          value={caption}
          placeholder="Caption"
        />
      </div>

      <div>
        <input
          type="text"
          onChange={(e) => {
            setSpeciesID(e.target.value);
          }}
          value={speciesID}
          placeholder="Species ID"
        />
      </div>

      <div>{message}</div>

      <button onClick={create}>Submit</button>
    </div>
  );
}
