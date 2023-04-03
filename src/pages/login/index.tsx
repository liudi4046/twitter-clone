import React, { useState } from "react"
import Signup from "./components/Signup"

function Login() {
  const [isLogin, setIslogin] = useState(false)

  return <div className="">{isLogin ? <Login /> : <Signup />}</div>
}

export default Login
