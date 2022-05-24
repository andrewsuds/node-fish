import Axios from "axios";
import { useState } from "react";

export default function CreatePage() {
  Axios.defaults.withCredentials = true;
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [location, setLocation] = useState("");
  const [picture, setPicture] = useState("");
  const [caption, setCaption] = useState("");
  const [speciesID, setSpeciesID] = useState("");

  const create = () => {
    Axios.post("http://localhost:3001/post/create", {
      weight: weight,
      length: length,
      location: location,
      picture: picture,
      caption: caption,
      speciesid: speciesID,
    }).then((response) => {
      alert(response.data.message);
      console.log(response.data);
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

      <button onClick={create}>Submit</button>
    </div>
  );
}
