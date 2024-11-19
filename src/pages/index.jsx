import { useState } from "react";
import { useRouter } from "next/router"; // Import useRouter
import CardWithForm from "./app/cardbelajar";
import kontenbase from "@/lib/kontenbase/init";
import { signOut } from "next-auth/react";

export default function Home() {
  
  return (
    <div className="">
      <CardWithForm />
    </div>
  );
}
