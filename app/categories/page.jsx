'use client'
import Layout from "@/components/Layout";
import { data } from "autoprefixer";
import axios from "axios";
import { validateConfig } from "next/dist/server/config-shared";
import { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";

 function Categories({swal}) {
    const [ editedcategory , setEditCategorie ] = useState(null)
    const [ name , setName ] = useState('');
    const [categories , setCategories] = useState([])
    const [properties,setProperties] = useState([])
    const [ parentCategory , setParentCategory ] = useState('')
    const saveCategories = async (e) =>{
        e.preventDefault();
        const data = { 
            name ,
            parentCategory , 
            properties:properties.map(p => ({
                name:p.name,
                values:p.values.split(',')
            }))
        }
        if(editedcategory){
            data._id = editedcategory._id
            let res = await axios.put("/api/categories" , data);
            setEditCategorie(null)
        }else{
            let res = await axios.post("/api/categories" , data);
        }
        setName('');
        setParentCategory('');
        setProperties('');
        fetchCategories();
    }
    function editCategory(category){
        setEditCategorie(category);
        setName(category.name);
        setParentCategory(category.parent?._id);
        setProperties(
            category.properties.map(({name,values})=>({
                name,
                values:values.join(",")
            }))
            );
    }
    function deleteCategory(category){
        swal.fire({
            title: 'Are you Sure?',
            text: `Do you want to delete ${category.name}`,
            showCancelButton: true,
            cancelButtonText:"Cancel",
            confirmButtonText:"Yes, Delete!",
            confirmButtonColor:"#d55",
            reverseButtons: true
        }).then(async result => {
           if(result.isConfirmed){
            const {_id} = category
            await axios.delete("/api/categories?_id="+_id)
            fetchCategories();
           }
        });
    }
    function addProperty(){
        setProperties(prev => {
            return [...prev, {name:"",value:""}]
        })
    }
    const fetchCategories = async () => {
        const res = await axios.get("/api/categories")
        if(res.status === 200){
            setCategories(res.data)
        }
    }
    function handlePropertyNameChange(index,property,newName){
        setProperties(prev => {
            const pro = [...prev];
            pro[index].name = newName;
            return pro;
        })
    }
    function handlePropertyValuesChange(index,property,newValues){
        setProperties(prev => {
            const pro = [...prev];
            pro[index].values = newValues;
            return pro;
        })
    }
    function removeProperty(index){
        setProperties(prev =>{
            return [...prev].filter((p,pIndex)=>{
                return pIndex !== index
            })
        })
    }
    useEffect(()=>{
        fetchCategories();
    },[])
    return(
        <Layout>
            <h1>Categories</h1>
            <label htmlFor="">{ editedcategory ? `Edit category ${editedcategory.name}` : "Create new category" }</label>
            
            <form onSubmit={saveCategories} >
            <div className=" flex gap-1">
                <input 
                type="text"
                 placeholder="product name"
                 value={name}
                 onChange={ev => setName(ev.target.value)}
                 />
                 <select 
                 onChange={ev => setParentCategory(ev.target.value)}
                 value={parentCategory}
                 >
                    <option value="">No parent Category</option>
                    {categories.length > 0 && categories.map(categorie => (
                        <option value={categorie._id}>{categorie.name}</option>
                    ))}
                 </select>
                 </div>
                 <div className=" mb-2">
                    <label className=" block">Properties</label>
                    <button 
                    onClick={addProperty}
                     type="button" 
                     className="btn-default text-sm mb-2">Add New Property </button>
                    {properties.length > 0 && properties.map((property,index) => {
                       return(<div className="flex gap-1 mb-2">
                            <input className="  mb-0" type="text"
                            value={property.name}
                            onChange={(ev)=> handlePropertyNameChange(index,property,ev.target.value)}
                            placeholder="property name (example: color"
                            />
                            <input className="  mb-0" type="text"
                            onChange={(ev)=> handlePropertyValuesChange(index,property,ev.target.value)}
                            value={property.values}
                            placeholder="values, comma seprate"
                            />
                            <button className=" btn-default"
                            onClick={() => removeProperty(index)}
                            type="button"
                            >
                                Remove
                            </button>
                        </div>)
                    })
                    }
                 </div>
                 <div className="flex gap-1">
                 {editedcategory && (
                                 <button className=" btn-default"
                                 type="button"
                                 onClick={()=> {
                                    setEditCategorie(null)
                                    setName('')
                                    setParentCategory('')
                                    setProperties([])
                            }}
                                 >
                                     Cancel
                                 </button>
                            )}
                     <button type="submit" className=" py-1 btn-primary">Save</button>
                 </div>
            </form>
            
            {!editedcategory && (
                <table className="basic mt-4">
                <thead>
                    <tr>
                        <td>Category name</td>
                        <td>Parent category</td>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    {categories.length > 0 && categories.map(category => (
                        <tr>
                            <td>{category.name}</td>
                            <td>{category?.parent?.name}</td>
                            <td>
                                
                                    <button onClick={() => editCategory(category)} className="btn-primary mr-1">Edit</button>
                                    <button 
                                    onClick={() => deleteCategory(category)} 
                                    className="btn-primary">Delete</button>
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            )}
        </Layout>
    );
}

export default withSwal (({swal} , ref ) => (
    <Categories swal={swal}/>
))