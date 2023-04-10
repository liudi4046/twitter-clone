import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useUser } from "../context/UserProvider"
import AccountMenu from "./components/AccountMenu"

export default function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()
  const userToken = sessionStorage.getItem("userToken")
  const { setCurrentUser, currentUser } = useUser()
  useEffect(() => {
    if (currentUser) {
      setIsLoggedIn(true)
    }
  }, [userToken])
  const handleSignInOrOut = () => {
    if (isLoggedIn) {
      // sessionStorage.removeItem("userToken")
      // setCurrentUser?.(null)
      // setIsLoggedIn(false)
    } else {
      navigate("/signup")
    }
  }
  return (
    <nav className=" bg-blue-500 h-14 flex justify-between items-center p-5 text-white">
      <Link to={"/"}>
        <div className="hover:text-blue-200">Dummy Blog</div>
      </Link>

      <div className="flex gap-6 items-center">
        <Link to={"/"}>
          <div className="hover:text-blue-200">Home</div>
        </Link>
        <Link to={"/about"}>
          <div className="hover:text-blue-200">About</div>
        </Link>

        <div
          className="hover:text-blue-200 hover:cursor-pointer "
          onClick={handleSignInOrOut}
        >
          {isLoggedIn ? <AccountMenu setIsLoggedIn={setIsLoggedIn} /> : "登录"}
        </div>
      </div>
    </nav>
  )
}
