import Head from "next/head";
import Image from "next/image";
import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <>
      <NavBar />
      <h1 className="text-3xl font-bold">Feed View</h1>
    </>
  );
}
