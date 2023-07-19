import { Category } from "@/models/categories";
import { mongooseConnect } from "@/lib/mongoose/mongooseDB";
import { NextRequest,NextResponse } from "next/server";

const fetchCategories = async (request) => {
  await mongooseConnect();
    try {
        let nameFind = await Category.find().populate('parent');
        return NextResponse.json(nameFind)
    } catch (error) {
        console.log("error fetchCategories :::" , error)
    }
}

const addCategories = async (request) => {
  await mongooseConnect();
  const {name , parentCategory , properties}  = await request.json();
  try {
    const categoryDoc = await Category.create({
      name,
      parent:parentCategory || undefined,
      properties,
    });
    return NextResponse.json(categoryDoc);
  } catch (error) {
    console.log("error:::", error);
  }
};

const updateCategorie = async (request) => {
  await mongooseConnect();
  const {name , parentCategory , _id , properties}  = await request.json();
  try {
    const categoryDoc = await Category.updateOne(
      {_id},
      {
      name,
      parent:parentCategory || undefined,
      properties,
    });
    return NextResponse.json(categoryDoc);
  } catch (error) {
    console.log("error:::", error);
  }
}


const deleteCategorie = async (request) => {
  await mongooseConnect();
  const id = request.nextUrl.searchParams.get('_id')
  try {
    if (id) {
      await Category.deleteOne({ _id: id });
      return NextResponse.json(true);
    }
  } catch (error) {
    console.log("deleteCategorie Line 55 :::" ,error)
  }
};

export {
  fetchCategories as GET,
  addCategories as POST,
  updateCategorie as PUT,
  deleteCategorie as DELETE,
};
