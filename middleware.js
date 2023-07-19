import { NextResponse } from "next/server";

// Limit the middleware to paths starting with `/api/`
export const config = {
    matcher: '/api/products/new',
  }
  export function middleware(request) {
    if(request.nextUrl.pathname.startsWith('/api/products/new')){
      console.log("this is middware")
    }
    NextResponse.next();
    // Call our authentication function to check the request
  }
