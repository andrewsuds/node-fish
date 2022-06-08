import Axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

export default function CreatePage() {
  Axios.defaults.withCredentials = true;
  const [weight, setWeight] = useState("");
  const [length, setLength] = useState("");
  const [picture, setPicture] = useState("");
  const [caption, setCaption] = useState("");
  const [speciesID, setSpeciesID] = useState("");
  const [message, setMessage] = useState("");
  const Router = useRouter();

  const submit = () => {
    const formData = new FormData();
    formData.append("picture", picture);
    formData.append("weight", weight);
    formData.append("length", length);
    formData.append("caption", caption);
    formData.append("speciesid", speciesID);
    Axios.post("http://localhost:3001/post/create", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then((response) => {
      console.log(response.data);
      if (response.data.posted === true) {
        setMessage(response.data.message);
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

      <div>
        <input
          type="file"
          onChange={(e) => {
            setPicture(e.target.files[0]);
          }}
        />
      </div>

      <div>{message}</div>

      <button onClick={submit}>Submit</button>
    </div>
  );
}
