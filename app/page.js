import Image from "next/image";
import Link from "next/link";
import Hero from "./(components)/Hero";
import Header from "./(components)/Header";
import About from "./(components)/About";
import RecentWork from "./(components)/RecentWork";
import GetQuote from "./(components)/GetQuote";

export default function Home() {
  return (
  <>
  <Header/>
  <Hero/>
  <About/>
  <RecentWork/>
  <GetQuote/>
  </>
   

   
  );
}
