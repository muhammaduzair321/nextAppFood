"use client"
import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import Image from "next/image";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const { data : session } = useSession();

 return <Layout>
  <div className=" text-blue-900 flex justify-between ">
    <h2>
      Hello , <b>{ session?.user?.email }</b>
    </h2>
    
    <div className="flex bg-gray-300 text-black gap-1 rounded-lg overflow-hidden ">
        <Image
        src = {session?.user?.image}
        alt="User Profile"
        width={24}
        height={24}
        >
        </Image>
        <span className=" py-1 px-2 ">
        {session?.user?.name}
        </span>
    </div>
  </div>
 </Layout>
}
