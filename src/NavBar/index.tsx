import React from "react"
import { Link } from "react-router-dom"

export default function NavBar() {
  return (
    <nav className=" bg-blue-500 h-14 flex justify-between items-center p-5 text-white">
      <Link to={"/"}>
        <div className="">Dummy Blog</div>
      </Link>

      <div className="flex gap-6">
        <Link to={"/"}>
          <div>Home</div>
        </Link>
        <Link to={"/about"}>
          <div>About</div>
        </Link>
      </div>
    </nav>
  )
}
