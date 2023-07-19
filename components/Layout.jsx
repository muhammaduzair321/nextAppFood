"use client"
import Navb from "@/components/Navb";
import { useSession , signIn , signOut } from "next-auth/react"
import { useState } from "react";
import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import "./navbar.css"
import Link from "next/link";


export default function Layout({children}) {
 

  const [showNav,setShowNav] = useState(false)
  const { data: session } = useSession();
  if(!session){
    return(
      <>
       <Navbar expand="md" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#home">Restaurant App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="#home">Home</Nav.Link>
          </Nav>
          <div className='ms-3 btn-block d-flex gap-1'>
          <button 
           onClick={ () => signIn('google') }
          className="btn btn-primary">Login with Google</button>
          <DropdownButton id="dropdown-item-button" title="SignUp">
          <Link href="/signup/restaurat" className=" no-underline"><Dropdown.Item as="button" >Restaurant</Dropdown.Item></Link>
          <Link href="/signup/" className=" no-underline"><Dropdown.Item as="button" >User/Customer</Dropdown.Item></Link>
          </DropdownButton>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      {/* <div className=" bg-bgGray w-screen h-screen flex items-center">
       <div className="text-center w-full">
       <button 
       onClick={ () => signIn('google') }
       className="bg-white p-2 rounded-lg px-4">Login with Google</button>
       </div>
      </div> */}
      </>
    )
  }
  return (
    <div className="bg-gray-200 w-screen h-screen">
      <div className="block md:hidden">
      <button onClick={()=> setShowNav(true)}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
    </svg>
      </button>
      </div>
      <div className="  h-screen flex">
      <Navb show ={showNav} />
      <div className=" bg-white flex-grow rounded-lg p-4 mr-2 mb-2 mt-2 overflow-scroll">
        {children}</div>
      </div>
    </div>
  )
}
