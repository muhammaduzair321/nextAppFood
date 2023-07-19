'use client'
import { data } from "autoprefixer";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductForm({
    title: existingTitle,
    description: existingDescription,
    price: existingPrice,
    images,
    category:assignedCategory
}) {
    const [title, setTitle] = useState(existingTitle || "");
    const [description, setDescription] = useState(existingDescription || "");
    const [price, setPrice] = useState(existingPrice || "");
    const [categories , setCategories] = useState([])
    const [category,setCategory]=useState(assignedCategory || '')
    const [ productProperties , setProductProperties] = useState({})
    const router = useRouter()
    const searchParams = useParams()
    const {id} = searchParams
    const saveProduct = async (e) => {
      e.preventDefault()
      const data = {title, description, price, id,category,properties:productProperties}
      if(id){
        // update
        let res = await axios.put("/api/products", data)
        if(res.status === 200){
          goToBackProduct()
        }
      } else {
        // create
        let res = await axios.post("/api/products", data)
        if(res.status === 200){
          goToBackProduct()
        }
      }
    };
    const goToBackProduct = ()=> {
      router.push("/products")
    }
    async function uploadImages(ev){
      // const files = e.target?.files;
      // if(files?.length > 0 ){
      //   const data = new FormData();
      //   files.forEach(file => data.append('file',file));
      //   const res = await axios.post('/api/upload', data)
      //   console.log(res.data)
      // }
    }
    async function fetchCat(){
       let res = await axios.get("/api/categories")
       let result = res.data;
       setCategories(result);
    }
    useEffect(()=>{
      fetchCat();
    },[])

    const propertiesToFill = [];
    if(categories.length > 0 &&  category){
      let catInfo = categories.find(({_id}) => _id === category)
      
      propertiesToFill.push(...catInfo.properties)
      console.log(catInfo)
      while (catInfo?.parent?._id) {
      console.log(catInfo?.parent?._id)
        const parentCat = categories.find(({_id}) => _id === catInfo?.parent?._id)
        propertiesToFill.push(...parentCat.properties)
        catInfo = parentCat;
      }
    }

    function setProductPro(propName, value){
        setProductProperties(prev => {
          const newProductProps ={...prev};
          newProductProps[propName] = value;
          return newProductProps
        })
    }

  return (
    <form onSubmit={saveProduct}>
        <label>Product name</label>
        <input
          type="text"
          name=""
          id=""
          placeholder="Food name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />


        <label>Category</label>
        <select
        value={category}
        onChange={ev => setCategory(ev.target.value)}
        >
          <option value="">Uncategorized</option>
          {categories.length > 0 && categories.map(e => (
             <option value={e._id}>{e.name}</option>
          ))}
        </select>
        {propertiesToFill.length > 0 && propertiesToFill.map(p => (
          <div className="flex gap-1">
            <div>{p.name}</div>
            <select value={productProperties[p.name]}
            onChange={ev => setProductPro(p.name , ev.target.value)}
            >
              {p.values.map(v =>(
                <option value={v}>{v}</option>
              ))}
            </select>
          </div>
          
        ))}
        <label>
          Photos
        </label>
        <div className=" mb-2 ">
          <label className=" w-24 h-24  text-center flex items-center justify-center text-sm gap-1 text-gray-500 rounded-lg bg-gray-200 cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
          </svg>
          <div>
          Upload
          </div>
          <input type="file" onChange={uploadImages()} className="hidden" />
          </label>
          {!images?.length && (
            <div>No photos in this Food</div>
          )}
        </div>
        <label htmlFor="">Description</label>
        <textarea
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <label htmlFor="">Price (in Rs)</label>
        <input
          type="number"
          name=""
          id=""
          placeholder="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button type="submit" className="btn-primary">
          Save
        </button>
      </form>
  )
}
