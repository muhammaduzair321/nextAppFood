import { Product } from "@/models/product";
import { mongooseConnect } from "@/lib/mongoose/mongooseDB";
import { NextRequest, NextResponse } from "next/server";

const fetchProducts = async (request) => {
  await mongooseConnect();
  let id = request.nextUrl.searchParams.get('id');
  if (id) {
    let data = await Product.findOne({ _id: id });
    return NextResponse.json(data);
  } else {
    let data = await Product.find();
    return NextResponse.json(data);
  }
};

const addProduct = async (request) => {
  await mongooseConnect();
  const { title, description, price ,category,properties} = await request.json();
  try {
    const productDoc = await Product.create({
      title,
      description,
      price,
      category,
      properties,
    });
    return NextResponse.json(productDoc);
  } catch (error) {
    console.log("error:::", error);
  }
};
const updateProduct = async (request) => {
  await mongooseConnect();
  const { title, description, price, id ,category,properties} = await request.json();
  await Product.updateOne(
    { _id: id },
    {
      title,
      description,
      price,
      category,
      properties,
    }
  );
  return NextResponse.json(true);
};

const deleteProduct = async (request) => {
  await mongooseConnect();
  let id = request.nextUrl.searchParams.get('id');
  if (id) {
    await Product.deleteOne({ _id: id });
    return NextResponse.json(true);
  }
};

export {
  fetchProducts as GET,
  addProduct as POST,
  updateProduct as PUT,
  deleteProduct as DELETE,
};



