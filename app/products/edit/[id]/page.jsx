"use client";

import Layout from "@/components/Layout";
import ProductForm from "@/components/ProductForm";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function page({params}) {
  const [productInfo, setProductInfo] = useState(null);
  const { id } = params;
  const router = useRouter()

  const fetchProduct = async ()=> {
    let res = await axios.get(`/api/products?id=${id}`);
    setProductInfo(res.data);
  }
  useEffect(() => {
    if (id) {
      fetchProduct();
    } else {
      router.push("/products")
    }
  }, [id]);

  return (
    <Layout>
      <h1>Edit Product</h1>
      {productInfo && <ProductForm {...productInfo} />}
    </Layout>
  );
}
