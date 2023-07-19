'use client'

import Layout from "@/components/Layout";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Delete({ params }) {
  const [productInfo, setProductInfo] = useState();
  let { id } = params;
  const router = useRouter()

  const deleteProduct = async ()=> {
    let res = await axios.delete("/api/products?id="+id)
    if(res.status === 200){
        goBack();
    }
  }
  const fetchProduct = async () =>{
    let res = await axios.get(`/api/products?id=${id}`);
    setProductInfo(res.data);
  }
  useEffect(() => {
    if (id) {
      fetchProduct()
    } else {
      goBack()
    }
  }, [id]);
  const goBack = ()=> {
    router.push("/products")
  }
  return (
    <Layout>
      <h1 className="text-center">
        Do you really want to delete Product
        &nbsp;&quot;{productInfo?.title}&quot;?
      </h1>
      <div className="flex gap-2 justify-center">
        <button onClick={deleteProduct} className="btn-red">
          Yes
        </button>
        <button className="btn-default" onClick={goBack}>
          NO
        </button>
      </div>
    </Layout>
  );
}
