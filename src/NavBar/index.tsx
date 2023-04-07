import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()
  const userToken = sessionStorage.getItem("userToken")
  useEffect(() => {
    if (userToken) {
      setIsLoggedIn(true)
    }
  }, [userToken])
  const handleSignInOrOut = () => {
    if (isLoggedIn) {
      sessionStorage.removeItem("userToken")
      setIsLoggedIn(false)
    } else {
      navigate("/signup")
    }
  }
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

        <div
          className="hover:text-blue-200 hover:cursor-pointer"
          onClick={handleSignInOrOut}
        >
          {isLoggedIn ? "登出" : "登录"}
        </div>
      </div>
    </nav>
  )
}
