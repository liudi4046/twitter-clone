import React from "react"
import { Link } from "react-router-dom"

export default function NavBar() {
  return (
    <nav className=" bg-blue-500 h-14 flex justify-between items-center p-5 text-white">
      <Link to={"/"}>
        <div className="hover:text-blue-200">Dummy Blog</div>
      </Link>

      <div className="flex gap-6">
        <Link to={"/"}>
          <div className="hover:text-blue-200">Home</div>
        </Link>
        <Link to={"/about"}>
          <div className="hover:text-blue-200">About</div>
        </Link>
      </div>
    </nav>
  )
}
