import React, { useState } from "react"
import Signup from "./components/Signup"
import Login from "./components/Login"

function LoginSignUp() {
  const [isLogin, setIslogin] = useState(false)

  return (
    <div className="">
      {/* {isLogin ? (
        <Login setIslogin={setIslogin} />
      ) : (
        <Signup setIslogin={setIslogin} />
      )} */}
    </div>
  )
}

export default LoginSignUp
